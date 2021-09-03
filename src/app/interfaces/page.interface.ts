import { IComponent } from './component.interface';
export interface IPage {
  name: string;
  id: string;
  route: string;
  isDefaultPage: boolean;
  components: IComponent[];
}
