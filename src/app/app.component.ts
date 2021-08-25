import { IApplication } from './interfaces/application.interface';
import { Component } from '@angular/core';
import { COL, COMPONENT_TYPE } from './interfaces/component.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  headerHeight = '60px';
  activePageId = 'page_140';
  // Institutional Trade Processing
  app: IApplication = {
    name: 'Institutional Trade Processing',
    layout: 'blank-layout',
    defaultPage: 'page_140',
    pages: [
      {
        name: 'Dashboard',
        id: 'page_140',
        components: [
          { offset: [ ], col: [ COL.MD_4 ], id: '1', type: COMPONENT_TYPE.ALERT_PRIMARY, components: [] },
          { offset: [ ], col: [ COL.MD_4 ], id: '2', type: COMPONENT_TYPE.ALERT_SECONDARY, components: [] },
          { offset: [ ], col: [ COL.MD_4 ], id: '3', type: COMPONENT_TYPE.ALERT_SUCCESS, components: [] },
          { offset: [ ], col: [ COL.MD_4 ], id: '4', type: COMPONENT_TYPE.ALERT_DANGER, components: [] },
          { offset: [ ], col: [ COL.MD_4 ], id: '5', type: COMPONENT_TYPE.ALERT_WARNING, components: [] },
          { offset: [ ], col: [ COL.MD_4 ], id: '6', type: COMPONENT_TYPE.ALERT_INFO, components: [] },
          { offset: [ ], col: [ COL.MD_4 ], id: '7', type: COMPONENT_TYPE.ALERT_LIGHT, components: [] },
          { offset: [ ], col: [ COL.MD_4 ], id: '8', type: COMPONENT_TYPE.ALERT_DARK, components: [] },
          { offset: [ ], col: [ COL.MD_4 ], id: '9', type: COMPONENT_TYPE.ALERT_PRIMARY, components: [] },
          { offset: [ ], col: [ COL.MD_12 ], id: '10', type: COMPONENT_TYPE.ALERT_PRIMARY, components: [] },
        ],
      },
    ],
  };
  getActivePage(): any {
    return this.app.pages.find((page) => page.id === this.activePageId);
  }
}
