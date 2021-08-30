import { IComponent } from './../../interfaces/component.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-wraper',
  templateUrl: './alert-wraper.component.html',
  styleUrls: ['./alert-wraper.component.scss'],
})
export class AlertWraperComponent implements OnInit {
  @Input() component: IComponent | undefined;
  @Input() lastCopiedOrCuttedComponent: IComponent | undefined;
  @Output() copy: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() cut: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteBefore: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteAfter: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteInside: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() pasteCancel: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() deleteComponent: EventEmitter<{component:IComponent,parent:IComponent[]}> = new EventEmitter<{component:IComponent,parent:IComponent[]}>();
  @Output() addComponent: EventEmitter<{component:IComponent,parent:IComponent[], where: String, componentName:string}> = new EventEmitter<{component:IComponent,parent:IComponent[], where: String, componentName:string}>();
  constructor() {}

  ngOnInit(): void {}
}
