import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { User } from './user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule, JsonPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tdf';
  protected topics = [
    'Backend',
    'Frontend',
    'AI'
  ]

  protected userModel = new User();
}
