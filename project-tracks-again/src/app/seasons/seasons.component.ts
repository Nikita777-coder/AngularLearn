import { Component, OnInit } from '@angular/core';
import { SeasonData } from '../commons';
import { DataLoaderService } from '../data-loader.service';
import { StorageService } from '../storage.service';
import { NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [TableModule, NgForOf, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent implements OnInit {
  protected seasons: Array<SeasonData> = [];

  protected seasonTableHeaders;

  constructor(
    private dataLoaderService: DataLoaderService, 
    private storageService: StorageService, 
    private router: Router, 
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let token = this.storageService.getData("token");

    if (!token) {
      this.dataLoaderService.getData("token").subscribe(token => {
        this.storageService.setValue("token", token); 
        console.log(token);
        this.fetchSeasons(token); 
      });
    } else {
      this.fetchSeasons(token);
    }
  }

  private fetchSeasons(token: string) {
      this.dataLoaderService.getData("seasons", [token]).subscribe(seasons => {
        this.storageService.setValue("seasons", seasons); 
        console.log(seasons);
        this.seasons = seasons;
        this.seasonTableHeaders = Object.keys(this.seasons.length ? this.seasons[0] : {});
      })

    // need to get data from local storage when error occured
  }

  public onClickTrack(tracksUrl: string, id: number) {
    this.router.navigate([`tracks/${id}`], {state: {"tracksUrl": tracksUrl}})
  }
}
