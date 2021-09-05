import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableListGroupItemComponent } from './expandable-list-group-item.component';

describe('ExpandableListGroupItemComponent', () => {
  let component: ExpandableListGroupItemComponent;
  let fixture: ComponentFixture<ExpandableListGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandableListGroupItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableListGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
