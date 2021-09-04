import {
  PROP_TYPE,
  COMPONENT_TYPE,
  IComponent,
  COL,
  ACTION_TYPE,
} from './../interfaces/component.interface';
import { IApplication } from './../interfaces/application.interface';
// import '../../../node_modules/@popperjs/core/dist/umd/popper.min.js';

export const AlertMockData = (activePageId = 'page_150'): IComponent => {
  return {
    offset: [],
    col: [COL.ALL_4],
    id: window._.uniqueId('component_'),
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
    events: [
      {
        name: 'click',
        label: 'On Alert Click',
        description: 'A pointing device button has been pressed and released on an Alert.',
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
          /* {
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
          }, */
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
      components: [],
    },
    {
      name: 'Products',
      id: 'page_150',
      route: 'products',
      isHomePage: false,
      components: [],
    },
  ],
};
