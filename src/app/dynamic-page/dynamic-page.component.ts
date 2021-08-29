import { IComponent } from './../interfaces/component.interface';
import { IPage } from './../interfaces/page.interface';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss'],
})
export class DynamicPageComponent implements OnInit {
  @Input() activePage: IPage | undefined;
  @Input() lastCopiedOrCuttedComponent: IComponent | undefined;

  @Output() copy: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() cut: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteBefore: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteAfter: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteInside: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteCancel: EventEmitter<{component:IComponent | null,parent:IComponent[] | null}> = new EventEmitter<{component:IComponent | null,parent:IComponent[] | null}>();
  @Output() deleteComponent: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();

  showContextMenu = false;
  contextMenuPageX = 884;
  contextMenuPageY = 187;

  @HostListener('window:contextmenu', ['$event'])
  contextmenu($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.showContextMenu = true;
    this.contextMenuPageX = $event.pageX;
    this.contextMenuPageY = $event.pageY;
  }

  @HostListener('window:mousedown', ['$event'])
  // tslint:disable-next-line:typedef
  windowClick($event: MouseEvent) {
    this.showContextMenu = false;
  }

  constructor() {}

  ngOnInit(): void {}

  onAction({ action, label }: any): void {
    switch (action) {
      case 'paste-cancel':
        this.pasteCancel.emit({component:null,parent: null});
        break;

      default:
        break;
    }
    this.showContextMenu = false;
  }
}
