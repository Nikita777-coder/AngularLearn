import { Component, OnInit } from '@angular/core';
import { SeasonData } from '../commons';
import { DataLoaderService } from '../data-loader.service';
import { StorageService } from '../storage.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TableModule } from "primeng/table";
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [TableModule, NgForOf, NgIf, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent implements OnInit {
  protected seasons$: Observable<SeasonData[]>;
  protected seasonTableHeaders;

  constructor(
    private dataLoaderService: DataLoaderService, 
    private storageService: StorageService, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.fetchSeasons();
  }

  private fetchSeasons() {
    this.seasons$ = this.dataLoaderService.getData("seasons")
    .pipe(tap(seasons => {
      this.seasonTableHeaders = Object.keys(seasons.length ? seasons[0] : {});
      this.storageService.setValue("seasons", seasons);
    }))

    // need to get data from local storage when error occured
  }

  public onClickTrack(tracksUrl: string, id: number) {
    this.router.navigate([`tracks/${id}`], {state: {"tracksUrl": tracksUrl}})
  }
}
