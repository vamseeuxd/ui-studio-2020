import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableListGroupComponent } from './expandable-list-group.component';

describe('ExpandableListGroupComponent', () => {
  let component: ExpandableListGroupComponent;
  let fixture: ComponentFixture<ExpandableListGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandableListGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
