import { Routes } from '@angular/router';
import { DepartmantOverviewComponent } from './departmant-overview/departmant-overview.component';
import { DepartmantDetailComponent } from './departmant-detail/departmant-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DepartmantListComponent } from './departmant-list/departmant-list.component';
import { DepartmantContactComponent } from './departmant-contact/departmant-contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/departmants', pathMatch: 'full' },
  { path: 'departmants', component: DepartmantListComponent },
  { 
    path: 'departmants/:id', 
    component: DepartmantDetailComponent,
    children: [
      {path: 'overview', component: DepartmantOverviewComponent},
      {path: 'contact', component: DepartmantContactComponent}
    ]
  },
  { path: 'employees', component: EmployeeListComponent },
  { path: '**', component: PageNotFoundComponent}
];
