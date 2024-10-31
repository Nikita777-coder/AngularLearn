import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentOverviewComponent } from './department-overview/department-overview.component';
import { DepartmentContactComponent } from './department-contact/department-contact.component';
import { EmployeesComponent } from './employees/employees.component';

export const routes: Routes = [
    { path: '', redirectTo: '/departments', pathMatch: 'full' },
    {
        path: 'departments',
        title: 'GetDepartments',
        component: DepartmentsComponent,
    },
    { 
        path: 'department/:id', 
        component: DepartmentDetailsComponent,
        children: [
          { path: 'overview', component: DepartmentOverviewComponent},
          { path: 'contact', component: DepartmentContactComponent}
        ]
    },
    {   path: 'employees', 
        component: EmployeesComponent 
    },
    {
        path: '**',
        title: '404 - Page not found',
        component: PageNotFoundComponent,
    },
];
