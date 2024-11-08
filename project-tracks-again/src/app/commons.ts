import { DestroyRef, inject, Injectable} from "@angular/core";
import { catchError, EMPTY, Observable, ObservableInput, of, Subject, takeUntil, tap } from "rxjs";
import { StorageService } from "./storage.service";
import { DataLoaderService } from "./data-loader.service";

type SeasonData = {id: number, name: string, countTracks: number, countPanoramas: number, trackLink: string};
type SeasonObject = {id: number, name: string, countTracks: number, countPanoramas: number};
type TrackData = {id: number, car: number, name: string, seasonId: number, path: string, year: number, countPanoramas: number};
type SeasonTracksData = {id: number, season: string, tracks: Array<TrackData>};
type TokenResponse = {uid:string ,group:number,id:number,login:string,token:string,type:number,result:number,text:string}

export {SeasonData, SeasonObject, SeasonTracksData, TokenResponse, TrackData};

@Injectable({
    providedIn: 'root'
})
export class CommonFunctions {
    private destroyRef = inject(DestroyRef);

    constructor(
        private storageService: StorageService,
        private dataLoaderService: DataLoaderService
    ) {
        
    }

    public getToken(): Observable<string> {
        let token = this.storageService.getData("token");

        const destroyed = new Subject<string>();

        this.destroyRef.onDestroy(() => {
            destroyed.next(token);
            destroyed.complete();
        });

        if (!token) {
            return this.dataLoaderService.getData("token")
                .pipe(
                    takeUntil(destroyed),
                    tap(token => {
                        this.storageService.setValue("token", token); 
                        console.log(token);
                    })
                )
        }

        return of(token);
    }
}
