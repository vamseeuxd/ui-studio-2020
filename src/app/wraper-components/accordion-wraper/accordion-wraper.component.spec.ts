import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionWraperComponent } from './accordion-wraper.component';

describe('AccordionWraperComponent', () => {
  let component: AccordionWraperComponent;
  let fixture: ComponentFixture<AccordionWraperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionWraperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionWraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
