import { IApplication } from './../interfaces/application.interface';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { IPage } from './../interfaces/page.interface';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-manage-pages',
  templateUrl: './manage-pages.component.html',
  styleUrls: ['./manage-pages.component.scss'],
})
export class ManagePagesComponent implements OnInit {
  @Input() activePageId = '';
  @Input() app: IApplication | undefined;
  @Output() appChange: EventEmitter<IApplication | undefined> = new EventEmitter<IApplication | undefined>();
  @Input() showManagePages = false;
  @Output() activePageIdChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  newPageFormDefaultValue = {
    name: '',
    route: '',
  };
  pageToEdit: IPage | undefined = undefined;
  constructor() {}

  ngOnInit(): void {}

  addNewPage(form: NgForm, modal: ModalDirective) {
    if (!this.pageToEdit) {
      this.app && this.app.pages.push({
        id: new Date().getTime().toString(),
        name: form.value.name,
        route: form.value.route.toLowerCase(),
        isHomePage: false,
        components: [],
      });
    } else {
      this.app && this.app.pages.forEach((page) => {
        page.isHomePage = false;
        if (this.pageToEdit && this.pageToEdit.id) {
          if (page.id === this.pageToEdit.id) {
            page.name = form.value.name;
            page.route = form.value.route;
          }
        }
      });
    }
    this.pageToEdit = undefined;
    this.newPageFormDefaultValue = {
      name: '',
      route: '',
    };
    form.resetForm({});
    modal.hide();
  }

  editClick(selectedPage: IPage, modal: ModalDirective) {
    this.pageToEdit = JSON.parse(JSON.stringify(selectedPage));
    if (this.pageToEdit) {
      this.newPageFormDefaultValue.name = this.pageToEdit.name;
      this.newPageFormDefaultValue.route = this.pageToEdit.route;
    }
    modal.show();
  }

  updateHomePage(selectedPage: IPage) {
    this.app && this.app.pages.forEach((page) => {
      page.isHomePage = false;
      if (selectedPage.id === page.id) {
        selectedPage.isHomePage = true;
      }
    });
  }

  deletePage(selectedPage: IPage) {
    const isConfirmed = confirm(
      'Are you sure! Do you want to delete the Page?'
    );
    if (isConfirmed && this.app) {
      this.app.pages = this.app.pages.filter((p) => p.id != selectedPage.id);
    }
  }
}
