import { ADD_OR_PASTE_WHERE } from './paster-where-enum';
import { IComponent } from './component.interface';
export interface IAddComponentValueObject {
  component: IComponent | null;
  parent: IComponent[] | null;
  where: ADD_OR_PASTE_WHERE;
  componentName: string;
}
