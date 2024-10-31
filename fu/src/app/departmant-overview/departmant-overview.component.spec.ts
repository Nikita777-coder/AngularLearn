import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmantOverviewComponent } from './departmant-overview.component';

describe('DepartmantOverviewComponent', () => {
  let component: DepartmantOverviewComponent;
  let fixture: ComponentFixture<DepartmantOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmantOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
