import { IComponent } from './component.interface';
export interface IPage {
  name: string;
  id: string;
  components: IComponent[];
}
