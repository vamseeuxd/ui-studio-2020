import { IPage } from './page.interface';
export interface IApplication {
  name: string;
  defaultPage: string;
  modalPageId?: string;
  pages: IPage[];
  layout: string;
}
