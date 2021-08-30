import { COL, IComponent } from './../interfaces/component.interface';
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

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent implements OnInit {
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
  private _lastCopiedOrCuttedComponent: IComponent | undefined;
  public get lastCopiedOrCuttedComponent(): IComponent | undefined {
    return this._lastCopiedOrCuttedComponent;
  }
  @Input()
  public set lastCopiedOrCuttedComponent(value: IComponent | undefined) {
    this._lastCopiedOrCuttedComponent = value;
    this.cssClass = this.getColClasses();
  }

  @Input() parentList: IComponent[] = [];
  @Input() isChild = false;

  // @Input() lastCopiedOrCuttedComponent: IComponent | undefined;
  @Output() copy: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() cut: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteBefore: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteAfter: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteInside: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteCancel: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() deleteComponent: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();

  @HostListener('window:mousedown', ['$event'])
  // tslint:disable-next-line:typedef
  windowMousedown($event: MouseEvent) {
    this.showContextMenu = false;
    this.cssClass = this.getColClasses();
  }

  @HostListener('window:pointerdown', ['$event'])
  // tslint:disable-next-line:typedef
  windowPointerdown($event: MouseEvent) {
    const hostElement:HTMLElement = this.hostElement.nativeElement.getElementsByTagName('app-action-context-menu')[0];
    if(!($event && $event.target && hostElement && hostElement.contains($event.target as HTMLElement))){
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

  constructor(private hostElement: ElementRef) {}

  ngOnInit(): void {}

  updateContextMenuPosition($event: MouseEvent){
    $event.preventDefault();
    $event.stopPropagation();
    this.showContextMenu = true;
    this.cssClass = this.getColClasses();
    this.contextMenuLeftAlign = $event.pageX + (250 * 3) > document.body.clientWidth;
    this.contextMenuPageX = $event.pageX;
    this.contextMenuPageY = $event.pageY - 44;
    // this.contextMenuPageX = $event.pageX + (250 * 1) > document.body.clientWidth ? (document.body.clientWidth - 260) :  $event.pageX;
  }

  getColClasses(): string {
    return (
      (this.component && this.component.col.join(' ')) +
      ' ' +
      (this.component && this.component.offset.join(' ')) +
      ' ' +
      (this.lastCopiedOrCuttedComponent &&
      this.component?.id == this.lastCopiedOrCuttedComponent.id
        ? ' ants '
        : '') +
      ' ' +
      (this.showContextMenu
        ? 'border shadow border-danger'
        : '') +
      ' ' +
      ' position-relative d-block'
    );
  }

  onAction({ action, label }: any): void {
    switch (action) {
      case 'offset-size':
        this.component && this.addOrRemove(this.component.offset, label);
        break;
      case 'col-size':
        this.component && this.addOrRemove(this.component.col, label);
        break;
      case 'copy':
        // copy functionality
        this.component && this.copy.emit({component:this.component,parent: this.parentList});
        break;
      case 'cut':
        // cut functionality
        this.component && this.cut.emit({component:this.component,parent: this.parentList});
        break;
      case 'paste-before':
        // paste functionality
        this.component && this.pasteBefore.emit({component:this.component,parent: this.parentList});
        break;
      case 'paste-after':
        // paste functionality
        this.component && this.pasteAfter.emit({component:this.component,parent: this.parentList});
        break;
      case 'paste-inside':
        // paste functionality
        this.component && this.pasteInside.emit({component:this.component,parent: this.parentList});
        break;
      case 'paste-cancel':
        // paste functionality
        this.component && this.pasteCancel.emit({component:this.component,parent: this.parentList});
        break;
      case 'delete':
        // delete functionality
        this.component && this.deleteComponent.emit({component:this.component,parent: this.parentList});
        break;

      default:
        break;
    }
    this.showContextMenu = false;
    this.component = this.component;
  }

  addOrRemove(array: string[], value: string): void {
    let removeIndex = -1;
    let oldValue = '';
    debugger;
    array.forEach((val, index) => {
      if (val.split('-').slice(0, -1).join('-') === value.split('-').slice(0, -1).join('-')) {
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
