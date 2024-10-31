import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-departmant-detail',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './departmant-detail.component.html',
  styleUrl: './departmant-detail.component.css'
})
export class DepartmantDetailComponent implements OnInit {
  protected id = 0;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    let param = this.activatedRoute.snapshot.paramMap.get("id");
    let id = parseInt(param ? param : "");

    if (id > 5) {
        this.router.navigate(['/fupage']);
      }

    this.id = id;
  }

  private getNavigationId(previous: boolean): void {
    if (this.id == 1 && previous) {
      this.id = 5;
      return;
    }

    if (this.id == 5 && !previous) {
      this.id = 1;
      return;
    }

    let one = previous ? -1 : 1;
    this.id += one;
  }

  private navigate(args: Array<Object>) {
    this.router.navigate(args);
  }

  public goPrevious(): void {
    this.getNavigationId(true);
    this.navigate(['/departmants', this.id])
  }

  public goNext(): void {
    this.getNavigationId(false);
    this.navigate(['/departmants', this.id])
  }

  public overview(): void {
    this.router.navigate(['overview'], {relativeTo: this.activatedRoute});
  }

  public contact(): void {
    this.router.navigate(['contact'], {relativeTo: this.activatedRoute});
  }
}
