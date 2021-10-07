import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionGroupWrapperComponent } from './accordion-group-wrapper.component';

describe('AccordionGroupWrapperComponent', () => {
  let component: AccordionGroupWrapperComponent;
  let fixture: ComponentFixture<AccordionGroupWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionGroupWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionGroupWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
