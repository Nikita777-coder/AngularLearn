import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SeasonTracksData } from '../commons';

@Component({
  selector: 'app-season-tracks',
  standalone: true,
  imports: [TableModule, NgForOf, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './season-tracks.component.html',
  styleUrl: './season-tracks.component.css'
})
export class SeasonTracksComponent {
  protected seasonTracks: SeasonTracksData[] = [];
  protected seasonTracksTableHeaders;
}
