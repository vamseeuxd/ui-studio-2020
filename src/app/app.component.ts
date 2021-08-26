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
  lastCopiedOrCuttedParent: IComponent[] | undefined;
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
            col: [COL.MD_12],
            id: '1',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_PRIMARY,
            components: [
              {
                offset: [],
                col: [COL.MD_1],
                id: '1.1',
                isCopied: false,
                isCutted: false,
                type: COMPONENT_TYPE.ALERT_PRIMARY,
                components: [],
              },
            ],
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

  copy({component,parent,}: {component: IComponent;parent: IComponent[];}): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
    }
    component.isCopied = true;
    this.lastCopiedOrCuttedComponent = component;
    this.lastCopiedOrCuttedParent = parent;
  }
  cut({component,parent,}: {component: IComponent;parent: IComponent[];}): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
    }
    component.isCutted = true;
    this.lastCopiedOrCuttedComponent = component;
    this.lastCopiedOrCuttedParent = parent;
    console.log(this.lastCopiedOrCuttedParent);
  }
  pasteBefore({component,parent,}: {component: IComponent;parent: IComponent[];}): void {
    const index = parent.findIndex((data) => data.id === component.id);
    let removeIndex = -1;
    if(this.lastCopiedOrCuttedComponent && this.lastCopiedOrCuttedComponent?.isCutted && this.lastCopiedOrCuttedParent){
      removeIndex = this.lastCopiedOrCuttedParent.findIndex((data) => data.id === (this.lastCopiedOrCuttedComponent && this.lastCopiedOrCuttedComponent.id));
    }
    if (index >= 0) {
      const cloned = JSON.parse(JSON.stringify(this.lastCopiedOrCuttedComponent));
      cloned.id = this.lastCopiedOrCuttedComponent?.isCopied ? 'component_' + new Date().getTime() : this.lastCopiedOrCuttedComponent?.id;
      removeIndex >= 0 && this.lastCopiedOrCuttedParent && this.lastCopiedOrCuttedParent.splice(removeIndex, 1);
      if(removeIndex >= 0){
        // if cut
        if(removeIndex >= index){
          // if remove index is more than add index
          parent.splice(index, 0, cloned);
        }else{
          // if remove index is less than add index
          parent.splice(index - 1, 0, cloned);
        }
      }else{
        // else copy
        parent.splice(index, 0, cloned);
      }
    }
  }
  pasteAfter({component,parent,}: {component: IComponent;parent: IComponent[];}): void {
    const index = parent.findIndex((data) => data.id === component.id);
    let removeIndex = -1;
    if(this.lastCopiedOrCuttedComponent && this.lastCopiedOrCuttedComponent?.isCutted && this.lastCopiedOrCuttedParent){
      removeIndex = this.lastCopiedOrCuttedParent.findIndex((data) => data.id === (this.lastCopiedOrCuttedComponent && this.lastCopiedOrCuttedComponent.id));
    }
    if (index >= 0) {
      const cloned = JSON.parse(JSON.stringify(this.lastCopiedOrCuttedComponent));
      cloned.id = this.lastCopiedOrCuttedComponent?.isCopied ? 'component_' + new Date().getTime() : this.lastCopiedOrCuttedComponent?.id;
      removeIndex >= 0 && this.lastCopiedOrCuttedParent && this.lastCopiedOrCuttedParent.splice(removeIndex, 1);
      if(removeIndex >= 0){
        // if cut
        if(removeIndex >= index){
          // if remove index is more than add index
          parent.splice(index + 1, 0, cloned);
        }else{
          // if remove index is less than add index
          parent.splice(index + 0, 0, cloned);
        }
      }else{
        // else copy
        parent.splice(index + 1, 0, cloned);
      }
      // parent.splice(index + ((removeIndex >= 0 && removeIndex >= index ) ? 1 : 0), 0, cloned);
    }
  }
  pasteInside({component,parent,}: {component: IComponent;parent: IComponent[];}): void {
    console.log('pasteInside', component, parent);
    // this.pasteCancel($event);
  }
  pasteCancel({component,parent,}: {component: IComponent;parent: IComponent[];}): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
      this.lastCopiedOrCuttedComponent = undefined;
    }
  }
}
