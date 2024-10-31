import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmantDetailComponent } from './departmant-detail.component';

describe('DepartmantDetailComponent', () => {
  let component: DepartmantDetailComponent;
  let fixture: ComponentFixture<DepartmantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmantDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
