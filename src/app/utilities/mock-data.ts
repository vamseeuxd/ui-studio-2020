import {
  PROP_TYPE,
  COMPONENT_TYPE,
  IComponent,
} from './../interfaces/component.interface';
import { IApplication } from './../interfaces/application.interface';
export const applicationMockData: IApplication = {
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

export const AlertMockData = (): IComponent => {
  return {
    offset: [],
    col: [],
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
  };
};
