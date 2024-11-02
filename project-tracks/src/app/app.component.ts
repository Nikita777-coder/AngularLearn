import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataLoaderService } from './data-loader.service';
import { SeasonData } from './commons';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'project-tracks';

  protected seasons: Array<SeasonData> = new Array();

  constructor(private dataLoader: DataLoaderService) {
    console.log(this.seasons)
  }
  ngOnInit(): void {
    console.log(1)
    this.seasons = this.dataLoader.getSeasonsInfoFromServer()
    console.log(this.seasons)
  }
}
