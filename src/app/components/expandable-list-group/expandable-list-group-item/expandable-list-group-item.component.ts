import { IComponent } from './../../../interfaces/component.interface';
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
  selector: 'app-expandable-list-group-item',
  templateUrl: './expandable-list-group-item.component.html',
  styleUrls: ['./expandable-list-group-item.component.scss'],
})
export class ExpandableListGroupItemComponent implements OnInit {
  private _isSubMenu = true;
  private _component: IComponent | undefined;
  @Input() level = 1;
  public get component(): IComponent | undefined {
    return this._component;
  }
  @Input()
  public set component(value: IComponent | undefined) {
    this._component = value;
    this.updateHostCssClassName();
  }
  public get isSubMenu() {
    return this._isSubMenu;
  }
  @Input()
  public set isSubMenu(value) {
    this._isSubMenu = value;
    this.updateHostCssClassName();
  }
  @HostBinding('class') cssClassName = 'list-group-item';
  @HostListener('click', ['$event'])
  onHostClick($event: MouseEvent): void {
    if (this.isSubMenu) {
      this.isOpenChange.emit(this.menuId);
    } else {
      this.itemClick.emit({ menu: this.menu, event: $event });
    }
    $event.stopPropagation();
  }
  @Input() isOpen = false;
  @Input() isPage = false;
  @Input() isRootMenu = false;
  @Input() menu: any = undefined;
  @Input() menuId: string = '';
  @Input() lastCopiedOrCuttedComponent: IComponent | undefined;
  @Output() isOpenChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() itemClick: EventEmitter<{ menu: any; event: MouseEvent }> =
    new EventEmitter<{ menu: any; event: MouseEvent }>();

  constructor() {}

  ngOnInit(): void {}

  updateHostCssClassName(): void {
    const actionClass = this.isSubMenu ? '' : 'list-group-item-action';
    const activeClass = this.isActive(this.menu ? this.menu['label'] : '')
      ? 'active'
      : '';
    const disabledClass = this.isMenuDisabled(this.menu)
      ? 'disabled text-disabled'
      : '';
    this.cssClassName = `list-group-item px-2 py-1 ${actionClass} ${activeClass} ${disabledClass}`;
    // this.isSubMenu ? 'list-group-item px-2 py-1' : 'list-group-item list-group-item-action px-2 py-1';
  }

  isActive(value: any): boolean {
    return (
      (this.component && this.component.col
        ? this.component.col.indexOf(value) >= 0
        : false) ||
      (this.component && this.component.offset
        ? this.component.offset.indexOf(value) >= 0
        : false)
    );
  }

  getValue(): string[] {
    if (
      this.menu &&
      this.menu.menu &&
      this.menu.showValueInLabel &&
      this.menu.dataField &&
      this.component &&
      // @ts-ignore
      this.component[this.menu.dataField]
    ) {
      // @ts-ignore
      const selectedValues: string[] = this.component[this.menu.dataField];
      const returnValues: string[] = [];
      selectedValues.forEach((val) => {
        if (this.menu.menu.map((d: any) => d.label).indexOf(val) >= 0) {
          returnValues.push(val);
        }
      });
      return returnValues;
    } else {
      return [];
    }
  }

  getColumnValue(): void {}

  isMenuDisabled(data: any): boolean {
    return !data?.alwaysEnabled
      ? !!data?.lastCopiedOrCutted
        ? !this.lastCopiedOrCuttedComponent
        : this.lastCopiedOrCuttedComponent
        ? true
        : false
      : false;
  }
}
