import { ADD_OR_PASTE_WHERE } from './../interfaces/paster-where-enum';
import { IAddComponentValueObject } from './../interfaces/add-component-vo';
import { ICutCopyPateValueObject } from './../interfaces/cut-copy-paste-vo';
import { IComponent } from './../interfaces/component.interface';
import { IPage } from './../interfaces/page.interface';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss'],
})
export class DynamicPageComponent implements OnInit {
  @Input() activePage: IPage | undefined;
  @Input() lastCopiedOrCuttedComponent: IComponent | undefined;
  @Input() componentToEdit: IComponent | null = null;
  @Output() copy: EventEmitter<ICutCopyPateValueObject> =
    new EventEmitter<ICutCopyPateValueObject>();
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

  showContextMenu = false;
  contextMenuPageX = 884;
  contextMenuPageY = 187;

  @HostListener('window:contextmenu', ['$event'])
  contextmenu($event: MouseEvent) {
    this.updateContextMenuPosition($event);
  }

  @HostListener('window:resize', ['$event'])
  // tslint:disable-next-line:typedef
  windowResize($event: MouseEvent) {
    this.showContextMenu = false;
  }

  @HostListener('window:dblclick', ['$event'])
  // tslint:disable-next-line:typedef
  onDblclick($event: MouseEvent) {
    // To prevent browser's default contextmenu
    this.updateContextMenuPosition($event);
  }

  @HostListener('window:mousedown', ['$event'])
  // tslint:disable-next-line:typedef
  windowClick($event: MouseEvent) {
    // this.showContextMenu = false;
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
    }
  }

  constructor(private hostElement: ElementRef) {}

  ngOnInit(): void {}

  updateContextMenuPosition($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    if (!this.componentToEdit) {
      this.showContextMenu = true;
      this.contextMenuPageX = $event.pageX;
      this.contextMenuPageY = $event.pageY;
    }
  }

  onAction({ action, label }: any): void {
    switch (action) {
      case 'paste-cancel':
        // @ts-ignore
        this.pasteCancel.emit({ component: null, parent: null });
        break;
      case 'add-alert-inside-page':
        this.addComponent.emit({
          component: null,
          parent: null,
          where: ADD_OR_PASTE_WHERE.INSIDE_PAGE,
          componentName: 'ALERT',
        });
        break;
      default:
        break;
    }
    this.showContextMenu = false;
  }
}
