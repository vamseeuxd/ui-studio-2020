import {UIStudioComponents} from "./mock-data";

export interface IWrapperComponentMenu {
  icon: string;
  action: string;
  label: string;
  showIfOnlyComponent?: boolean;
}

export type PLACEMENT = 'before' | 'after' | 'inside' | 'inside-page';

export const getAlertMenu = (placement: PLACEMENT): IWrapperComponentMenu => {
  return {
    icon: 'fa fa-exclamation-triangle',
    showIfOnlyComponent: (placement === 'inside-page'),
    action: `add-alert-${placement}`,
    label: 'Alert'
  }
}

export const getAccordionMenu = (placement: PLACEMENT): IWrapperComponentMenu => {
  return {
    icon: 'fa fa-list',
    showIfOnlyComponent: (placement === 'inside-page'),
    action: `add-accordion-${placement}`,
    label: 'Accordion'
  };
}

export const getAccordionGroupMenu = (placement: PLACEMENT): IWrapperComponentMenu => {
  return {
    icon: 'fa fa-list',
    showIfOnlyComponent: (placement === 'inside-page'),
    action: `add-accordion-group-${placement}`,
    label: 'Accordion-Group'
  };
}

export const getTabMenu = (placement: PLACEMENT): IWrapperComponentMenu => {
  return {
    icon: 'fa fa-ellipsis-h',
    showIfOnlyComponent: (placement === 'inside-page'),
    action: `add-tab-${placement}`,
    label: 'Tab'
  };
}

export const getFormMenu = (placement: PLACEMENT): IWrapperComponentMenu => {
  return {
    icon: 'fa fa-address-card-o',
    showIfOnlyComponent: (placement === 'inside-page'),
    action: `add-form-${placement}` + placement,
    label: 'Form',
  };
}

export const getDataGridMenu = (placement: PLACEMENT): IWrapperComponentMenu => {
  return {
    icon: 'fa fa-table',
    showIfOnlyComponent: (placement === 'inside-page'),
    action: `add-data-grid-${placement}`,
    label: 'Data Grid'
  };
}

export const allWrapperComponents = (placement: PLACEMENT) => {
  return [
    getAlertMenu(placement),
    getAccordionMenu(placement),
    getTabMenu(placement),
    getFormMenu(placement),
    getDataGridMenu(placement),
  ]
}

export const accordionWrapperComponentsMenu = () => {
  return [
    getAccordionGroupMenu('inside')
  ]
}

export const wrapperComponentsMainMenu = (insidePageMenu: IWrapperComponentMenu[], beforeMenu: IWrapperComponentMenu[], afterMenu: IWrapperComponentMenu[], insideMenu: IWrapperComponentMenu[]) => {
  return {
    icon: 'fa fa-plus',
    action: 'add',
    label: 'Add Component',
    menu: [
      {
        icon: 'fa fa-arrow-left',
        hideMenuIfPage: true,
        action: 'add-component',
        label: 'Add Before',
        menu: beforeMenu,
      },
      {
        icon: 'fa fa-arrow-right',
        hideMenuIfPage: true,
        action: 'add-component',
        label: 'Add After',
        menu: afterMenu,
      },
      {
        icon: 'fa fa-arrow-down',
        hideMenuIfPage: true,
        action: 'add-component',
        label: 'Add Inside',
        menu: insideMenu,
      },
      ...insidePageMenu,
    ],
  }
}
