import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmantListComponent } from './departmant-list.component';

describe('DepartmantListComponent', () => {
  let component: DepartmantListComponent;
  let fixture: ComponentFixture<DepartmantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmantListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
