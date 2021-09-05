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
export class ComponentPropertiesEditorComponent implements OnInit {
  formDefaultValue = {
    name: '',
    dataType: '',
    defaultValue: '',
    description: '',
  };

  pageToEdit: IPage | undefined = undefined;

  @Input() app: IApplication | undefined;
  @Output() appChange: EventEmitter<IApplication | undefined> =
    new EventEmitter<IApplication | undefined>();

  constructor() {}

  ngOnInit(): void {}

  addNewPage(form: NgForm, modal: ModalDirective) {
    if (!this.pageToEdit) {
      this.app &&
        this.app.pages.push({
          id: new Date().getTime().toString(),
          name: form.value.name,
          route: form.value.route.toLowerCase(),
          isHomePage: false,
          properties: [],
          components: [],
        });
    } else {
      this.app &&
        this.app.pages.forEach((page) => {
          page.isHomePage = false;
          if (this.pageToEdit && this.pageToEdit.id) {
            if (page.id === this.pageToEdit.id) {
              page.name = form.value.name;
              page.route = form.value.route;
            }
          }
        });
    }
  }
}
