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
            col: [COL.ALL_4],
            id: '1',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_PRIMARY,
            components: [
              /* {
                offset: [],
                col: [COL.ALL_4],
                id: '1.1',
                isCopied: false,
                isCutted: false,
                type: COMPONENT_TYPE.ALERT_PRIMARY,
                components: [],
              }, */
            ],
          },
          {
            offset: [],
            col: [COL.ALL_4],
            id: '2',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_SECONDARY,
            components: [],
          },
          {
            offset: [],
            col: [COL.ALL_4],
            id: '3',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_SUCCESS,
            components: [],
          },
          {
            offset: [],
            col: [COL.ALL_4],
            id: '4',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_DANGER,
            components: [],
          },
          {
            offset: [],
            col: [COL.ALL_4],
            id: '5',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_WARNING,
            components: [],
          },
          {
            offset: [],
            col: [COL.ALL_4],
            id: '6',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_INFO,
            components: [],
          },
          {
            offset: [],
            col: [COL.ALL_4],
            id: '8',
            isCopied: false,
            isCutted: false,
            type: COMPONENT_TYPE.ALERT_DARK,
            components: [],
          },
          {
            offset: [],
            col: [COL.ALL_4],
            id: '9',
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

  copy({
    component,
    parent,
  }: {
    component: IComponent;
    parent: IComponent[];
  }): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
    }
    component.isCopied = true;
    this.lastCopiedOrCuttedComponent = component;
    this.lastCopiedOrCuttedParent = parent;
  }
  cut({
    component,
    parent,
  }: {
    component: IComponent;
    parent: IComponent[];
  }): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
    }
    component.isCutted = true;
    this.lastCopiedOrCuttedComponent = component;
    this.lastCopiedOrCuttedParent = parent;
  }
  pasteBefore({
    component,
    parent,
  }: {
    component: IComponent;
    parent: IComponent[];
  }): void {
    const addIndex = parent.findIndex((data) => data.id === component.id);
    const oldId = this.lastCopiedOrCuttedComponent?.id;
    const cloned = JSON.parse(JSON.stringify(this.lastCopiedOrCuttedComponent));
    if (addIndex >= 0) {
      cloned.id = 'component_' + new Date().getTime();
      parent.splice(addIndex, 0, cloned);
    }
    if (
      this.lastCopiedOrCuttedComponent &&
      this.lastCopiedOrCuttedComponent?.isCutted &&
      this.lastCopiedOrCuttedParent
    ) {
      const removeIndex = this.lastCopiedOrCuttedParent.findIndex(
        (data) =>
          data.id ===
          (this.lastCopiedOrCuttedComponent &&
            this.lastCopiedOrCuttedComponent.id)
      );
      this.lastCopiedOrCuttedParent.splice(removeIndex, 1);
      cloned.id = oldId;
      this.lastCopiedOrCuttedComponent = undefined;
      this.lastCopiedOrCuttedParent = undefined;
    }
  }
  pasteAfter({
    component,
    parent,
  }: {
    component: IComponent;
    parent: IComponent[];
  }): void {
    const addIndex = parent.findIndex((data) => data.id === component.id);
    const cloned = JSON.parse(JSON.stringify(this.lastCopiedOrCuttedComponent));
    const oldId = this.lastCopiedOrCuttedComponent?.id;
    if (addIndex >= 0) {
      cloned.id = 'component_' + new Date().getTime();
      parent.splice(addIndex + 1, 0, cloned);
    }
    if (
      this.lastCopiedOrCuttedComponent &&
      this.lastCopiedOrCuttedComponent?.isCutted &&
      this.lastCopiedOrCuttedParent
    ) {
      const removeIndex = this.lastCopiedOrCuttedParent.findIndex(
        (data) =>
          data.id ===
          (this.lastCopiedOrCuttedComponent &&
            this.lastCopiedOrCuttedComponent.id)
      );
      this.lastCopiedOrCuttedParent.splice(removeIndex, 1);
      cloned.id = oldId;
      this.lastCopiedOrCuttedComponent = undefined;
      this.lastCopiedOrCuttedParent = undefined;
    }
  }
  pasteInside({
    component,
    parent,
  }: {
    component: IComponent;
    parent: IComponent[];
  }): void {
    const cloned = JSON.parse(JSON.stringify(this.lastCopiedOrCuttedComponent));
    cloned.id = this.lastCopiedOrCuttedComponent?.isCopied
      ? 'component_' + new Date().getTime()
      : this.lastCopiedOrCuttedComponent?.id;
    if (component.components) {
      component.components.push(cloned);
    } else {
      component.components = [];
      component.components.push(cloned);
    }

    if (
      this.lastCopiedOrCuttedComponent &&
      this.lastCopiedOrCuttedComponent?.isCutted &&
      this.lastCopiedOrCuttedParent
    ) {
      const removeIndex = this.lastCopiedOrCuttedParent.findIndex(
        (data) =>
          data.id ===
          (this.lastCopiedOrCuttedComponent &&
            this.lastCopiedOrCuttedComponent.id)
      );
      this.lastCopiedOrCuttedParent.splice(removeIndex, 1);
      this.lastCopiedOrCuttedComponent = undefined;
      this.lastCopiedOrCuttedParent = undefined;
    }
  }
  pasteCancel({
    component,
    parent,
  }: {
    component: IComponent | null;
    parent: IComponent[] | null;
  }): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
      this.lastCopiedOrCuttedComponent = undefined;
    }
  }
  deleteComponent({
    component,
    parent,
  }: {
    component: IComponent | null;
    parent: IComponent[];
  }): void {
    setTimeout(() => {
      const isConfirmed = confirm(
        'Are you sure! Do you want to delete the Component?'
      );
      if (isConfirmed) {
        const removeIndex = parent.findIndex(
          (data) => data.id === component?.id
        );
        parent.splice(removeIndex, 1);
        if (this.lastCopiedOrCuttedComponent) {
          this.lastCopiedOrCuttedComponent.isCopied = false;
          this.lastCopiedOrCuttedComponent.isCutted = false;
          this.lastCopiedOrCuttedComponent = undefined;
        }
      }
    }, 50);
  }
  addComponent(value: {
    component: IComponent | null;
    parent: IComponent[] | null;
    where: String;
    componentName: string;
  }): void {
    console.log(value);
  }
}
