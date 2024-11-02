import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeasonData, SeasonObject, SeasonTracksData, TokenResponse } from './commons';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  private _token: string | null = null
  private _TOKEN_URL = "http://192.168.10.91/PanoServer/Panoramas/GetTokenByUID?uid=93d29388-7a9d-4825-aec2-3aca45cf11c8&subuser=none";
  private _SEASON_URL = "http://192.168.10.91/PanoServer/panoramasadmin/seasons";
  private _TRACK_URL = "http://192.168.10.91/PanoServer/panoramasadmin/tracks";

  constructor(private _httpClient: HttpClient) { }

  public getTracksInfoFromServer(trackUrl: string): Array<SeasonTracksData> {
    this.defineToken();

    let data: Array<SeasonTracksData> = new Array();
    this.getData<SeasonTracksData>(
      trackUrl,
      data,
      "seasonTracksData"
    )

    return data;
  }

  public getSeasonsInfoFromServer(): Array<SeasonData> {
    console.log("getSeasonsInfoFromServer statrt")
    this.defineToken();
    console.log(`defined token ${this._token}`)


    let data: Array<SeasonData> = new Array();
    this.getData<SeasonData>(
      this._SEASON_URL,
      data,
      "seasonData",
      "lastSeasonData"
    )

    this.addTrackUrlsToSeasons(data);
    this.checkReceivedData(data);
    return data;
  }

  private addTrackUrlsToSeasons(data: Array<SeasonData>) {
    for (let value of data) {
      value.trackLink = `${this._TRACK_URL}?sessionId=${value.id}`;
    }
  }

  private getData< DataType>(
    fullUrl: string, 
    data: Array<DataType>,
    dataName: string,
    localStorageDataName?: string
  ) {
    let self = this;
    this._httpClient.get<string>(fullUrl, this.getOptions()).subscribe({
      next(event) {
        if (event.type === HttpEventType.Response) {
          const value = event as HttpResponse<string>;
          let seasonData: DataType = JSON.parse(value?.body ? value.body : "");
          data.push(seasonData);
    
          console.log(`getting value in ${dataName} request = ${value.body}`);
        }
      },

      error(err) {
        console.log(`oops: ${dataName} request failed with error - ${err}`);
      },

      complete() {
        if (localStorageDataName) {
          localStorage.setItem(localStorageDataName, JSON.stringify(data));
        }
        
        console.log(`response seasonData from server is ${data}`);
      },
    })

    return data;
  }

  private getOptions(): any {
    return {header: new Headers({'Authorization': this._token ? this._token : ""})
    } 
  }

  private checkReceivedData(data: Array<SeasonData>) {
    if (data.length == 0) {
      let d = localStorage.getItem('lastSeasonData');
      data = JSON.parse(d ? d : "");
    }
  }

  private defineToken() {
    if (this._token) {
      return;
    }

    if (localStorage.getItem('token') && localStorage.getItem('token') !== "") {
      this._token = localStorage.getItem('token');
      return;
    }

    let self = this;

    this._httpClient.get<TokenResponse>(this._TOKEN_URL).subscribe({
      next(value) {
        self._token = value.token;
        console.log(`getting value in token request = ${value.token}`);
      },

      error(err) {
        console.log(`oops: token request failed with error - ${err}`);
      },

      complete() {
        console.log(`response token from server is ${self._token}`);
      },
    })

    localStorage.setItem('token', this._token ? this._token : "");
  }
}
