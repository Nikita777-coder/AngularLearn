type SeasonData = {id: number, name: string, countTracks: number, countPanoramas: number, trackLink: string};
type SeasonObject = {id: number, name: string, countTracks: number, countPanoramas: number};
type TrackData = {id: number, car: number, name: string, seasonId: number, path: string, year: number, countPanoramas: number};
type SeasonTracksData = {id: number, season: string, tracks: Array<TrackData>};
type TokenResponse = {uid:string ,group:number,id:number,login:string,token:string,type:number,result:number,text:string}

export {SeasonData, SeasonObject, SeasonTracksData, TokenResponse};