import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmantContactComponent } from './departmant-contact.component';

describe('DepartmantContactComponent', () => {
  let component: DepartmantContactComponent;
  let fixture: ComponentFixture<DepartmantContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmantContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmantContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
