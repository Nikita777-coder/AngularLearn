import { Component, OnInit } from '@angular/core';
import { SeasonData } from '../commons';
import { DataLoaderService } from '../data-loader.service';
import { StorageService } from '../storage.service';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [TableModule, NgForOf, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent implements OnInit {
  protected seasons: Array<SeasonData> = [
    {id: 1, name: "name", countTracks: 5, countPanoramas: 6, trackLink: "/tracks/1"},
    {id: 2, name: "name1", countTracks: 5, countPanoramas: 6, trackLink: "/tracks/2"},
    {id: 3, name: "name2", countTracks: 5, countPanoramas: 6, trackLink: "/tracks/3"},
    {id: 4, name: "name3", countTracks: 5, countPanoramas: 6, trackLink: "/tracks/4"},
    {id: 5, name: "name4", countTracks: 5, countPanoramas: 6, trackLink: "/tracks/5"}
  ];

  protected seasonTableHeaders;

  constructor(private dataLoaderService: DataLoaderService, private storageService: StorageService) {
    console.log(this.seasons)
  }

  ngOnInit(): void {
    // let token: string = this.storageService.getData("token");
    // this.seasons = this.storageService.getData("seasons", [token]);
    this.seasonTableHeaders = Object.keys(this.seasons.length ? this.seasons[0] : {})
  }
}
