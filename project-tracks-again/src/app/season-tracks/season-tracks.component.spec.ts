import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonTracksComponent } from './season-tracks.component';

describe('SeasonTracksComponent', () => {
  let component: SeasonTracksComponent;
  let fixture: ComponentFixture<SeasonTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonTracksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
