import { IApplication } from './../../../interfaces/application.interface';
import {
  IComponent,
  PROP_TYPE,
  COMPONENT_TYPE,
  ACTION_TYPE,
} from './../../../interfaces/component.interface';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-component-editor',
  templateUrl: './component-editor.component.html',
  styleUrls: ['./component-editor.component.scss'],
})
export class ComponentEditorComponent implements AfterViewInit {
  readonly PropType = PROP_TYPE;
  readonly ActionType = ACTION_TYPE;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() component: IComponent | null = null;
  @Input() app: IApplication | null = null;
  @Input() mouseEvent: MouseEvent | null = null;
  @HostBinding('class') cssClass = 'position-fixed';
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.mouseEvent) {
      const { clientWidth, clientHeight } = this.el.nativeElement;
      const { pageX, pageY } = this.mouseEvent;
      this.el.nativeElement.style.zIndex = '100000';
      this.el.nativeElement.style.left = pageX - clientWidth / 2 + 'px';
      this.el.nativeElement.style.top = pageY - clientHeight / 2 + 'px';
    }
  }
}
