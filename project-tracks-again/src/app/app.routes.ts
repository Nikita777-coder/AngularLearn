import { Routes } from '@angular/router';
import { SeasonTracksComponent } from './season-tracks/season-tracks.component';
import { SeasonsComponent } from './seasons/seasons.component';

export const routes: Routes = [
    { path: '', redirectTo: 'seasons', pathMatch: 'full'},
    { path: 'seasons', component: SeasonsComponent },
    { path: 'tracks/:id', component: SeasonTracksComponent }
];
