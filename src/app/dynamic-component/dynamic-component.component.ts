import { COL, IComponent } from './../interfaces/component.interface';
import {
  Component,
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

  // @Input() lastCopiedOrCuttedComponent: IComponent | undefined;
  @Output() copy: EventEmitter<IComponent> = new EventEmitter<IComponent>();
  @Output() cut: EventEmitter<IComponent> = new EventEmitter<IComponent>();
  @Output() pasteBefore: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteAfter: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteInside: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteCancel: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();

  @HostListener('window:mousedown', ['$event'])
  // tslint:disable-next-line:typedef
  windowClick($event: MouseEvent) {
    this.showContextMenu = false;
    this.cssClass = this.getColClasses();
  }

  @HostListener('contextmenu', ['$event'])
  // tslint:disable-next-line:typedef
  contextmenu($event: MouseEvent) {
    // console.log($event);
    // To prevent browser's default contextmenu
    $event.preventDefault();
    $event.stopPropagation();
    this.showContextMenu = true;
    this.cssClass = this.getColClasses();
    this.contextMenuPageX = $event.pageX;
    this.contextMenuPageY = $event.pageY;
  }

  constructor() {}

  ngOnInit(): void {}

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
        ? 'shadow border-danger'
        : 'border-light border-top-0 border-right-0') +
      ' ' +
      ' border position-relative'
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
        this.copy.emit(this.component);
        break;
      case 'cut':
        // cut functionality
        this.cut.emit(this.component);
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

      default:
        break;
    }
    // console.log(action);
    this.showContextMenu = false;
    this.component = this.component;
  }

  addOrRemove(array: string[], value: string): void {
    let removeIndex = -1;
    let oldValue = '';
    array.forEach((val, index) => {
      if (val.slice(0, 6) === value.slice(0, 6)) {
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
