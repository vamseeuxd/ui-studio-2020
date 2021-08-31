import { IComponent } from './component.interface';
export interface IAddComponentValueObject {
  component: IComponent | null;
  parent: IComponent[] | null;
  where:
    | 'inside-page'
    | 'inside-component'
    | 'before-component'
    | 'after-component';
  componentName: string;
}
