import { WrapperComponentBase } from '../wrapper-component-base/wrapper-component-base.component';
import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordion-group-wrapper',
  templateUrl: './accordion-group-wrapper.component.html',
  styleUrls: ['./accordion-group-wrapper.component.scss']
})
export class AccordionGroupWrapperComponent extends WrapperComponentBase {
}
