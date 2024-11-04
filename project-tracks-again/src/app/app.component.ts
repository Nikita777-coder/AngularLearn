import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TableModule} from "primeng/table";
import {DataLoaderService} from "./data-loader.service";
import {SeasonData} from "./commons";
import {StorageService} from './storage.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableModule, NgForOf, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'project-tracks-again';

  protected seasons: Array<SeasonData> = [];

  protected seasonTableHeaders;

  constructor(private dataLoaderService: DataLoaderService, private storageService: StorageService) {
    console.log(this.seasons)
  }
  ngOnInit(): void {
    let token: string = this.storageService.getData("token");
    this.seasons = this.storageService.getData("seasons", [token]);
    this.seasonTableHeaders = Object.keys(this.seasons.length ? this.seasons[0] : {})
  }

  protected readonly Object = Object;
}
