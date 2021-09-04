import { IApplication } from './../../interfaces/application.interface';
import { ICutCopyPateValueObject } from './../../interfaces/cut-copy-paste-vo';
import { IAddComponentValueObject } from './../../interfaces/add-component-vo';
import {
  ACTION_TYPE,
  IComponent,
  IEvent,
} from './../../interfaces/component.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-wraper',
  templateUrl: './alert-wraper.component.html',
  styleUrls: ['./alert-wraper.component.scss'],
})
export class AlertWraperComponent implements OnInit {
  @Input() component: IComponent | undefined;
  @Input() componentToEdit: IComponent | null = null;
  @Input() showManagePages = false;
  @Input() isModalWindow = false;
  @Input() activePageId = '';
  @Input() app: IApplication | undefined;
  @Output() appChange: EventEmitter<IApplication> = new EventEmitter<IApplication>();
  @Output() activePageIdChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Input() lastCopiedOrCuttedComponent: IComponent | undefined;
  @Output() copy: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() cut: EventEmitter<ICutCopyPateValueObject> =
    new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteBefore: EventEmitter<ICutCopyPateValueObject> =
    new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteAfter: EventEmitter<ICutCopyPateValueObject> =
    new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteInside: EventEmitter<ICutCopyPateValueObject> =
    new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteCancel: EventEmitter<ICutCopyPateValueObject> =
    new EventEmitter<ICutCopyPateValueObject>();
  @Output() deleteComponent: EventEmitter<ICutCopyPateValueObject> =
    new EventEmitter<ICutCopyPateValueObject>();
  @Output() editComponent: EventEmitter<{
    component: IComponent;
    event: MouseEvent;
  }> = new EventEmitter<{
    component: IComponent;
    event: MouseEvent;
  }>();
  @Output() addComponent: EventEmitter<IAddComponentValueObject> =
    new EventEmitter<IAddComponentValueObject>();
  @Output() managePages: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  getPropValueByName(propName: string): any {
    if (
      this.component &&
      this.component.props &&
      this.component.props.length > 0
    ) {
      let returnValue: any = '';
      this.component.props.forEach((prop) => {
        if (prop.name == propName) {
          returnValue = prop.value;
        }
      });
      return returnValue;
    }
    return null;
  }

  getActions() {
    if (
      this.component &&
      this.component.events &&
      this.component.events.length > 0
    ) {
      return this.component.events[0].actions;
    }
    return [];
  }

  onClick(
    $event: MouseEvent,
    events: IEvent[] | undefined,
    eventTargeted: string
  ) {
    if (events) {
      events.forEach((evtent) => {
        debugger;
        if (evtent.name == eventTargeted) {
          if (evtent.actions) {
            evtent.actions.forEach((action) => {
              if (
                action.type == ACTION_TYPE.LINK &&
                (action.value as string).trim().length > 0
              ) {
                window.open(action.value.trim(), action.target);
              }
              if (
                action.type == ACTION_TYPE.PAGE &&
                (action.value as string).trim().length > 0
              ) {
                this.activePageId = action.value.trim();
                this.activePageIdChange.emit(action.value.trim());
              }
              if (
                this.app &&
                action.type == ACTION_TYPE.MODAL &&
                (action.value as string).trim().length > 0
              ) {
                this.app.modalPageId = action.value.trim();
                this.appChange.emit(this.app);
              }
            });
          }
        }
      });
    }
  }
}
