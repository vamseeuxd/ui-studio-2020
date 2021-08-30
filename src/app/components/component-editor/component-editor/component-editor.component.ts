import {
  IComponent,
  PROP_TYPE,
  COMPONENT_TYPE,
} from './../../../interfaces/component.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-component-editor',
  templateUrl: './component-editor.component.html',
  styleUrls: ['./component-editor.component.scss'],
})
export class ComponentEditorComponent implements OnInit {
  readonly PropType = PROP_TYPE;
  @Output() close:EventEmitter<any> = new EventEmitter<any>();
  @Input() component: IComponent | null = null;

  constructor() {}

  ngOnInit(): void {}
}
