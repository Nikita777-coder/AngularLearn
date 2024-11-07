import { Injectable } from '@angular/core';
import {SeasonData, SeasonTracksData, TokenResponse, TrackData} from './commons';
import {map, Observable} from 'rxjs';
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
    ["seasons", () => this.getSeasons()],
    ["tracks", (seasonTrackUrl: string) => this.getSeasonTracks(seasonTrackUrl)]
  ])

  constructor(private _httpClient: HttpClient) { }

  public getData(key: string, args?: Array<any>): Observable<any> {
    let func = this._GET_DATA_MAP.get(key);
    return func.apply(this, args);
  }

  public getSeasonTracks(seasonTrackUrl: string): Observable<TrackData[]> {
    return this._httpClient.get<SeasonTracksData>(seasonTrackUrl).pipe(map(data => data.tracks))
  }

  public getSeasons(): Observable<SeasonData[]> {
    return this._httpClient.get<SeasonData[]>(this._SEASON_URL)
      .pipe(map(
      seasonsData => seasonsData.map((seasonData) => ({
        ...seasonData,
        trackLink: `${this._TRACK_URL}?seasonId=${seasonData.id}`
      }))
    ))
  }

  public getToken(): Observable<String>{
    return this._httpClient.get<TokenResponse>(this._TOKEN_URL).pipe(map(value => value.token))
  }
}
