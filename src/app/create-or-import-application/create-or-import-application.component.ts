import { applicationMockData } from './../utilities/mock-data';
import { COMPONENT_TYPE } from './../interfaces/component.interface';
import { IApplication } from './../interfaces/application.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { COL } from '../interfaces/component.interface';

@Component({
  selector: 'app-create-or-import-application',
  templateUrl: './create-or-import-application.component.html',
  styleUrls: ['./create-or-import-application.component.scss'],
})
export class CreateOrImportApplicationComponent {
  @ViewChild('staticModal') staticModal: ModalDirective | undefined;

  // tslint:disable-next-line:variable-name
  _show = false;
  @Output() create: EventEmitter<IApplication> =
    new EventEmitter<IApplication>();
  modalConfig = {
    backdrop: false,
    ignoreBackdropClick: true,
    show: this._show,
  };

  @Input() set show(value: boolean) {
    this._show = value;
    this.modalConfig = {
      backdrop: false,
      ignoreBackdropClick: true,
      show: this._show,
    };
    if (value && this.staticModal) {
      this.staticModal.show();
    } else if (!value && this.staticModal) {
      this.staticModal.hide();
    }
  }

  get show(): boolean {
    return this._show;
  }

  constructor() {}

  createApplication(form: NgForm): void {
    const defaultPageId = 'page_' + new Date().getMilliseconds().toString();
    const appData: IApplication = { ...applicationMockData };
    appData.name = form.value.name;
    appData.layout = form.value.layout;
    appData.defaultPage = defaultPageId;
    appData.pages[0].id = defaultPageId;
    this.create.emit(appData);
  }
}
