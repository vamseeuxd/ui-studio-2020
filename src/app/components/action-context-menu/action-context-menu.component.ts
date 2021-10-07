import {UIStudioComponents} from '../../utilities/mock-data';
import {IComponent} from '../../interfaces/component.interface';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-context-menu',
  templateUrl: './action-context-menu.component.html',
  styleUrls: ['./action-context-menu.component.scss'],
})
export class ActionContextMenuComponent implements OnInit {
  @Input() component: IComponent | undefined;
  @Input() lastCopiedOrCutComponent: IComponent | undefined;
  @Input() addComponentContextMenu: any;
  @Input() isPage = false;
  @Input() leftAlign = false;
  @Output() action: EventEmitter<{ menu: any; event: MouseEvent }> = new EventEmitter<{ menu: any; event: MouseEvent }>();
  activeMenu = '';

  menu: any[] = [
    /* -------------------- Col Size Menu -------------------- */
    {
      icon: 'fa fa-arrows-h',
      hideMenuIfPage: true,
      label: 'Col Size',
      menu: [
        {
          label: 'All',
          showValueInLabel: true,
          dataField: 'col',
          menu: [
            {action: 'col-size', label: 'col-1'},
            {action: 'col-size', label: 'col-2'},
            {action: 'col-size', label: 'col-3'},
            {action: 'col-size', label: 'col-4'},
            {action: 'col-size', label: 'col-5'},
            {action: 'col-size', label: 'col-6'},
            {action: 'col-size', label: 'col-7'},
            {action: 'col-size', label: 'col-8'},
            {action: 'col-size', label: 'col-9'},
            {action: 'col-size', label: 'col-10'},
            {action: 'col-size', label: 'col-11'},
            {action: 'col-size', label: 'col-12'},
          ],
        },
        {
          icon: 'fa fa-film',
          label: 'Extra Large',
          showValueInLabel: true,
          dataField: 'col',
          menu: [
            {action: 'col-size', label: 'col-xl-1'},
            {action: 'col-size', label: 'col-xl-2'},
            {action: 'col-size', label: 'col-xl-3'},
            {action: 'col-size', label: 'col-xl-4'},
            {action: 'col-size', label: 'col-xl-5'},
            {action: 'col-size', label: 'col-xl-6'},
            {action: 'col-size', label: 'col-xl-7'},
            {action: 'col-size', label: 'col-xl-8'},
            {action: 'col-size', label: 'col-xl-9'},
            {action: 'col-size', label: 'col-xl-10'},
            {action: 'col-size', label: 'col-xl-11'},
            {action: 'col-size', label: 'col-xl-12'},
          ],
        },
        {
          icon: 'fa fa-desktop',
          label: 'Large',
          showValueInLabel: true,
          dataField: 'col',
          menu: [
            {action: 'col-size', label: 'col-lg-1'},
            {action: 'col-size', label: 'col-lg-2'},
            {action: 'col-size', label: 'col-lg-3'},
            {action: 'col-size', label: 'col-lg-4'},
            {action: 'col-size', label: 'col-lg-5'},
            {action: 'col-size', label: 'col-lg-6'},
            {action: 'col-size', label: 'col-lg-7'},
            {action: 'col-size', label: 'col-lg-8'},
            {action: 'col-size', label: 'col-lg-9'},
            {action: 'col-size', label: 'col-lg-10'},
            {action: 'col-size', label: 'col-lg-11'},
            {action: 'col-size', label: 'col-lg-12'},
          ],
        },
        {
          icon: 'fa fa-laptop',
          label: 'Medium',
          showValueInLabel: true,
          dataField: 'col',
          menu: [
            {action: 'col-size', label: 'col-md-1'},
            {action: 'col-size', label: 'col-md-2'},
            {action: 'col-size', label: 'col-md-3'},
            {action: 'col-size', label: 'col-md-4'},
            {action: 'col-size', label: 'col-md-5'},
            {action: 'col-size', label: 'col-md-6'},
            {action: 'col-size', label: 'col-md-7'},
            {action: 'col-size', label: 'col-md-8'},
            {action: 'col-size', label: 'col-md-9'},
            {action: 'col-size', label: 'col-md-10'},
            {action: 'col-size', label: 'col-md-11'},
            {action: 'col-size', label: 'col-md-12'},
          ],
        },
        {
          icon: 'fa fa-tablet',
          label: 'Small',
          showValueInLabel: true,
          dataField: 'col',
          menu: [
            {action: 'col-size', label: 'col-sm-1'},
            {action: 'col-size', label: 'col-sm-2'},
            {action: 'col-size', label: 'col-sm-3'},
            {action: 'col-size', label: 'col-sm-4'},
            {action: 'col-size', label: 'col-sm-5'},
            {action: 'col-size', label: 'col-sm-6'},
            {action: 'col-size', label: 'col-sm-7'},
            {action: 'col-size', label: 'col-sm-8'},
            {action: 'col-size', label: 'col-sm-9'},
            {action: 'col-size', label: 'col-sm-10'},
            {action: 'col-size', label: 'col-sm-11'},
            {action: 'col-size', label: 'col-sm-12'},
          ],
        },
        {
          icon: 'fa fa-mobile',
          label: 'Extra Small',
          showValueInLabel: true,
          dataField: 'col',
          menu: [
            {action: 'col-size', label: 'col-xs-1'},
            {action: 'col-size', label: 'col-xs-2'},
            {action: 'col-size', label: 'col-xs-3'},
            {action: 'col-size', label: 'col-xs-4'},
            {action: 'col-size', label: 'col-xs-5'},
            {action: 'col-size', label: 'col-xs-6'},
            {action: 'col-size', label: 'col-xs-7'},
            {action: 'col-size', label: 'col-xs-8'},
            {action: 'col-size', label: 'col-xs-9'},
            {action: 'col-size', label: 'col-xs-10'},
            {action: 'col-size', label: 'col-xs-11'},
            {action: 'col-size', label: 'col-xs-12'},
          ],
        },
      ],
    },
    /* -------------------- Col Size Menu -------------------- */

    /* -------------------- Offset Size Menu -------------------- */
    {
      icon: 'fa fa-long-arrow-right',
      hideMenuIfPage: true,
      label: 'Offset Size',
      menu: [
        {
          label: 'All',
          menu: [
            {action: 'offset-size', label: 'offset-0'},
            {action: 'offset-size', label: 'offset-1'},
            {action: 'offset-size', label: 'offset-2'},
            {action: 'offset-size', label: 'offset-3'},
            {action: 'offset-size', label: 'offset-4'},
            {action: 'offset-size', label: 'offset-5'},
            {action: 'offset-size', label: 'offset-6'},
            {action: 'offset-size', label: 'offset-7'},
            {action: 'offset-size', label: 'offset-8'},
            {action: 'offset-size', label: 'offset-9'},
            {action: 'offset-size', label: 'offset-10'},
            {action: 'offset-size', label: 'offset-11'},
            {action: 'offset-size', label: 'offset-12'},
          ],
        },
        {
          icon: 'fa fa-film',
          label: 'Extra Large',
          menu: [
            {action: 'offset-size', label: 'offset-xl-0'},
            {action: 'offset-size', label: 'offset-xl-1'},
            {action: 'offset-size', label: 'offset-xl-2'},
            {action: 'offset-size', label: 'offset-xl-3'},
            {action: 'offset-size', label: 'offset-xl-4'},
            {action: 'offset-size', label: 'offset-xl-5'},
            {action: 'offset-size', label: 'offset-xl-6'},
            {action: 'offset-size', label: 'offset-xl-7'},
            {action: 'offset-size', label: 'offset-xl-8'},
            {action: 'offset-size', label: 'offset-xl-9'},
            {action: 'offset-size', label: 'offset-xl-10'},
            {action: 'offset-size', label: 'offset-xl-11'},
            {action: 'offset-size', label: 'offset-xl-12'},
          ],
        },
        {
          icon: 'fa fa-desktop',
          label: 'Large',
          menu: [
            {action: 'offset-size', label: 'offset-lg-0'},
            {action: 'offset-size', label: 'offset-lg-1'},
            {action: 'offset-size', label: 'offset-lg-1'},
            {action: 'offset-size', label: 'offset-lg-2'},
            {action: 'offset-size', label: 'offset-lg-3'},
            {action: 'offset-size', label: 'offset-lg-4'},
            {action: 'offset-size', label: 'offset-lg-5'},
            {action: 'offset-size', label: 'offset-lg-6'},
            {action: 'offset-size', label: 'offset-lg-7'},
            {action: 'offset-size', label: 'offset-lg-8'},
            {action: 'offset-size', label: 'offset-lg-9'},
            {action: 'offset-size', label: 'offset-lg-10'},
            {action: 'offset-size', label: 'offset-lg-11'},
            {action: 'offset-size', label: 'offset-lg-12'},
          ],
        },
        {
          icon: 'fa fa-laptop',
          label: 'Medium',
          menu: [
            {action: 'offset-size', label: 'offset-md-0'},
            {action: 'offset-size', label: 'offset-md-1'},
            {action: 'offset-size', label: 'offset-md-2'},
            {action: 'offset-size', label: 'offset-md-3'},
            {action: 'offset-size', label: 'offset-md-4'},
            {action: 'offset-size', label: 'offset-md-5'},
            {action: 'offset-size', label: 'offset-md-6'},
            {action: 'offset-size', label: 'offset-md-7'},
            {action: 'offset-size', label: 'offset-md-8'},
            {action: 'offset-size', label: 'offset-md-9'},
            {action: 'offset-size', label: 'offset-md-10'},
            {action: 'offset-size', label: 'offset-md-11'},
            {action: 'offset-size', label: 'offset-md-12'},
          ],
        },
        {
          icon: 'fa fa-tablet',
          label: 'Small',
          menu: [
            {action: 'offset-size', label: 'offset-sm-0'},
            {action: 'offset-size', label: 'offset-sm-1'},
            {action: 'offset-size', label: 'offset-sm-2'},
            {action: 'offset-size', label: 'offset-sm-3'},
            {action: 'offset-size', label: 'offset-sm-4'},
            {action: 'offset-size', label: 'offset-sm-5'},
            {action: 'offset-size', label: 'offset-sm-6'},
            {action: 'offset-size', label: 'offset-sm-7'},
            {action: 'offset-size', label: 'offset-sm-8'},
            {action: 'offset-size', label: 'offset-sm-9'},
            {action: 'offset-size', label: 'offset-sm-10'},
            {action: 'offset-size', label: 'offset-sm-11'},
            {action: 'offset-size', label: 'offset-sm-12'},
          ],
        },
        {
          icon: 'fa fa-mobile',
          label: 'Extra Small',
          menu: [
            {action: 'offset-size', label: 'offset-xs-0'},
            {action: 'offset-size', label: 'offset-xs-1'},
            {action: 'offset-size', label: 'offset-xs-2'},
            {action: 'offset-size', label: 'offset-xs-3'},
            {action: 'offset-size', label: 'offset-xs-4'},
            {action: 'offset-size', label: 'offset-xs-5'},
            {action: 'offset-size', label: 'offset-xs-6'},
            {action: 'offset-size', label: 'offset-xs-7'},
            {action: 'offset-size', label: 'offset-xs-8'},
            {action: 'offset-size', label: 'offset-xs-9'},
            {action: 'offset-size', label: 'offset-xs-10'},
            {action: 'offset-size', label: 'offset-xs-11'},
            {action: 'offset-size', label: 'offset-xs-12'},
          ],
        },
      ],
    },
    /* -------------------- Offset Size Menu -------------------- */

    /* -------------------- Offset Size Menu -------------------- */
    {
      icon: 'fa fa-braille',
      hideMenuIfPage: true,
      label: 'CSS Utilities',
      menu: [
        {
          hideMenuIfPage: true,
          label: 'Borders',
          menu: [
            {
              hideMenuIfPage: true,
              label: 'Border Additive',
              menu: [
                {
                  action: 'border-additive',
                  hideMenuIfPage: true,
                  label: 'border',
                },
                {
                  action: 'border-additive',
                  hideMenuIfPage: true,
                  label: 'border-top',
                },
                {
                  action: 'border-additive',
                  hideMenuIfPage: true,
                  label: 'border-end',
                },
                {
                  action: 'border-additive',
                  hideMenuIfPage: true,
                  label: 'border-bottom',
                },
                {
                  action: 'border-additive',
                  hideMenuIfPage: true,
                  label: 'border-start',
                },
              ],
            },
            {
              hideMenuIfPage: true,
              label: 'Border Subtractive',
              menu: [
                {
                  action: 'border-subtractive',
                  hideMenuIfPage: true,
                  label: 'border-0',
                },
                {
                  action: 'border-subtractive',
                  hideMenuIfPage: true,
                  label: 'border-top-0',
                },
                {
                  action: 'border-subtractive',
                  hideMenuIfPage: true,
                  label: 'border-end-0',
                },
                {
                  action: 'border-subtractive',
                  hideMenuIfPage: true,
                  label: 'border-bottom-0',
                },
                {
                  action: 'border-subtractive',
                  hideMenuIfPage: true,
                  label: 'border-start-0',
                },
              ],
            },
            {
              hideMenuIfPage: true,
              label: 'Border Color',
              menu: [
                {
                  action: 'border-color',
                  hideMenuIfPage: true,
                  label: 'border-primary',
                },
                {
                  action: 'border-color',
                  hideMenuIfPage: true,
                  label: 'border-secondary',
                },
                {
                  action: 'border-color',
                  hideMenuIfPage: true,
                  label: 'border-success',
                },
                {
                  action: 'border-color',
                  hideMenuIfPage: true,
                  label: 'border-danger',
                },
                {
                  action: 'border-color',
                  hideMenuIfPage: true,
                  label: 'border-warning',
                },
                {
                  action: 'border-color',
                  hideMenuIfPage: true,
                  label: 'border-info',
                },
                {
                  action: 'border-color',
                  hideMenuIfPage: true,
                  label: 'border-light',
                },
                {
                  action: 'border-color',
                  hideMenuIfPage: true,
                  label: 'border-dark',
                },
                {
                  action: 'border-color',
                  hideMenuIfPage: true,
                  label: 'border-white',
                },
              ],
            },
            {
              hideMenuIfPage: true,
              label: 'Border Width',
              menu: [
                {
                  action: 'border-width',
                  hideMenuIfPage: true,
                  label: 'border-1',
                },
                {
                  action: 'border-width',
                  hideMenuIfPage: true,
                  label: 'border-2',
                },
                {
                  action: 'border-width',
                  hideMenuIfPage: true,
                  label: 'border-3',
                },
                {
                  action: 'border-width',
                  hideMenuIfPage: true,
                  label: 'border-4',
                },
                {
                  action: 'border-width',
                  hideMenuIfPage: true,
                  label: 'border-5',
                },
              ],
            },
            {
              hideMenuIfPage: true,
              label: 'Border Radius',
              menu: [
                {
                  action: 'border-radius',
                  hideMenuIfPage: true,
                  label: 'rounded',
                },
                {
                  action: 'border-radius',
                  hideMenuIfPage: true,
                  label: 'rounded-top',
                },
                {
                  action: 'border-radius',
                  hideMenuIfPage: true,
                  label: 'rounded-end',
                },
                {
                  action: 'border-radius',
                  hideMenuIfPage: true,
                  label: 'rounded-bottom',
                },
                {
                  action: 'border-radius',
                  hideMenuIfPage: true,
                  label: 'rounded-start',
                },
                {
                  action: 'border-radius',
                  hideMenuIfPage: true,
                  label: 'rounded-circle',
                },
                {
                  action: 'border-radius',
                  hideMenuIfPage: true,
                  label: 'rounded-pill',
                },
              ],
            },
            {
              hideMenuIfPage: true,
              label: 'Border Size',
              menu: [
                {
                  action: 'border-size',
                  hideMenuIfPage: true,
                  label: 'rounded-0',
                },
                {
                  action: 'border-size',
                  hideMenuIfPage: true,
                  label: 'rounded-1',
                },
                {
                  action: 'border-size',
                  hideMenuIfPage: true,
                  label: 'rounded-2',
                },
                {
                  action: 'border-size',
                  hideMenuIfPage: true,
                  label: 'rounded-3',
                },
              ],
            },
          ],
        },
      ],
    },
    /* -------------------- Offset Size Menu -------------------- */

    /* -------------------- Add Component Menu -------------------- */
    /*{
      icon: 'fa fa-plus',
      action: 'add',
      label: 'Add Component',
      menu: [
        {
          icon: 'fa fa-arrow-left',
          hideMenuIfPage: true,
          action: 'add-component',
          label: 'Add Before',
          menu: UIStudioComponents('before'),
        },
        {
          icon: 'fa fa-arrow-right',
          hideMenuIfPage: true,
          action: 'add-component',
          label: 'Add After',
          menu: UIStudioComponents('after'),
        },
        {
          icon: 'fa fa-arrow-down',
          hideMenuIfPage: true,
          action: 'add-component',
          label: 'Add Inside',
          menu: UIStudioComponents('inside'),
        },
        {
          showIfOnlyComponent: true,
          icon: 'fa fa-exclamation-triangle',
          action: 'add-alert-inside-page',
          label: 'Alert',
        },
        {
          showIfOnlyComponent: true,
          icon: 'fa fa-list',
          action: 'add-accordion-inside-page',
          label: 'Accordion',
        },
        {
          showIfOnlyComponent: true,
          icon: 'fa fa-ellipsis-h',
          action: 'add-tab-inside-page',
          label: 'Tab',
        },
        {
          showIfOnlyComponent: true,
          icon: 'fa fa-address-card-o',
          action: 'add-form-inside-page',
          label: 'Form',
        },
        {
          showIfOnlyComponent: true,
          icon: 'fa fa-table',
          action: 'add-data-grid-inside-page',
          label: 'Data Grid',
        },
      ],
    },*/
    /* -------------------- Add Component Menu -------------------- */

    /* -------------------- Delete Component Menu -------------------- */
    {
      alwaysEnabled: true,
      hideMenuIfPage: true,
      icon: 'fa fa-trash',
      action: 'delete',
      label: 'Delete Component',
    },
    /* -------------------- Delete Component Menu -------------------- */

    /* -------------------- Edit Component Menu -------------------- */
    {
      alwaysEnabled: true,
      hideMenuIfPage: true,
      icon: 'fa fa-edit',
      action: 'edit',
      label: 'Edit Component',
    },
    /* -------------------- Edit Component Menu -------------------- */

    /* -------------------- Cut Component Menu -------------------- */
    {
      alwaysEnabled: true,
      hideMenuIfPage: true,
      icon: 'fa fa-scissors',
      action: 'cut',
      label: 'Cut',
    },
    /* -------------------- Cut Component Menu -------------------- */

    /* -------------------- Copy Component Menu -------------------- */
    {
      alwaysEnabled: true,
      hideMenuIfPage: true,
      icon: 'fa fa-clone',
      action: 'copy',
      label: 'Copy',
    },
    /* -------------------- Copy Component Menu -------------------- */

    /* -------------------- Paste Component Menu -------------------- */
    {
      hideMenuIfPage: true,
      icon: 'fa fa-clipboard',
      lastCopiedOrCut: true,
      label: 'Paste',
      menu: [
        {
          lastCopiedOrCut: true,
          icon: 'fa fa-arrow-left',
          action: 'paste-before',
          label: 'Paste Before',
        },
        {
          lastCopiedOrCut: true,
          icon: 'fa fa-arrow-right',
          action: 'paste-after',
          label: 'Paste After',
        },
        {
          lastCopiedOrCut: true,
          icon: 'fa fa-arrow-down',
          action: 'paste-inside',
          label: 'Paste Inside',
        },
        {
          lastCopiedOrCut: true,
          icon: 'fa fa-close',
          action: 'paste-cancel',
          label: 'Cancel Paste',
        },
      ],
    },
    /* -------------------- Paste Component Menu -------------------- */

    /* -------------------- Cancel Component Menu -------------------- */
    {
      lastCopiedOrCut: true,
      icon: 'fa fa-close',
      action: 'paste-cancel',
      label: 'Cancel Paste',
    },
    /* -------------------- Cancel Component Menu -------------------- */

    /* -------------------- Manage Pages Menu -------------------- */
    {icon: 'fa fa-book', action: 'manage-pages', label: 'Manage Pages'},
    /* -------------------- Manage Pages Menu -------------------- */

    /* -------------------- Manage Properties Menu -------------------- */
    /* { icon: 'fa fa-book', action: 'manage-properties', label: 'Manage Properties in Page',}, */
    /* -------------------- Manage Properties Menu -------------------- */

    /* -------------------- Manage Commands Menu -------------------- */
    /* { icon: 'fa fa-book', action: 'manage-commands', label: 'Manage Commands in Page',}, */
    /* -------------------- Manage Commands Menu -------------------- */

    /* -------------------- Manage API Menu -------------------- */
    /* -------------------- Manage API Menu -------------------- */
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.menu.splice(3, 0, this.addComponentContextMenu);
  }

  onItemClick(item: { menu: any; event: MouseEvent }): void {
    this.action.emit(item);
  }
}
