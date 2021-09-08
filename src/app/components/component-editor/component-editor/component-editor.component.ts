import { IApplication } from '../../../interfaces/application.interface';
import {
  IComponent,
  COMPONENT_PROP_TYPE,
  ACTION_TYPE,
  IEvent,
  IAction,
} from '../../../interfaces/component.interface';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Component({
  selector: 'app-component-editor',
  templateUrl: './component-editor.component.html',
  styleUrls: ['./component-editor.component.scss'],
})
export class ComponentEditorComponent implements AfterViewInit {
  readonly PropType = COMPONENT_PROP_TYPE;
  readonly ActionType = ACTION_TYPE;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() component: IComponent | null = null;
  @Input() app: IApplication | null = null;
  @Input() mouseEvent: MouseEvent | null = null;
  @HostBinding('class') cssClass = 'position-fixed';
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.mouseEvent) {
      const { clientWidth, clientHeight } = this.el.nativeElement;
      const { pageX, pageY } = this.mouseEvent;
      this.el.nativeElement.style.zIndex = '100000';
      this.el.nativeElement.style.left = pageX - clientWidth / 2 + 'px';
      this.el.nativeElement.style.top = pageY - clientHeight / 2 + 'px';
    }
  }

  addNavigateToPageAction(popoverBtn: PopoverDirective, event: IEvent): void {
    const newAction: IAction = {
      label: 'Navigate to Page',
      id: new Date().getTime().toString(),
      type: ACTION_TYPE.PAGE,
      value: '',
      description: '',
    };
    if (event.actions && event.actions.length > 0) {
      event.actions.push(newAction);
    } else {
      event.actions = [];
      event.actions.push(newAction);
    }
    popoverBtn.hide();
  }

  addModalWindowAction(popoverBtn: PopoverDirective, event: IEvent): void {
    const newAction: IAction = {
      label: 'Open Modal Dialog',
      id: new Date().getTime().toString(),
      type: ACTION_TYPE.MODAL,
      value: '',
      description: '',
    };
    if (event.actions && event.actions.length > 0) {
      event.actions.push(newAction);
    } else {
      event.actions = [];
      event.actions.push(newAction);
    }
    popoverBtn.hide();
  }

  addExternalLinkAction(popoverBtn: PopoverDirective, event: IEvent): void {
    const newAction: IAction = {
      label: 'Open External Link',
      type: ACTION_TYPE.LINK,
      id: new Date().getTime().toString(),
      value: '',
      target: '_blank',
      description: '',
    };
    if (event.actions && event.actions.length > 0) {
      event.actions.push(newAction);
    } else {
      event.actions = [];
      event.actions.push(newAction);
    }
    popoverBtn.hide();
  }

  deleteAction(action: IAction, event: IEvent) {
    const isConfirmed = confirm('Are you sure!Do you want to delete action?');
    if (isConfirmed) {
      if (event.actions && event.actions.length > 0) {
        event.actions = event.actions.filter((act) => act.id != action.id);
      }
    }
  }
}
