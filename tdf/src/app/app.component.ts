import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

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

  constructor(private _enrollmentService: EnrollmentService) {}

  public onSubmit() {
    this._enrollmentService.enroll(this.userModel).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}
