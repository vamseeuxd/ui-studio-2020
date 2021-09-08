import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPropertiesEditorComponent } from './component-properties-editor.component';

describe('ComponentPropertiesEditorComponent', () => {
  let component: ComponentPropertiesEditorComponent;
  let fixture: ComponentFixture<ComponentPropertiesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentPropertiesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPropertiesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
