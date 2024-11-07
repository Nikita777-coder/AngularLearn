import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SeasonTracksData, CommonFunctions } from '../commons';
import { Observable } from 'rxjs/internal/Observable';
import { DataLoaderService } from '../data-loader.service';
import { StorageService } from '../storage.service';
import { Subject, Subscription, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-season-tracks',
  standalone: true,
  imports: [TableModule, NgForOf, NgIf, RouterLink, RouterLinkActive, JsonPipe, AsyncPipe],
  templateUrl: './season-tracks.component.html',
  styleUrl: './season-tracks.component.css'
})
export class SeasonTracksComponent implements OnInit, OnDestroy {
  protected seasonTracks$: Observable<SeasonTracksData[]>;
  protected seasonTracksTableHeaders;
  protected fullTracskUrl = "";
  private state: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataLoaderService: DataLoaderService,
    private storageService: StorageService,
    private commonFunctions: CommonFunctions
  ) {
    
  }

  ngOnInit(): void {
    this.state = this.route.paramMap.pipe(
      tap(() => this.fullTracskUrl = window.history.state.tracksUrl),
    ).subscribe();

    let token = this.commonFunctions.getToken();
    token.subscribe(tok => this.fetchSeasonTracks(tok));
  }

  fetchSeasonTracks(token: string) {
    this.seasonTracks$ = this.dataLoaderService.getData("tracks", [token, this.fullTracskUrl])
    .pipe(tap(seasonTracks => {
      this.seasonTracksTableHeaders = Object.keys(seasonTracks.length ? seasonTracks[0] : {});
      this.storageService.setValue("tracks", seasonTracks);
    }))

  // need to get data from local storage when error occured
  }

  ngOnDestroy(): void {
    this.state.unsubscribe();
  }
}

