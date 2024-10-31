import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './department-details.component.html',
  styleUrl: './department-details.component.css'
})
export class DepartmentDetailsComponent {
  protected departmentId = 0;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe((params: ParamMap) => {
      let param = params.get('id');
      let id = parseInt(param ? param : "");
      this.departmentId = id;

    });
  }

  goPrevious() {
    let previousId = this.departmentId - 1;
    this.router.navigate(['/departments', previousId]);
  }
  goNext() {
    let nextId = this.departmentId + 1;
    this.router.navigate(['/departments', nextId]);
  }

  gotoDepartments() {
    let selectedId = this.departmentId ? this.departmentId : null;
    //this.router.navigate(['/departments', {id: selectedId}]);   
    this.router.navigate(['../', { id: selectedId }], { relativeTo: this.route });
  }
  
  showOverview(){
    this.router.navigate(['overview'], { relativeTo: this.route });
  }

  showContact(){
    this.router.navigate(['contact'], { relativeTo: this.route });
  }
}
