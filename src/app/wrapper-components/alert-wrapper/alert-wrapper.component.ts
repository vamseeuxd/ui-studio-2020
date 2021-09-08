import { WrapperComponentBase } from '../wrapper-component-base/wrapper-component-base.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-wrapper',
  templateUrl: './alert-wrapper.component.html',
  styleUrls: ['./alert-wrapper.component.scss'],
})
export class AlertWrapperComponent extends WrapperComponentBase {}
