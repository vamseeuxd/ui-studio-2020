import { IComponent, COL, COMPONENT_TYPE } from '../../interfaces/component.interface';
import {
  Component,
  OnInit,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-expandable-list-group',
  templateUrl: './expandable-list-group.component.html',
  styleUrls: ['./expandable-list-group.component.scss'],
})
export class ExpandableListGroupComponent implements OnInit {
  @HostBinding('class') cssClassName = 'list-group';
  @Input() isRootMenu = true;
  @Input() isSubMenu = true;
  @Input() isPage = true;
  @Input() level = 1;
  @Output() itemClick: EventEmitter<{ menu: any; event: MouseEvent }> = new EventEmitter<{ menu: any; event: MouseEvent }>();
  @Input() lastCopiedOrCutComponent: IComponent | undefined;
  @Input() component: IComponent | undefined = {
    offset: [],
    borderAdditive : [],
    borderSubtractive : [],
    borderColor : [],
    borderWidth : [],
    borderRadius : [],
    borderSize : [],
    col: [COL.LG_12],
    id: '1.1',
    isGroupComponent: false,
    isCopied: false,
    isCut: false,
    type: COMPONENT_TYPE.ALERT,
    components: [],
  };
  activeMenu = '';
  @Input() menu: any[] = [
    {
      icon: 'fa fa-arrows-h',
      hideMenuIfPage: true,
      label: 'Col Size',
      menu: [
        {
          icon: 'fa fa-globe',
          label: 'All',
          menu: [
            { action: 'col-size', label: 'col-1' },
            { action: 'col-size', label: 'col-2' },
            { action: 'col-size', label: 'col-3' },
            { action: 'col-size', label: 'col-4' },
            { action: 'col-size', label: 'col-5' },
            { action: 'col-size', label: 'col-6' },
            { action: 'col-size', label: 'col-7' },
            { action: 'col-size', label: 'col-8' },
            { action: 'col-size', label: 'col-9' },
            { action: 'col-size', label: 'col-10' },
            { action: 'col-size', label: 'col-11' },
            { action: 'col-size', label: 'col-12' },
          ],
        },
        {
          icon: 'fa fa-film',
          label: 'Extra Large',
          menu: [
            { action: 'col-size', label: 'col-xl-1' },
            { action: 'col-size', label: 'col-xl-2' },
            { action: 'col-size', label: 'col-xl-3' },
            { action: 'col-size', label: 'col-xl-4' },
            { action: 'col-size', label: 'col-xl-5' },
            { action: 'col-size', label: 'col-xl-6' },
            { action: 'col-size', label: 'col-xl-7' },
            { action: 'col-size', label: 'col-xl-8' },
            { action: 'col-size', label: 'col-xl-9' },
            { action: 'col-size', label: 'col-xl-10' },
            { action: 'col-size', label: 'col-xl-11' },
            { action: 'col-size', label: 'col-xl-12' },
          ],
        },
        {
          icon: 'fa fa-desktop',
          label: 'Large',
          menu: [
            { action: 'col-size', label: 'col-lg-1' },
            { action: 'col-size', label: 'col-lg-2' },
            { action: 'col-size', label: 'col-lg-3' },
            { action: 'col-size', label: 'col-lg-4' },
            { action: 'col-size', label: 'col-lg-5' },
            { action: 'col-size', label: 'col-lg-6' },
            { action: 'col-size', label: 'col-lg-7' },
            { action: 'col-size', label: 'col-lg-8' },
            { action: 'col-size', label: 'col-lg-9' },
            { action: 'col-size', label: 'col-lg-10' },
            { action: 'col-size', label: 'col-lg-11' },
            { action: 'col-size', label: 'col-lg-12' },
          ],
        },
        {
          icon: 'fa fa-laptop',
          label: 'Medium',
          menu: [
            { action: 'col-size', label: 'col-md-1' },
            { action: 'col-size', label: 'col-md-2' },
            { action: 'col-size', label: 'col-md-3' },
            { action: 'col-size', label: 'col-md-4' },
            { action: 'col-size', label: 'col-md-5' },
            { action: 'col-size', label: 'col-md-6' },
            { action: 'col-size', label: 'col-md-7' },
            { action: 'col-size', label: 'col-md-8' },
            { action: 'col-size', label: 'col-md-9' },
            { action: 'col-size', label: 'col-md-10' },
            { action: 'col-size', label: 'col-md-11' },
            { action: 'col-size', label: 'col-md-12' },
          ],
        },
        {
          icon: 'fa fa-tablet',
          label: 'Small',
          menu: [
            { action: 'col-size', label: 'col-sm-1' },
            { action: 'col-size', label: 'col-sm-2' },
            { action: 'col-size', label: 'col-sm-3' },
            { action: 'col-size', label: 'col-sm-4' },
            { action: 'col-size', label: 'col-sm-5' },
            { action: 'col-size', label: 'col-sm-6' },
            { action: 'col-size', label: 'col-sm-7' },
            { action: 'col-size', label: 'col-sm-8' },
            { action: 'col-size', label: 'col-sm-9' },
            { action: 'col-size', label: 'col-sm-10' },
            { action: 'col-size', label: 'col-sm-11' },
            { action: 'col-size', label: 'col-sm-12' },
          ],
        },
        {
          icon: 'fa fa-mobile',
          label: 'Extra Small',
          menu: [
            { action: 'col-size', label: 'col-xs-1' },
            { action: 'col-size', label: 'col-xs-2' },
            { action: 'col-size', label: 'col-xs-3' },
            { action: 'col-size', label: 'col-xs-4' },
            { action: 'col-size', label: 'col-xs-5' },
            { action: 'col-size', label: 'col-xs-6' },
            { action: 'col-size', label: 'col-xs-7' },
            { action: 'col-size', label: 'col-xs-8' },
            { action: 'col-size', label: 'col-xs-9' },
            { action: 'col-size', label: 'col-xs-10' },
            { action: 'col-size', label: 'col-xs-11' },
            { action: 'col-size', label: 'col-xs-12' },
          ],
        },
      ],
    },
    {
      icon: 'fa fa-long-arrow-right',
      hideMenuIfPage: true,
      label: 'Offset Size',
      menu: [
        {
          icon: 'fa fa-globe',
          label: 'All',
          menu: [
            { action: 'offset-size', label: 'offset-1' },
            { action: 'offset-size', label: 'offset-2' },
            { action: 'offset-size', label: 'offset-3' },
            { action: 'offset-size', label: 'offset-4' },
            { action: 'offset-size', label: 'offset-5' },
            { action: 'offset-size', label: 'offset-6' },
            { action: 'offset-size', label: 'offset-7' },
            { action: 'offset-size', label: 'offset-8' },
            { action: 'offset-size', label: 'offset-9' },
            { action: 'offset-size', label: 'offset-10' },
            { action: 'offset-size', label: 'offset-11' },
            { action: 'offset-size', label: 'offset-12' },
          ],
        },
        {
          icon: 'fa fa-film',
          label: 'Extra Large',
          menu: [
            { action: 'offset-size', label: 'offset-xl-1' },
            { action: 'offset-size', label: 'offset-xl-2' },
            { action: 'offset-size', label: 'offset-xl-3' },
            { action: 'offset-size', label: 'offset-xl-4' },
            { action: 'offset-size', label: 'offset-xl-5' },
            { action: 'offset-size', label: 'offset-xl-6' },
            { action: 'offset-size', label: 'offset-xl-7' },
            { action: 'offset-size', label: 'offset-xl-8' },
            { action: 'offset-size', label: 'offset-xl-9' },
            { action: 'offset-size', label: 'offset-xl-10' },
            { action: 'offset-size', label: 'offset-xl-11' },
            { action: 'offset-size', label: 'offset-xl-12' },
          ],
        },
        {
          icon: 'fa fa-desktop',
          label: 'Large',
          menu: [
            { action: 'offset-size', label: 'offset-lg-1' },
            { action: 'offset-size', label: 'offset-lg-2' },
            { action: 'offset-size', label: 'offset-lg-3' },
            { action: 'offset-size', label: 'offset-lg-4' },
            { action: 'offset-size', label: 'offset-lg-5' },
            { action: 'offset-size', label: 'offset-lg-6' },
            { action: 'offset-size', label: 'offset-lg-7' },
            { action: 'offset-size', label: 'offset-lg-8' },
            { action: 'offset-size', label: 'offset-lg-9' },
            { action: 'offset-size', label: 'offset-lg-10' },
            { action: 'offset-size', label: 'offset-lg-11' },
            { action: 'offset-size', label: 'offset-lg-12' },
          ],
        },
        {
          icon: 'fa fa-laptop',
          label: 'Medium',
          menu: [
            { action: 'offset-size', label: 'offset-md-1' },
            { action: 'offset-size', label: 'offset-md-2' },
            { action: 'offset-size', label: 'offset-md-3' },
            { action: 'offset-size', label: 'offset-md-4' },
            { action: 'offset-size', label: 'offset-md-5' },
            { action: 'offset-size', label: 'offset-md-6' },
            { action: 'offset-size', label: 'offset-md-7' },
            { action: 'offset-size', label: 'offset-md-8' },
            { action: 'offset-size', label: 'offset-md-9' },
            { action: 'offset-size', label: 'offset-md-10' },
            { action: 'offset-size', label: 'offset-md-11' },
            { action: 'offset-size', label: 'offset-md-12' },
          ],
        },
        {
          icon: 'fa fa-tablet',
          label: 'Small',
          menu: [
            { action: 'offset-size', label: 'offset-sm-1' },
            { action: 'offset-size', label: 'offset-sm-2' },
            { action: 'offset-size', label: 'offset-sm-3' },
            { action: 'offset-size', label: 'offset-sm-4' },
            { action: 'offset-size', label: 'offset-sm-5' },
            { action: 'offset-size', label: 'offset-sm-6' },
            { action: 'offset-size', label: 'offset-sm-7' },
            { action: 'offset-size', label: 'offset-sm-8' },
            { action: 'offset-size', label: 'offset-sm-9' },
            { action: 'offset-size', label: 'offset-sm-10' },
            { action: 'offset-size', label: 'offset-sm-11' },
            { action: 'offset-size', label: 'offset-sm-12' },
          ],
        },
        {
          icon: 'fa fa-mobile',
          label: 'Extra Small',
          menu: [
            { action: 'offset-size', label: 'offset-xs-1' },
            { action: 'offset-size', label: 'offset-xs-2' },
            { action: 'offset-size', label: 'offset-xs-3' },
            { action: 'offset-size', label: 'offset-xs-4' },
            { action: 'offset-size', label: 'offset-xs-5' },
            { action: 'offset-size', label: 'offset-xs-6' },
            { action: 'offset-size', label: 'offset-xs-7' },
            { action: 'offset-size', label: 'offset-xs-8' },
            { action: 'offset-size', label: 'offset-xs-9' },
            { action: 'offset-size', label: 'offset-xs-10' },
            { action: 'offset-size', label: 'offset-xs-11' },
            { action: 'offset-size', label: 'offset-xs-12' },
          ],
        },
      ],
    },
    {
      alwaysEnabled: true,
      hideMenuIfPage: true,
      icon: 'fa fa-scissors',
      action: 'cut',
      label: 'Cut',
    },
    {
      alwaysEnabled: true,
      hideMenuIfPage: true,
      icon: 'fa fa-clone',
      action: 'copy',
      label: 'Copy',
    },
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
    {
      lastCopiedOrCut: true,
      icon: 'fa fa-close',
      action: 'paste-cancel',
      label: 'Cancel Paste',
    },
    { icon: 'fa fa-book', action: 'manage-pages', label: 'Manage Pages' },
    {
      hideMenuIfPage: true,
      icon: 'fa fa-book',
      action: 'manage-event',
      label: 'Manage Event',
    },
    { icon: 'fa fa-globe', action: 'manage-api', label: 'Manage API Calls' },
    {
      icon: 'fa fa-plus',
      action: 'add',
      label: 'Add Component',
      menu: [
        {
          icon: 'fa fa-arrow-left',
          hideMenuIfPage: true,
          action: 'add-component',
          label: 'Add Before',
          menu: [
            { icon: 'fa fa-list', action: 'add-accordion', label: 'Accordion' },
            { icon: 'fa fa-ellipsis-h', action: 'add-tab', label: 'Tab' },
            { icon: 'fa fa-address-card-o', action: 'add-form', label: 'Form' },
            {
              icon: 'fa fa-table',
              action: 'add-data-grid',
              label: 'Data Grid',
            },
          ],
        },
        {
          icon: 'fa fa-arrow-right',
          hideMenuIfPage: true,
          action: 'add-component',
          label: 'Add After',
          menu: [
            { icon: 'fa fa-list', action: 'add-accordion', label: 'Accordion' },
            { icon: 'fa fa-ellipsis-h', action: 'add-tab', label: 'Tab' },
            { icon: 'fa fa-address-card-o', action: 'add-form', label: 'Form' },
            {
              icon: 'fa fa-table',
              action: 'add-data-grid',
              label: 'Data Grid',
            },
          ],
        },
        {
          icon: 'fa fa-arrow-down',
          hideMenuIfPage: true,
          action: 'add-component',
          label: 'Add Inside',
          menu: [
            { icon: 'fa fa-list', action: 'add-accordion', label: 'Accordion' },
            { icon: 'fa fa-ellipsis-h', action: 'add-tab', label: 'Tab' },
            { icon: 'fa fa-address-card-o', action: 'add-form', label: 'Form' },
            {
              icon: 'fa fa-table',
              action: 'add-data-grid',
              label: 'Data Grid',
            },
          ],
        },
        {
          showIfOnlyComponent: true,
          icon: 'fa fa-list',
          action: 'add-accordion',
          label: 'Accordion',
        },
        {
          showIfOnlyComponent: true,
          icon: 'fa fa-ellipsis-h',
          action: 'add-tab',
          label: 'Tab',
        },
        {
          showIfOnlyComponent: true,
          icon: 'fa fa-address-card-o',
          action: 'add-form',
          label: 'Form',
        },
        {
          showIfOnlyComponent: true,
          icon: 'fa fa-table',
          action: 'add-data-grid',
          label: 'Data Grid',
        },
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.cssClassName = `list-group shadow-sm border p-1 mb-3 bg-light level-${this.level}`
  }

  onMenuOpenChange($event: string) {
    this.activeMenu = this.activeMenu == $event ? '' : $event;
  }
  onSubItemClick($event: any): void {
    this.itemClick.emit($event);
    /* if (this.isRootMenu) {
      console.log($event);
    } */
  }
  isMenuHidden(data: any): boolean {
    return (
      (data?.hideMenuIfPage && this.isPage) ||
      (data?.showIfOnlyComponent && !this.isPage)
    );
  }
  isMenuDisabled(data: any): boolean {
    return !data?.alwaysEnabled
      ? !!data?.lastCopiedOrCut
        ? !this.lastCopiedOrCutComponent
        : this.lastCopiedOrCutComponent
        ? true
        : false
      : false;
  }
}
