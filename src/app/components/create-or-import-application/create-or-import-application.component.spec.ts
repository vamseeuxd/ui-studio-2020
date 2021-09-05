import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrImportApplicationComponent } from './create-or-import-application.component';

describe('CreateOrImportApplicationComponent', () => {
  let component: CreateOrImportApplicationComponent;
  let fixture: ComponentFixture<CreateOrImportApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrImportApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrImportApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
