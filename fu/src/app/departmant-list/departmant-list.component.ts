import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-departmant-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './departmant-list.component.html',
  styleUrl: './departmant-list.component.css'
})
export class DepartmantListComponent implements OnInit {
  public selectId = 0;

  public departmants = [
    {"id": 1, "name": "angular"},
    {"id": 2, "name": "Node"},
    {"id": 3, "name": "MongoDB"},
    {"id": 4, "name": "Ruby"},
    {"id": 5, "name": "Bootstrap"}
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let p = params.get('id');
      let id = parseInt(p ? p : "");

      this.selectId = id;
    
    } );
  }

  onSelect(department: { id: number; }) {
    //this.router.navigate(['/departments', department.id]);
     this.router.navigate([department.id], { relativeTo: this.route });
  }

  isSelected(department: { id: number; }) { return department.id === this.selectId; }
}
