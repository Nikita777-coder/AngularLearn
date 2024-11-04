import { Injectable } from '@angular/core';
import {SeasonData, SeasonTracksData, TokenResponse} from './commons';
import {catchError, map, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  private _TOKEN_URL = "http://192.168.10.91/PanoServer/Panoramas/GetTokenByUID?uid=93d29388-7a9d-4825-aec2-3aca45cf11c8&subuser=none";
  private _SEASON_URL = "http://192.168.10.91/PanoServer/panoramasadmin/seasons";
  private _TRACK_URL = "http://192.168.10.91/PanoServer/panoramasadmin/tracks";
  private _GET_DATA_MAP = new Map<String, Function>([
    ["token", () => this.getToken()],
    ["seasons", (token: string) => this.getSeasons(token)],
    ["tracks", (token: string, seasonTrackUrl: string) => this.getSeasonTracks(token, seasonTrackUrl)]
  ])

  constructor(private _httpClient: HttpClient) { }

  public getData(key: string, args?: Array<any>): Observable<any> {
    let func = this._GET_DATA_MAP.get(key);

    if (key === "token") {
      return func.call(arguments);
    }

    if (key === "tracks") {
      return func.call(args[0], args[1]);
    }

    return func.call(args[0]);
  }

  public getSeasonTracks(token: string, seasonTrackUrl: string): Observable<SeasonTracksData[]> {
    return this._httpClient.get<SeasonTracksData[]>(seasonTrackUrl, {headers: this.getOptions(token)})
  }

  public getSeasons(token: string): Observable<SeasonData[]> {
    return this._httpClient.get<SeasonData[]>(this._SEASON_URL, {headers: this.getOptions(token)})
      .pipe(map(
      seasonsData => seasonsData.map((seasonData) => ({
        ...seasonData,
        trackLink: `${this._TRACK_URL}?seasonId=${seasonData.id}`
      }))
    ))
  }

  public getToken(): Observable<TokenResponse>{
    return this._httpClient.get<TokenResponse>(this._TOKEN_URL)
  }

  private handleError(err: any) {
    console.log(err);
  }
  private getOptions(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    })
  }
}
