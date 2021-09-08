import { WraperComponentBase } from './../wraper-component-base/wraper-component-base';
import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordion-wraper',
  templateUrl: './accordion-wraper.component.html',
  styleUrls: ['./accordion-wraper.component.scss']
})
export class AccordionWraperComponent extends WraperComponentBase {}
