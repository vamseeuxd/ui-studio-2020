import { COL, IComponent } from './../interfaces/component.interface';
import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
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
        break;
      case 'cut':
        // cut functionality
        break;
      case 'paste':
        // paste functionality
        break;

      default:
        break;
    }
    console.log(action);
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
