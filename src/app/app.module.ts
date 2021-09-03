import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CreateOrImportApplicationComponent } from './create-or-import-application/create-or-import-application.component';
import { FormsModule } from '@angular/forms';
import { DynamicPageComponent } from './dynamic-page/dynamic-page.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { ActionContextMenuComponent } from './action-context-menu/action-context-menu.component';
import { KeepElementInViewportDirective } from './directives/keep-element-in-viewport/keep-element-in-viewport.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpandableListGroupComponent } from './components/expandable-list-group/expandable-list-group.component';
import { ExpandableListGroupItemComponent } from './components/expandable-list-group/expandable-list-group-item/expandable-list-group-item.component';
import { AlertWraperComponent } from './wraper-components/alert-wraper/alert-wraper.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { ComponentEditorComponent } from './components/component-editor/component-editor/component-editor.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
@NgModule({
  declarations: [AppComponent, CreateOrImportApplicationComponent, DynamicPageComponent, DynamicComponentComponent, ActionContextMenuComponent, KeepElementInViewportDirective, ExpandableListGroupComponent, ExpandableListGroupItemComponent, AlertWraperComponent, ComponentEditorComponent, ManagePagesComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    SortableModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
    AngularDraggableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
