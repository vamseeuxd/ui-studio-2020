import { IPageProp } from './../../interfaces/page.interface';
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IApplication } from 'src/app/interfaces/application.interface';
import { IPage } from 'src/app/interfaces/page.interface';

@Component({
  selector: 'app-component-properties-editor',
  templateUrl: './component-properties-editor.component.html',
  styleUrls: ['./component-properties-editor.component.scss'],
})
export class ComponentPropertysEditorComponent implements OnInit {
  formDefaultValue = {
    name: '',
    dataType: '',
    defaultValue: '',
    description: '',
  };

  propertyToEdit: IPageProp | undefined = undefined;

  private _app: IApplication | undefined;
  public get app(): IApplication | undefined {
    return this._app;
  }
  @Input()
  public set app(value: IApplication | undefined) {
    this._app = value;
  }
  @Output() appChange: EventEmitter<IApplication | undefined> =
    new EventEmitter<IApplication | undefined>();

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  get activePage(): IPage | undefined {
    const activePage =
      this.app && this.app.pages && this.app.pages.length
        ? this.app.pages.find(
            (p) =>
              p.id ===
              (this.app && this.app.defaultPage && this.app.defaultPage)
          )
        : undefined;
    return activePage;
  }

  get activePagePropertys(): IPageProp[] {
    return this.activePage && this.activePage.properties
      ? this.activePage.properties
      : [];
  }

  constructor() {}

  ngOnInit(): void {}

  addNewPageProperty(form: NgForm, modal: ModalDirective) {
    debugger;
    if (!this.propertyToEdit) {
      if (this.activePage && this.activePage.properties) {
        this.activePage.properties.push({
          id: new Date().getTime().toString(),
          ...form.value,
        });
      }
    } else {
      if (this.activePage && this.activePage.properties) {
        this.activePage.properties.forEach((prop) => {
          if (this.propertyToEdit && this.propertyToEdit.id) {
            if (prop.id === this.propertyToEdit.id) {
              prop.name = form.value.name;
              prop.dataType = form.value.dataType;
              prop.defaultValue = form.value.defaultValue;
              prop.description = form.value.description;
            }
          }
        });
      }
    }
    this.resetAddNewPropertyForm(form);
    modal.hide();
  }

  resetAddNewPropertyForm(form: NgForm) {
    form.resetForm({});
    this.formDefaultValue = {
      name: '',
      dataType: '',
      defaultValue: '',
      description: '',
    };
    this.propertyToEdit = undefined;
  }

  editClick(selectedPageProperty: IPageProp, modal: ModalDirective) {
    this.propertyToEdit = JSON.parse(JSON.stringify(selectedPageProperty));
    if (this.propertyToEdit) {
      this.formDefaultValue.name = this.propertyToEdit.name;
      this.formDefaultValue.dataType = this.propertyToEdit.dataType;
      this.formDefaultValue.defaultValue = this.propertyToEdit.defaultValue;
      this.formDefaultValue.description = this.propertyToEdit.description;
    }
    modal.show();
  }

  deletePage(selectedPage: IPageProp) {
    const isConfirmed = confirm(
      'Are you sure! Do you want to delete the Page Property?'
    );
    if (isConfirmed && this.activePage && this.activePage.properties) {
      this.activePage.properties = this.activePagePropertys.filter(
        (p) => p.id != selectedPage.id
      );
    }
  }
}
