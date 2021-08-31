import { IAddComponentValueObject } from './interfaces/add-component-vo';
import { ICutCopyPateValueObject } from './interfaces/cut-copy-paste-vo';
import { applicationMockData } from './utilities/mock-data';
import { IApplication } from './interfaces/application.interface';
import { Component } from '@angular/core';
import {
  COL,
  COMPONENT_TYPE,
  IComponent,
  PROP_TYPE,
} from './interfaces/component.interface';
import { ADD_OR_PASTE_WHERE } from './interfaces/paster-where-enum';

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
  app: IApplication = applicationMockData;
  constructor() {}
  getActivePage(): any {
    return this.app.pages.find((page) => page.id === this.activePageId);
  }

  copy({ component, parent }: ICutCopyPateValueObject): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
    }
    component.isCopied = true;
    this.lastCopiedOrCuttedComponent = component;
    this.lastCopiedOrCuttedParent = parent;
  }
  cut({ component, parent }: ICutCopyPateValueObject): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
    }
    component.isCutted = true;
    this.lastCopiedOrCuttedComponent = component;
    this.lastCopiedOrCuttedParent = parent;
  }
  pasteBefore({ component, parent }: ICutCopyPateValueObject): void {
    const addIndex = window._.findIndex(parent, ['id', component.id]);
    const oldId = this.lastCopiedOrCuttedComponent?.id;
    const cloned = window._.cloneDeep(this.lastCopiedOrCuttedComponent);
    if (addIndex >= 0) {
      cloned.id = 'component_' + new Date().getTime();
      parent.splice(addIndex, 0, cloned);
    }
    if (
      this.lastCopiedOrCuttedComponent &&
      this.lastCopiedOrCuttedComponent?.isCutted &&
      this.lastCopiedOrCuttedParent
    ) {
      const removeIndex = window._.findIndex(this.lastCopiedOrCuttedParent, ['id', this.lastCopiedOrCuttedComponent.id]);
      this.lastCopiedOrCuttedParent.splice(removeIndex, 1);
      cloned.id = oldId;
      this.lastCopiedOrCuttedComponent = undefined;
      this.lastCopiedOrCuttedParent = undefined;
    }
  }
  pasteAfter({ component, parent }: ICutCopyPateValueObject): void {
    const addIndex = window._.findIndex(parent, ['id', component.id]);
    const cloned = window._.cloneDeep(this.lastCopiedOrCuttedComponent);
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
      const removeIndex = window._.findIndex(this.lastCopiedOrCuttedParent, ['id', this.lastCopiedOrCuttedComponent.id]);
      this.lastCopiedOrCuttedParent.splice(removeIndex, 1);
      cloned.id = oldId;
      this.lastCopiedOrCuttedComponent = undefined;
      this.lastCopiedOrCuttedParent = undefined;
    }
  }
  pasteInside({ component, parent }: ICutCopyPateValueObject): void {
    const cloned = window._.cloneDeep(this.lastCopiedOrCuttedComponent);
    cloned.id = this.lastCopiedOrCuttedComponent?.isCopied ? 'component_' + new Date().getTime() : this.lastCopiedOrCuttedComponent?.id;
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
      const removeIndex = window._.findIndex(this.lastCopiedOrCuttedParent, ['id', this.lastCopiedOrCuttedComponent.id]);
      this.lastCopiedOrCuttedParent.splice(removeIndex, 1);
      this.lastCopiedOrCuttedComponent = undefined;
      this.lastCopiedOrCuttedParent = undefined;
    }
  }
  pasteCancel({ component, parent }: ICutCopyPateValueObject): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
      this.lastCopiedOrCuttedComponent = undefined;
    }
  }
  deleteComponent({ component, parent }: ICutCopyPateValueObject): void {
    setTimeout(() => {
      const isConfirmed = confirm(
        'Are you sure! Do you want to delete the Component?'
      );
      if (isConfirmed) {
        const removeIndex = window._.findIndex(parent, ['id', component.id]);
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
  addComponent(value: IAddComponentValueObject): void {
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
              min: 0,
              max: 0,
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
              min: 0,
              max: 0,
              value: 'simple danger alert',
              propType: PROP_TYPE.STRING,
            },
            {
              label: 'Width in %',
              name: 'width',
              value: 100,
              min: 5,
              max: 100,
              propType: PROP_TYPE.NUMBER,
            },
          ],
        };
        this.addNewComponent(value, config);
        break;

      default:
        break;
    }
  }
  addNewComponent(details: IAddComponentValueObject, newComponent: any) {
    switch (details.where) {
      case ADD_OR_PASTE_WHERE.INSIDE_PAGE:
        newComponent.col = [COL.ALL_4];
        this.getActivePage().components.push(newComponent);
        break;
      case ADD_OR_PASTE_WHERE.INSIDE_COMPONENT:
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
      case ADD_OR_PASTE_WHERE.BEFORE_COMPONENT:
        if (details.component && details.parent) {
          const addIndex =  window._.findIndex(details.parent, ['id', details.component.id]);
          newComponent.col = [...details.component.col];
          details.parent.splice(addIndex, 0, newComponent);
        }
        break;
      case ADD_OR_PASTE_WHERE.AFTER_COMPONENT:
        if (details.component && details.parent) {
          const addIndex = window._.findIndex(details.parent, ['id', details.component.id]);
          newComponent.col = [...details.component.col];
          details.parent.splice(addIndex + 1, 0, newComponent);
        }
        break;

      default:
        break;
    }
  }
}
