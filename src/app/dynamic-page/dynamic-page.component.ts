import { IComponent } from './../interfaces/component.interface';
import { IPage } from './../interfaces/page.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Output() pasteCancel: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();

  constructor() {}

  ngOnInit(): void {}
}
