import { IApplication } from './interfaces/application.interface';
import { Component } from '@angular/core';
import {
  COL,
  COMPONENT_TYPE,
  IComponent,
} from './interfaces/component.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  headerHeight = '60px';
  activePageId = 'page_140';
  lastCopiedOrCuttedComponent: IComponent | undefined;
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
          {
            offset: [],
            col: [COL.MD_1],
            id: '1',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_PRIMARY,
            components: [],
          },
          {
            offset: [],
            col: [COL.MD_1],
            id: '2',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_SECONDARY,
            components: [],
          },
          {
            offset: [],
            col: [COL.MD_1],
            id: '3',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_SUCCESS,
            components: [],
          },
          {
            offset: [],
            col: [COL.MD_1],
            id: '4',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_DANGER,
            components: [],
          },
          {
            offset: [],
            col: [COL.MD_1],
            id: '5',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_WARNING,
            components: [],
          },
          {
            offset: [],
            col: [COL.MD_1],
            id: '6',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_INFO,
            components: [],
          },
          {
            offset: [],
            col: [COL.MD_1],
            id: '7',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_LIGHT,
            components: [],
          },
          {
            offset: [],
            col: [COL.MD_1],
            id: '8',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_DARK,
            components: [],
          },
          {
            offset: [],
            col: [COL.MD_1],
            id: '9',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_PRIMARY,
            components: [],
          },
          {
            offset: [],
            col: [COL.MD_1],
            id: '10',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_PRIMARY,
            components: [],
          },
        ],
      },
    ],
  };
  getActivePage(): any {
    return this.app.pages.find((page) => page.id === this.activePageId);
  }

  copy($event: IComponent): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
    }
    $event.isCopied = true;
    this.lastCopiedOrCuttedComponent = $event;
  }
  cut($event: IComponent): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
    }
    $event.isCutted = true;
    this.lastCopiedOrCuttedComponent = $event;
  }
  pasteBefore({component,parent}:{component:IComponent,parent:IComponent[]}): void {
    const index = parent.findIndex(data=>(data.id === component.id));
    if(index >= 0){
      const cloned = JSON.parse(JSON.stringify(this.lastCopiedOrCuttedComponent));
      cloned.id = 'component_'+new Date().getTime();
      parent.splice(index,0,cloned);
    }
  }
  pasteAfter({component,parent}:{component:IComponent,parent:IComponent[]}): void {
    const index = parent.findIndex(data=>(data.id === component.id));
    if(index >= 0){
      const cloned = JSON.parse(JSON.stringify(this.lastCopiedOrCuttedComponent));
      cloned.id = 'component_'+new Date().getTime();
      parent.splice(index + 1,0,cloned);
    }
  }
  pasteInside({component,parent}:{component:IComponent,parent:IComponent[]}): void {
    console.log('pasteInside', component, parent);
    // this.pasteCancel($event);
  }
  pasteCancel({component,parent}:{component:IComponent,parent:IComponent[]}): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
      this.lastCopiedOrCuttedComponent = undefined;
    }
  }
}
