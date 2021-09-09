import { IPage } from '../../interfaces/page.interface';
import { IApplication } from '../../interfaces/application.interface';
import { ICutCopyPateValueObject } from '../../interfaces/cut-copy-paste-vo';
import { IAddComponentValueObject } from '../../interfaces/add-component-vo';
import {
  ACTION_TYPE,
  IComponent,
  IEvent,
} from '../../interfaces/component.interface';
import { Input, Output, EventEmitter, Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicPageComponent } from 'src/app/components/dynamic-page/dynamic-page.component';
import { Subscription } from 'rxjs';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-alert-wrapper',
  template: '<h1>This is a Base Class for All Wrapper Components</h1>',
  styleUrls: [],
})
export class WrapperComponentBase {
  @Input() component: IComponent | undefined;
  @Input() componentToEdit: IComponent | null = null;
  @Input() showManagePages = false;
  @Input() isModalWindow = false;
  @Input() isCutOrCopied = false;
  @Input() activePageId = '';
  @Input() activePage: IPage | undefined = undefined;
  @Input() app: IApplication | undefined;
  @Output() appChange: EventEmitter<IApplication> = new EventEmitter<IApplication>();
  @Output() activePageIdChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() lastCopiedOrCutComponent: IComponent | undefined;
  @Output() copy: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() cut: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteBefore: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteAfter: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteInside: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteCancel: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() deleteComponent: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() editComponent: EventEmitter<{ component: IComponent; event: MouseEvent; }> = new EventEmitter<{ component: IComponent; event: MouseEvent; }>();
  @Output() addComponent: EventEmitter<IAddComponentValueObject> = new EventEmitter<IAddComponentValueObject>();
  @Output() managePages: EventEmitter<any> = new EventEmitter<any>();
  @Output() managePageProperties: EventEmitter<any> = new EventEmitter<any>();
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  getUtilitiesClasses(): string {
    if (this.component) {
      return [
        ...this.component.borderAdditive,
        ...this.component.borderAdditive,
        ...this.component.borderSubtractive,
        ...this.component.borderColor,
        ...this.component.borderWidth,
        ...this.component.borderRadius,
        ...this.component.borderSize,
      ].join(' ');
    }
    return '';
  }

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
      events.forEach((event) => {
        if (event.name == eventTargeted) {
          if (event.actions) {
            event.actions.forEach((action) => {
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
                this.app.pages.forEach((page) => {
                  if (this.app && page.id === action.value.trim()) {
                    /* this.activePage = page; */
                    const modalRef: BsModalRef = this.modalService.show(
                      DynamicPageComponent,
                      {
                        backdrop: action.backdrop,
                        keyboard: action.keyboard,
                        ignoreBackdropClick: action.ignoreBackdropClick,
                        animated: action.animated,
                        initialState: {
                          isModalWindow: true,
                          activePage: page,
                          app: this.app,
                        },
                      }
                    );
                    this.app.modalPageId = action.value.trim();
                    const subscription: Subscription | undefined =
                      modalRef.onHidden?.subscribe((next) => {
                        // @ts-ignore
                        if (this.app && this.modalService.modalsCount === 0) {
                          this.app.modalPageId = undefined;
                          subscription && subscription.unsubscribe();
                        }
                      });
                  }
                });
              }
            });
          }
        }
      });
    }
  }
}
