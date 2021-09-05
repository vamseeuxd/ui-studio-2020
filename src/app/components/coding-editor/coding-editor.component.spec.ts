import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingEditorComponent } from './coding-editor.component';

describe('CodingEditorComponent', () => {
  let component: CodingEditorComponent;
  let fixture: ComponentFixture<CodingEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodingEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
