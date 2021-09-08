import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPropertysEditorComponent } from './component-properties-editor.component';

describe('ComponentPropertysEditorComponent', () => {
  let component: ComponentPropertysEditorComponent;
  let fixture: ComponentFixture<ComponentPropertysEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentPropertysEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPropertysEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
