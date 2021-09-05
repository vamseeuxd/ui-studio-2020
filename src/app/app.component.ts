import { IAddComponentValueObject } from './interfaces/add-component-vo';
import { ICutCopyPateValueObject } from './interfaces/cut-copy-paste-vo';
import { applicationMockData, AlertMockData } from './utilities/mock-data';
import { IApplication } from './interfaces/application.interface';
import { Component } from '@angular/core';
import {
  COL,
  COMPONENT_TYPE,
  IComponent,
  COMPONENT_PROP_TYPE,
} from './interfaces/component.interface';
import { ADD_OR_PASTE_WHERE } from './interfaces/paster-where-enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  headerHeight = '60px';
  lastCopiedOrCuttedComponent: IComponent | undefined;
  lastCopiedOrCuttedParent: IComponent[] | undefined;
  componentToEdit: IComponent | null = null;
  mouseEventForComponentEdit: MouseEvent | null = null;
  app: IApplication | undefined = applicationMockData;
  showManagePages = false;
  constructor() {
    if (this.app) {
      this.app.pages[0].components = [
        AlertMockData('page_180'),
        AlertMockData('page_180'),
        AlertMockData('page_180'),
      ];
      this.app.pages[1].components = [AlertMockData('page_140')];
    }
  }
  getActivePage(): any {
    return (
      this.app &&
      this.app.pages.find(
        (page) => page.id === (this.app && this.app.defaultPage)
      )
    );
  }
  isCutInProgress(): boolean {
    // @ts-ignore
    return (
      this.lastCopiedOrCuttedComponent &&
      this.lastCopiedOrCuttedComponent.isCutted
    );
  }
  copy({ component, parent }: ICutCopyPateValueObject): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
    }
    component.isCopied = true;
    component.isCutted = false;
    this.lastCopiedOrCuttedComponent = component;
    this.lastCopiedOrCuttedParent = parent;
  }
  cut({ component, parent }: ICutCopyPateValueObject): void {
    if (this.lastCopiedOrCuttedComponent) {
      this.lastCopiedOrCuttedComponent.isCopied = false;
      this.lastCopiedOrCuttedComponent.isCutted = false;
    }
    component.isCutted = true;
    component.isCopied = false;
    this.lastCopiedOrCuttedComponent = component;
    this.lastCopiedOrCuttedParent = parent;
  }

  updateIdsForAllChildren(component: IComponent): void {
    if (component.components) {
      component.components.forEach((comp: IComponent) => {
        comp.id = window._.uniqueId('component_');
        this.updateIdsForAllChildren(comp);
      });
    }
  }

  pasteComponent(
    { component, parent }: ICutCopyPateValueObject,
    isAfter: boolean,
    isInside = false
  ): void {
    const oldId = this.lastCopiedOrCuttedComponent?.id;
    const cloned = window._.cloneDeep(this.lastCopiedOrCuttedComponent);
    if (isInside) {
      cloned.id = window._.uniqueId('component_');
      this.updateIdsForAllChildren(cloned);
      if (component.components) {
        component.components.push(cloned);
      } else {
        component.components = [];
        component.components.push(cloned);
      }
    } else {
      cloned.id = window._.uniqueId('component_');
      this.updateIdsForAllChildren(cloned);
      const addIndex = window._.findIndex(parent, ['id', component.id]);
      if (addIndex >= 0) {
        parent.splice(addIndex + (isAfter ? 1 : 0), 0, cloned);
      }
    }
    if (this.isCutInProgress() && this.lastCopiedOrCuttedComponent) {
      // @ts-ignore
      const removeIndex = window._.findIndex(this.lastCopiedOrCuttedParent, [
        'id',
        this.lastCopiedOrCuttedComponent.id,
      ]);
      // @ts-ignore
      this.lastCopiedOrCuttedParent.splice(removeIndex, 1);
      cloned.id = oldId;
      this.pasteCancel({ component, parent });
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
  editComponent({
    component,
    event,
  }: {
    component: IComponent;
    event: MouseEvent;
  }): void {
    this.componentToEdit = component;
    this.mouseEventForComponentEdit = event;
  }
  addComponent(value: IAddComponentValueObject): void {
    switch (value.componentName) {
      case 'ALERT':
        const config: IComponent = AlertMockData();
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
          const addIndex = window._.findIndex(details.parent, [
            'id',
            details.component.id,
          ]);
          newComponent.col = [...details.component.col];
          details.parent.splice(addIndex, 0, newComponent);
        }
        break;
      case ADD_OR_PASTE_WHERE.AFTER_COMPONENT:
        if (details.component && details.parent) {
          const addIndex = window._.findIndex(details.parent, [
            'id',
            details.component.id,
          ]);
          newComponent.col = [...details.component.col];
          details.parent.splice(addIndex + 1, 0, newComponent);
        }
        break;

      default:
        break;
    }
  }

  getModalPageIndex(): number {
    const index = this.app?.pages.findIndex((page) => {
      return page.id === this.app?.modalPageId;
    });
    return index != undefined ? index : -1;
  }
}
