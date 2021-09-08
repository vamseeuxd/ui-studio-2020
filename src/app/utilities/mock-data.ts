import { PAGE_PROP_DATA_TYPE } from './../interfaces/page.interface';
import {
  COMPONENT_PROP_TYPE,
  COMPONENT_TYPE,
  IComponent,
  COL,
  ACTION_TYPE,
} from './../interfaces/component.interface';
import { IApplication } from './../interfaces/application.interface';
// import '../../../node_modules/@popperjs/core/dist/umd/popper.min.js';

export const UIStudioComponents = (action: 'before' | 'after' | 'inside') => {
  return [
    {
      icon: 'fa fa-exclamation-triangle',
      action: 'add-alert-' + action,
      label: 'Alert',
    },
    {
      icon: 'fa fa-list',
      action: 'add-accordion-' + action,
      label: 'Accordion',
    },
    { icon: 'fa fa-ellipsis-h', action: 'add-tab-' + action, label: 'Tab' },
    {
      icon: 'fa fa-address-card-o',
      action: 'add-form-' + action,
      label: 'Form',
    },
    { icon: 'fa fa-table', action: 'add-data-grid', label: 'Data Grid' },
  ];
};

export const AlertMockData = (): IComponent => {
  return {
    offset: [],
    borderAdditive: [],
    borderSubtractive: [],
    borderColor: [],
    borderWidth: [],
    borderRadius: [],
    borderSize: [],
    col: [],
    id: window._.uniqueId('component_'),
    isGroupComponent: false,
    isCopied: false,
    isCut: false,
    type: COMPONENT_TYPE.ALERT,
    components: [],
    props: [
      {
        label: 'Alert Type',
        name: 'alertType',
        value: 'alert-success',
        propType: COMPONENT_PROP_TYPE.LIST,
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
        name: 'innerText',
        min: 0,
        max: 0,
        value: 'simple danger alert',
        propType: COMPONENT_PROP_TYPE.STRING,
      },
      {
        label: 'Width in %',
        name: 'width',
        value: 100,
        min: 5,
        max: 100,
        propType: COMPONENT_PROP_TYPE.NUMBER,
      },
    ],
    events: [
      {
        name: 'click',
        label: 'On Alert Click',
        description:
          'A pointing device button has been pressed and released on an Alert.',
        actions: [
          {
            label: 'Open Modal Dialog',
            id: new Date().getTime().toString(),
            type: ACTION_TYPE.MODAL,
            value: 'page_140',
            backdrop: true,
            keyboard: true,
            ignoreBackdropClick: false,
            animated: true,
            description: '',
          },
        ],
      },
      {
        name: 'dblclick',
        label: 'On Alert Double Click',
        description: 'A pointing device button is clicked twice on an Alert.',
      },
    ],
  };
};

export const AccordionGroupMockData = (): IComponent => {
  return {
    offset: [],
    borderAdditive: [],
    borderSubtractive: [],
    borderColor: [],
    borderWidth: [],
    borderRadius: [],
    borderSize: [],
    col: [COL.ALL_6],
    id: window._.uniqueId('component_'),
    isGroupComponent: true,
    isCopied: false,
    isCut: false,
    type: COMPONENT_TYPE.ACCORDION_GROUP,
    components: [
      AlertMockData(),
      AlertMockData(),
      AlertMockData(),
    ],
    props: [],
    events: [],
  };
};

export const AccordionMockData = (): IComponent => {
  return {
    offset: [],
    borderAdditive: ['border'],
    borderSubtractive: [],
    borderColor: [],
    borderWidth: [],
    borderRadius: [],
    borderSize: [],
    col: [COL.ALL_6],
    id: window._.uniqueId('component_'),
    isGroupComponent: true,
    isCopied: false,
    isCut: false,
    type: COMPONENT_TYPE.ACCORDION,
    components: [
      AccordionGroupMockData(),
      AccordionGroupMockData(),
      AccordionGroupMockData(),
    ],
    props: [
      {
        label: 'Alert Type',
        name: 'alertType',
        value: 'alert-success',
        propType: COMPONENT_PROP_TYPE.LIST,
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
        name: 'innerText',
        min: 0,
        max: 0,
        value: 'simple danger alert',
        propType: COMPONENT_PROP_TYPE.STRING,
      },
      {
        label: 'Width in %',
        name: 'width',
        value: 100,
        min: 5,
        max: 100,
        propType: COMPONENT_PROP_TYPE.NUMBER,
      },
    ],
    events: [
      {
        name: 'click',
        label: 'On Alert Click',
        description:
          'A pointing device button has been pressed and released on an Alert.',
        actions: [
          {
            label: 'Open Modal Dialog',
            id: new Date().getTime().toString(),
            type: ACTION_TYPE.MODAL,
            value: 'page_140',
            backdrop: true,
            keyboard: true,
            ignoreBackdropClick: false,
            animated: true,
            description: '',
          },
        ],
      },
      {
        name: 'dblclick',
        label: 'On Alert Double Click',
        description: 'A pointing device button is clicked twice on an Alert.',
      },
    ],
  };
};

export const applicationMockData: IApplication = {
  name: 'Institutional Trade Processing',
  layout: 'blank-layout',
  defaultPage: 'page_140',
  pages: [
    {
      name: 'Dashboard',
      id: 'page_140',
      route: 'dashboard',
      isHomePage: true,
      properties: [
        {
          id: 'test123',
          name: 'dashboardPropertie1',
          dataType: PAGE_PROP_DATA_TYPE.STRING,
          description: 'For Testing',
          defaultValue: '',
        },
        {
          id: 'test123456',
          name: 'dashboardPropertie2',
          dataType: PAGE_PROP_DATA_TYPE.BOOLEAN,
          description: 'For Testing',
          defaultValue: true,
        },
        {
          id: 'test123789',
          name: 'dashboardPropertie3',
          dataType: PAGE_PROP_DATA_TYPE.NUMBER,
          description: 'For Testing',
          defaultValue: 200,
        },
      ],
      components: [],
    },
    {
      name: 'Products',
      id: 'page_150',
      route: 'products',
      properties: [
        {
          id: 'test44',
          name: 'productsPropertie1',
          dataType: PAGE_PROP_DATA_TYPE.STRING,
          description: 'For Testing',
          defaultValue: '',
        },
        {
          id: 'test55',
          name: 'productsPropertie2',
          dataType: PAGE_PROP_DATA_TYPE.BOOLEAN,
          description: 'For Testing',
          defaultValue: true,
        },
        {
          id: 'test66',
          name: 'productsPropertie3',
          dataType: PAGE_PROP_DATA_TYPE.NUMBER,
          description: 'For Testing',
          defaultValue: 200,
        },
      ],
      isHomePage: false,
      components: [],
    },
  ],
};

/*
  {
    label: 'Navigate to Page',
    type: ACTION_TYPE.PAGE,
    value: activePageId,
    description: '',
  },
  {
    label: 'Open External Link',
    type: ACTION_TYPE.LINK,
    value: 'https://www.google.com/',
    target: '_blank',
    description: '',
  },
  {
    label: 'Open Modal Dialog',
    type: ACTION_TYPE.MODAL,
    value: 'https://www.google.com/',
    description: '',
  },
  {
    label: 'Call Command in Current Page',
    type: ACTION_TYPE.COMMAND,
    value: 'https://www.google.com/',
    description: '',
  },
*/
