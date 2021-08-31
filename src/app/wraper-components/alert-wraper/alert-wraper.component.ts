import { ICutCopyPateValueObject } from './../../interfaces/cut-copy-paste-vo';
import { IAddComponentValueObject } from './../../interfaces/add-component-vo';
import { IComponent } from './../../interfaces/component.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-wraper',
  templateUrl: './alert-wraper.component.html',
  styleUrls: ['./alert-wraper.component.scss'],
})
export class AlertWraperComponent implements OnInit {
  @Input() component: IComponent | undefined;
  @Input() componentToEdit: IComponent | null = null;
  @Input() lastCopiedOrCuttedComponent: IComponent | undefined;
  @Output() copy: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() cut: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteBefore: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteAfter: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteInside: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteCancel: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() deleteComponent: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() editComponent: EventEmitter<{ component: IComponent }> = new EventEmitter<{ component: IComponent }>();
  @Output() addComponent: EventEmitter<IAddComponentValueObject> = new EventEmitter<IAddComponentValueObject>();
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
}
