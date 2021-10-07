import {IApplication} from '../../interfaces/application.interface';
import {IAddComponentValueObject} from '../../interfaces/add-component-vo';
import {ICutCopyPateValueObject} from '../../interfaces/cut-copy-paste-vo';
import {
  IComponent,
  COMPONENT_TYPE,
} from '../../interfaces/component.interface';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {ADD_OR_PASTE_WHERE} from '../../interfaces/paster-where-enum';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent implements OnInit {
  readonly component_type = COMPONENT_TYPE;
  @HostBinding('class') cssClass = '';
  showContextMenu = false;
  contextMenuPageX = 884;
  contextMenuPageY = 187;
  contextMenuLeftAlign = false;
  // tslint:disable-next-line:variable-name
  private _component: IComponent | undefined;
  public get component(): IComponent | undefined {
    return this._component;
  }

  @Input()
  public set component(value: IComponent | undefined) {
    this._component = value;
    this.cssClass = this.getColClasses();
  }

  // tslint:disable-next-line:variable-name
  private _lastCopiedOrCutComponent: IComponent | undefined;
  public get lastCopiedOrCutComponent(): IComponent | undefined {
    return this._lastCopiedOrCutComponent;
  }

  @Input()
  public set lastCopiedOrCutComponent(value: IComponent | undefined) {
    this._lastCopiedOrCutComponent = value;
    this.cssClass = this.getColClasses();
  }

  @Input() parentList: IComponent[] = [];
  @Input() addComponentContextMenu: any;
  @Input() isChild = false;
  @Input() componentToEdit: IComponent | null = null;
  @Input() showManagePages = false;
  @Input() isModalWindow = false;
  @Input() app: IApplication | undefined;
  @Input() activePageId = '';
  @Output() activePageIdChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() copy: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() cut: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteBefore: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteAfter: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteInside: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() pasteCancel: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() deleteComponent: EventEmitter<ICutCopyPateValueObject> = new EventEmitter<ICutCopyPateValueObject>();
  @Output() editComponent: EventEmitter<{ component: IComponent; event: MouseEvent; }> = new EventEmitter<{ component: IComponent; event: MouseEvent }>();
  @Output() addComponent: EventEmitter<IAddComponentValueObject> = new EventEmitter<IAddComponentValueObject>();

  @Output() managePages: EventEmitter<any> = new EventEmitter<any>();
  @Output() managePageProperties: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('click', ['$event'])
  // tslint:disable-next-line:typedef
  onClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  @HostListener('window:mousedown', ['$event'])
  // tslint:disable-next-line:typedef
  windowMousedown($event: MouseEvent) {
    this.showContextMenu = false;
    this.cssClass = this.getColClasses();
  }

  @HostListener('window:resize', ['$event'])
  // tslint:disable-next-line:typedef
  windowResize($event: MouseEvent) {
    this.showContextMenu = false;
    this.cssClass = this.getColClasses();
  }

  @HostListener('window:pointerdown', ['$event'])
  // tslint:disable-next-line:typedef
  windowPointerdown($event: MouseEvent) {
    const hostElement: HTMLElement =
      this.hostElement.nativeElement.getElementsByTagName(
        'app-action-context-menu'
      )[0];
    if (
      !(
        $event &&
        $event.target &&
        hostElement &&
        hostElement.contains($event.target as HTMLElement)
      )
    ) {
      this.showContextMenu = false;
      this.cssClass = this.getColClasses();
    }
  }

  @HostListener('dblclick', ['$event'])
  // tslint:disable-next-line:typedef
  onDblclick($event: MouseEvent) {
    // To prevent browser's default contextmenu
    this.updateContextMenuPosition($event);
  }

  @HostListener('contextmenu', ['$event'])
  // tslint:disable-next-line:typedef
  contextmenu($event: MouseEvent) {
    // To prevent browser's default contextmenu
    this.updateContextMenuPosition($event);
  }

  constructor(private hostElement: ElementRef) {
  }

  ngOnInit(): void {
  }

  updateContextMenuPosition($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    if (!this.componentToEdit && !this.showManagePages && !this.isModalWindow) {
      this.showContextMenu = true;
      this.cssClass = this.getColClasses();
      this.contextMenuLeftAlign =
        $event.pageX + 250 * 3 > document.body.clientWidth;
      this.contextMenuPageX = $event.pageX;
      this.contextMenuPageY = $event.pageY - 44;
    }
  }

  getColClasses(): string {
    return `
    position-relative
    ${(this.component && this.component.col.join(' '))}
    ${(this.component && this.component.offset.join(' '))}
    `
    /*return (
      (this.component && this.component.col.join(' ')) + ' ' + (this.component && this.component.offset.join(' ')) + ' ' +
      (this.lastCopiedOrCutComponent && this.component?.id == this.lastCopiedOrCutComponent.id ? ' ants ' : '') + ' ' +
      (this.showContextMenu ? 'border shadow border-danger' : '') + ' ' + ' position-relative'
    );*/
  }

  onAction({
             menu: {action, label},
             event,
           }: {
    menu: any;
    event: MouseEvent;
  }): void {
    switch (action) {
      case 'offset-size':
        this.component && this.addOrRemove(this.component.offset, label);
        break;
      case 'col-size':
        this.component && this.addOrRemove(this.component.col, label);
        break;
      case 'border-additive':
        this.component &&
        this.toggleValue(this.component.borderAdditive, label);
        break;
      case 'border-subtractive':
        this.component &&
        this.toggleValue(this.component.borderSubtractive, label);
        break;
      case 'border-color':
        this.component && this.addOrRemove(this.component.borderColor, label);
        break;
      case 'border-width':
        this.component && this.addOrRemove(this.component.borderWidth, label);
        break;
      case 'border-radius':
        this.component && this.toggleValue(this.component.borderRadius, label);
        break;
      case 'border-size':
        this.component && this.addOrRemove(this.component.borderSize, label);
        break;
      case 'copy':
        // copy functionality
        this.component &&
        this.copy.emit({
          component: this.component,
          parent: this.parentList,
        });
        break;
      case 'cut':
        // cut functionality
        this.component &&
        this.cut.emit({component: this.component, parent: this.parentList});
        break;
      case 'paste-before':
        // paste functionality
        this.component &&
        this.pasteBefore.emit({
          component: this.component,
          parent: this.parentList,
        });
        break;
      case 'paste-after':
        // paste functionality
        this.component &&
        this.pasteAfter.emit({
          component: this.component,
          parent: this.parentList,
        });
        break;
      case 'paste-inside':
        // paste functionality
        this.component &&
        this.pasteInside.emit({
          component: this.component,
          parent: this.parentList,
        });
        break;
      case 'paste-cancel':
        // paste functionality
        this.component &&
        this.pasteCancel.emit({
          component: this.component,
          parent: this.parentList,
        });
        break;
      case 'delete':
        // delete functionality
        this.component &&
        this.deleteComponent.emit({
          component: this.component,
          parent: this.parentList,
        });
        break;
      case 'edit':
        // delete functionality
        this.component &&
        this.editComponent.emit({component: this.component, event});
        break;
      case 'add-alert-before':
        this.component &&
        this.addComponent.emit({
          component: this.component,
          parent: this.parentList,
          where: ADD_OR_PASTE_WHERE.BEFORE_COMPONENT,
          componentName: 'ALERT'
        });
        break;
      case 'add-alert-after':
        this.component &&
        this.addComponent.emit({
          component: this.component,
          parent: this.parentList,
          where: ADD_OR_PASTE_WHERE.AFTER_COMPONENT,
          componentName: 'ALERT',
        });
        break;
      case 'add-alert-inside':
        this.component &&
        this.addComponent.emit({
          component: this.component,
          parent: this.parentList,
          where: ADD_OR_PASTE_WHERE.INSIDE_COMPONENT,
          componentName: 'ALERT',
        });
        break;
      case 'add-accordion-before':
        this.component &&
        this.addComponent.emit({
          component: this.component,
          parent: this.parentList,
          where: ADD_OR_PASTE_WHERE.BEFORE_COMPONENT,
          componentName: 'ACCORDION'
        });
        break;
      case 'add-accordion-after':
        this.component &&
        this.addComponent.emit({
          component: this.component,
          parent: this.parentList,
          where: ADD_OR_PASTE_WHERE.AFTER_COMPONENT,
          componentName: 'ACCORDION',
        });
        break;
      case 'add-accordion-inside':
        this.component &&
        this.addComponent.emit({
          component: this.component,
          parent: this.parentList,
          where: ADD_OR_PASTE_WHERE.INSIDE_COMPONENT,
          componentName: 'ACCORDION',
        });
        break;
      case 'manage-pages':
        this.managePages.emit();
        break;
      case 'manage-properties':
        this.managePageProperties.emit();
        break;

      default:
        break;
    }
    this.showContextMenu = false;
    this.component = this.component;
  }

  toggleValue(array: string[], newVal: string): void {
    let removeIndex = -1;
    array.forEach((oldVal, index) => {
      if (oldVal === newVal) {
        removeIndex = index;
      }
    });
    if (removeIndex >= 0) {
      array.splice(removeIndex, 1);
    } else {
      array.push(newVal);
    }
  }

  addOrRemove(array: string[], value: string): void {
    let removeIndex = -1;
    let oldValue = '';
    array.forEach((val, index) => {
      /* const oldVal = value.includes('-') ? value.split('-').slice(0, -1).join('-') : value;
      const newVal = val.includes('-') ? val.split('-').slice(0, -1).join('-') : val; */
      const oldVal = value.split('-').slice(0, -1).join('-');
      const newVal = val.split('-').slice(0, -1).join('-');
      if (oldVal === newVal) {
        removeIndex = index;
        oldValue = val;
      }
    });
    if (oldValue === value) {
      array.splice(removeIndex, 1);
    } else if (removeIndex >= 0) {
      array[removeIndex] = value;
    } else {
      array.push(value);
    }
  }
}
