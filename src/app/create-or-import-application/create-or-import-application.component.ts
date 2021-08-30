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
    this.create.emit(
      {
        name: form.value.name,
        layout: form.value.layout,
        defaultPage: defaultPageId,
        pages: [
          {
            name: form.value.defaultPage,
            id: defaultPageId,
            components: [
              /* { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_4 ], id: '1', type: COMPONENT_TYPE.ALERT_PRIMARY, components: [] },
              { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_4 ], id: '2', type: COMPONENT_TYPE.ALERT_SECONDARY, components: [] },
              { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_4 ], id: '3', type: COMPONENT_TYPE.ALERT_SUCCESS, components: [] },
              { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_4 ], id: '4', type: COMPONENT_TYPE.ALERT_DANGER, components: [] },
              { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_4 ], id: '5', type: COMPONENT_TYPE.ALERT_WARNING, components: [] },
              { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_4 ], id: '6', type: COMPONENT_TYPE.ALERT_INFO, components: [] },
              { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_4 ], id: '7', type: COMPONENT_TYPE.ALERT_LIGHT, components: [] },
              { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_4 ], id: '8', type: COMPONENT_TYPE.ALERT_DARK, components: [] },
              { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_4 ], id: '9', type: COMPONENT_TYPE.ALERT_PRIMARY, components: [] },
              { offset: [ ], isCopied: false, isCutted: false, col: [ COL.MD_12 ], id: '10', type: COMPONENT_TYPE.ALERT_PRIMARY, components: [] }, */
            ],
          },
        ],
      }
    );
  }
}
