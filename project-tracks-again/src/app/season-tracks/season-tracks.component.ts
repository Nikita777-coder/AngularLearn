import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SeasonTracksData } from '../commons';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { DataLoaderService } from '../data-loader.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-season-tracks',
  standalone: true,
  imports: [TableModule, NgForOf, NgIf, RouterLink, RouterLinkActive, JsonPipe, AsyncPipe],
  templateUrl: './season-tracks.component.html',
  styleUrl: './season-tracks.component.css'
})
export class SeasonTracksComponent implements OnInit {
  protected seasonTracks: SeasonTracksData[] = [];
  protected seasonTracksTableHeaders;
  protected fullTracskUrl = "";
  private state$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private dataLoaderService: DataLoaderService,
    private storageService: StorageService
  ) {
    
  }

  ngOnInit(): void {
    this.state$ = this.route.paramMap.pipe(
      map(() => window.history.state.tracksUrl),
    )

    this.state$.subscribe(value => this.fullTracskUrl = value);

    let token = this.storageService.getData("token");

    if (!token) {
      this.dataLoaderService.getData("token").subscribe(token => {
        this.storageService.setValue("token", token); 
        console.log(token);
        this.fetchSeasonTracks(token); 
      });
    } else {
      this.fetchSeasonTracks(token);
    }
  }

  fetchSeasonTracks(token: string) {
    this.dataLoaderService.getData("tracks", [token, this.fullTracskUrl]).subscribe(seasons => {
      this.storageService.setValue("tracks", seasons); 
      console.log(seasons);
      this.seasonTracks = seasons;
      this.seasonTracksTableHeaders = Object.keys(this.seasonTracks.length ? this.seasonTracks[0] : {});
    })

  // need to get data from local storage when error occured
  }
}
