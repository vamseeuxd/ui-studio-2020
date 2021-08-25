import { IPage } from './page.interface';
export interface IApplication {
  name: string;
  defaultPage: string;
  pages: IPage[];
  layout: string;
}
