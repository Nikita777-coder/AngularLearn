import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactive-forms';

  protected registrationForm = new FormGroup({
    userName: new FormControl('Vishwas'),
    password: new FormControl('Vishwas'),
    confirmPassword: new FormControl('Vishwas'),
    address: new FormGroup({
      country: new FormControl(),
      city: new FormControl()
    })
  })

  public loadApiData() {
    this.registrationForm.patchValue({
      userName: "sdlksld",
      password: "sds",
      confirmPassword: "sds"
    })
  }
}
