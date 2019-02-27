import { NgModule } from '@angular/core';
import { SettingRoutingModule } from './setting-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import {
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxLookupModule,
    DxDateBoxModule,
    DxAccordionModule,
    /* auto complete test */
    DxAutocompleteModule,
    DxTextBoxModule,
    DxPivotGridModule,
    DxChartModule
} from 'devextreme-angular';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../shared/shared.module'

import { SiteComponent } from './site/site.component';
import { ScheduleComponent } from './schedule/schedule.component';
@NgModule({
    imports: [
        CommonModule,
        SettingRoutingModule,
        DxButtonModule,
        DxButtonModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        DxTextAreaModule,
        DxTextBoxModule,
        DxFormModule,
        TabsModule,
        TranslateModule,
        DxTabPanelModule,
        DxTemplateModule,
        SharedModule,
        DxLookupModule,
        DxDateBoxModule,
        DxAccordionModule,
        /* auto complete*/
        DxAutocompleteModule,
        DxPivotGridModule,
        DxChartModule
    ],
    declarations: [
        SiteComponent,
        ScheduleComponent,
    ],
    exports: [
        DxButtonModule,
        DxDataGridModule,
        DxSelectBoxModule
    ]
})
export class SettingModule {}
