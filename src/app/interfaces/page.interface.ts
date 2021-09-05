import { IComponent } from './component.interface';
export interface IPage {
  name: string;
  id: string;
  route: string;
  isHomePage: boolean;
  properties:IPageProp[] | undefined;
  components: IComponent[];
}

export interface IPageProp {
  id: string;
  name: string;
  defaultValue: any;
  description: string;
  dataType: PAGE_PROP_DATA_TYPE;
}

export enum PAGE_PROP_DATA_TYPE {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  ARRAY = 'array',
  OBJECT = 'object',
}
