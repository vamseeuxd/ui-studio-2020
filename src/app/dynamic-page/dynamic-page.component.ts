import { IComponent } from './../interfaces/component.interface';
import { IPage } from './../interfaces/page.interface';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss'],
})
export class DynamicPageComponent implements OnInit {
  @Input() activePage: IPage | undefined;
  @Input() lastCopiedOrCuttedComponent: IComponent | undefined;
  @Input() componentToEdit: IComponent | null = null;
  @Output() copy: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() cut: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteBefore: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteAfter: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteInside: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteCancel: EventEmitter<{component:IComponent | null,parent:IComponent[] | null}> = new EventEmitter<{component:IComponent | null,parent:IComponent[] | null}>();
  @Output() deleteComponent: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() editComponent: EventEmitter<{component:IComponent}> = new EventEmitter<{component:IComponent}>();
  @Output() addComponent: EventEmitter<{component:IComponent | null,parent:IComponent[] | null, where: String, componentName:string}> = new EventEmitter<{component:IComponent | null,parent:IComponent[] | null, where: String, componentName: string}>();

  showContextMenu = false;
  contextMenuPageX = 884;
  contextMenuPageY = 187;

  @HostListener('window:contextmenu', ['$event'])
  contextmenu($event: MouseEvent) {
    this.updateContextMenuPosition($event);
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
    const hostElement:HTMLElement = this.hostElement.nativeElement.getElementsByTagName('app-action-context-menu')[0];
    if(!($event && $event.target && hostElement && hostElement.contains($event.target as HTMLElement))){
      this.showContextMenu = false;
    }
  }

  constructor(private hostElement: ElementRef) {}

  ngOnInit(): void {}

  updateContextMenuPosition($event: MouseEvent){
    $event.preventDefault();
    $event.stopPropagation();
    if(!this.componentToEdit){
      this.showContextMenu = true;
      this.contextMenuPageX = $event.pageX;
      this.contextMenuPageY = $event.pageY;
    }
  }

  onAction({ action, label }: any): void {
    switch (action) {
      case 'paste-cancel':
        this.pasteCancel.emit({component:null,parent: null});
        break;
        case 'add-alert-inside-page':
          this.addComponent.emit({component:null,parent: null, where:'inside-page', componentName:'ALERT'});
        break;
      default:
        break;
    }
    this.showContextMenu = false;
  }
}
