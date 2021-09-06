import { WraperComponentBase } from './../wraper-component-base/wraper-component-base';
import { IPage } from './../../interfaces/page.interface';
import { IApplication } from './../../interfaces/application.interface';
import { ICutCopyPateValueObject } from './../../interfaces/cut-copy-paste-vo';
import { IAddComponentValueObject } from './../../interfaces/add-component-vo';
import {
  ACTION_TYPE,
  IComponent,
  IEvent,
} from './../../interfaces/component.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicPageComponent } from 'src/app/components/dynamic-page/dynamic-page.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-wraper',
  templateUrl: './alert-wraper.component.html',
  styleUrls: ['./alert-wraper.component.scss'],
})
export class AlertWraperComponent extends WraperComponentBase {}
