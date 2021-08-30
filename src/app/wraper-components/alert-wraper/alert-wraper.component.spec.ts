import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWraperComponent } from './alert-wraper.component';

describe('AlertWraperComponent', () => {
  let component: AlertWraperComponent;
  let fixture: ComponentFixture<AlertWraperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertWraperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
