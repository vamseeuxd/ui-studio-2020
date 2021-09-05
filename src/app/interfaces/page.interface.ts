import { IComponent } from './component.interface';
export interface IPage {
  name: string;
  id: string;
  route: string;
  isHomePage: boolean;
  properties:IPageProp[];
  components: IComponent[];
}

export interface IPageProp {
  name: string;
  defaultValue: string;
  dataType: string;
  description: string;
  propType: PAGE_PROP_TYPE;
}

export enum PAGE_PROP_TYPE {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  ARRAY = 'array',
  OBJECT = 'object',
}
