import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactive-forms';

  protected registrationForm = new FormGroup({
    userName: new FormControl('Vishwas', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('Vishwas'),
    confirmPassword: new FormControl('Vishwas'),
    address: new FormGroup({
      country: new FormControl(),
      city: new FormControl()
    })
  })

  protected getPropertyFromForm(name: string): AbstractControl | null | undefined {
    if (name !== "country" && name !== "city") {
      return this.registrationForm.get(name);
    }

    return this.registrationForm.get('address')?.get(name);
  }

  public loadApiData() {
    this.registrationForm.patchValue({
      userName: "sdlksld",
      password: "sds",
      confirmPassword: "sds"
    })
  }
}
