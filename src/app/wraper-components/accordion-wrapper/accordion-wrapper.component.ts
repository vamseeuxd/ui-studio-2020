import { WraperComponentBase } from './../wraper-component-base/wraper-component-base';
import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordion-wrapper',
  templateUrl: './accordion-wrapper.component.html',
  styleUrls: ['./accordion-wrapper.component.scss']
})
export class AccordionWrapperComponent extends WraperComponentBase {}
