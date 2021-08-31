import { IApplication } from './interfaces/application.interface';
import { Component } from '@angular/core';
import {
  COL,
  COMPONENT_TYPE,
  IComponent,
  PROP_TYPE,
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
  componentToEdit: IComponent | null = null;
  // Institutional Trade Processing
  app: IApplication = {
    name: 'Institutional Trade Processing',
    layout: 'blank-layout',
    defaultPage: 'page_140',
    pages: [
      {
        name: 'Dashboard',
        id: 'page_140',
        components: [],
      },
    ],
  };
  constructor() {}
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
  editComponent({ component }: { component: IComponent | null }): void {
    this.componentToEdit = component;
  }
  addComponent(value: {
    component: IComponent | null;
    parent: IComponent[] | null;
    where: String;
    componentName: string;
  }): void {
    switch (value.componentName) {
      case 'ALERT':
        const config: IComponent = {
          offset: [],
          col: [],
          id: 'component_' + new Date().getTime(),
          isCopied: false,
          isCutted: false,
          type: COMPONENT_TYPE.ALERT,
          components: [],
          props: [
            {
              label: 'Alert Type',
              name: 'alertType',
              value: 'alert-success',
              propType: PROP_TYPE.LIST,
              min:0,
              max:0,
              dataProvider: [
                { label: 'Alert Danger', value: 'alert-danger' },
                { label: 'Alert Success', value: 'alert-success' },
                { label: 'Alert Warning', value: 'alert-warning' },
                { label: 'Alert Primary', value: 'alert-primary' },
                { label: 'Alert Info', value: 'alert-info' },
                { label: 'Alert Secondary', value: 'alert-secondary' },
              ],
            },
            {
              label: 'Innter Text',
              name: 'innterText',
              min:0,
              max:0,
              value: 'simple danger alert',
              propType: PROP_TYPE.STRING
            },
            {
              label: 'Width in %',
              name: 'width',
              value: 100,
              min:5,
              max:100,
              propType: PROP_TYPE.NUMBER
            },
          ],
        };
        this.addNewComponent(value, config);
        break;

      default:
        break;
    }
  }
  addNewComponent(
    details: {
      component: IComponent | null;
      parent: IComponent[] | null;
      where: String;
      componentName: string;
    },
    newComponent: any
  ) {
    switch (details.where) {
      case 'inside-page':
        newComponent.col = [COL.ALL_4];
        this.getActivePage().components.push(newComponent);
        break;
      case 'inside-component':
        if (details.component) {
          if (details.component.components) {
            newComponent.col = [COL.ALL_12];
            details.component.components.push(newComponent);
          } else {
            newComponent.col = [COL.ALL_12];
            details.component.components = [];
            details.component.components.push(newComponent);
          }
        }
        break;
      case 'before-component':
        if (details.component && details.parent) {
          const addIndex = details.parent.findIndex(
            (data) => data.id === (details.component && details.component.id)
          );
          newComponent.col = [...details.component.col];
          details.parent.splice(addIndex, 0, newComponent);
        }
        break;
      case 'after-component':
        if (details.component && details.parent) {
          const addIndex = details.parent.findIndex(
            (data) => data.id === (details.component && details.component.id)
          );
          newComponent.col = [...details.component.col];
          details.parent.splice(addIndex + 1, 0, newComponent);
        }
        break;

      default:
        break;
    }
  }
}
