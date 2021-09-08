import { WrapperComponentBase } from '../wrapper-component-base/wrapper-component-base.component';
import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordion-wrapper',
  templateUrl: './accordion-wrapper.component.html',
  styleUrls: ['./accordion-wrapper.component.scss']
})
export class AccordionWrapperComponent extends WrapperComponentBase {
  @HostBinding('class') cssClass = 'py-3 d-block';
}
