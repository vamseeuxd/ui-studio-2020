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

  @Output() copy: EventEmitter<IComponent> = new EventEmitter<IComponent>();
  @Output() cut: EventEmitter<IComponent> = new EventEmitter<IComponent>();
  @Output() pasteBefore: EventEmitter<IComponent> = new EventEmitter<IComponent>();
  @Output() pasteAfter: EventEmitter<IComponent> = new EventEmitter<IComponent>();
  @Output() pasteInside: EventEmitter<IComponent> = new EventEmitter<IComponent>();
  @Output() pasteCancel: EventEmitter<IComponent> = new EventEmitter<IComponent>();

  constructor() {}

  ngOnInit(): void {}
}
