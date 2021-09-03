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
  @Input() pages: IPage[] = [];
  @Input() activePageId = '';
  @Output() activePageIdChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  addNewPage(form: NgForm) {
    this.pages.push({
      id: new Date().getTime().toString(),
      ...form.value,
      components: [],
    });
    // form.resetForm({});
  }

  updateHomePage(selectedPage: IPage) {
    this.pages.forEach((page) => {
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
    if (isConfirmed) {
      this.pages = this.pages.filter((p) => p.id != selectedPage.id);
    }
  }
}
