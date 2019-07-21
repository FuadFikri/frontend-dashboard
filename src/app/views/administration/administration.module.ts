import {
  NgModule
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AdministrationRoutingModule
} from './administration-routing.module';

import {
  TranslateModule
} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxTabPanelModule,
  DxTemplateModule,
  DxMapModule,
  DxTreeListModule,
  DxFileUploaderModule,
  DxLoadIndicatorModule,
  DxRadioGroupModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxTextBoxModule,
  DxNumberBoxModule,
  DxPopupModule,
} from 'devextreme-angular';

import {
  TabsModule
} from 'ngx-bootstrap/tabs';

import {
  MasterAssetComponent
} from './master_asset/master_asset.component';

import { DetailComponent } from './master_asset/detail_manufacture/detail.component'
import { DetailBrandComponent } from './master_asset/detail_assetbrand/detail.component'
import { DetailTypeComponent } from './master_asset/detail_type/detail.component'

import {
  SharedModule
} from '../shared/shared.module';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from 'app/views/administration/user/add/user-add.component';
import {AddRoleComponent} from './role/add/role-add.component';
import { AddAssetBrandComponent } from 'app/views/administration/master_asset/add_assetbrand/brand-add.component';
import { AddManufactureComponent } from 'app/views/administration/master_asset/add_manufacture/manufacture-add.component';
import { AddTypeComponent } from 'app/views/administration/master_asset/add_type/type-add.component';
import { DetailUserComponent } from './user/detail/user-detail.component';
import { SysMenuComponent } from './sys-menu/sys-menu.component';
import { AddSysMenuComponent } from './sys-menu/add/sys-menu-add.component';
import { VisiComponent } from './visi/visi.component';
import { AddVisiComponent } from './visi/add/visi-add.component';
import { MisiComponent } from './misi/misi.component';
import { RolemenuComponent } from './rolemenu/rolemenu.component';
import { AddRolemenuComponent } from './rolemenu/add/rolemenu-add.component';
import { RoleDashboardComponent } from './role-dashboard/role-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailDashboardComponent } from './dashboard/detail-dashboard/detail-dashboard.component';
import { BalancedScorecardSettingComponent } from './balanced-scorecard-setting/balanced-scorecard-setting.component';
import { AddComponent } from './balanced-scorecard-setting/add/add.component';
import { DataComponent } from './balanced-scorecard-setting/data/data.component';
import { KpiComponent } from './balanced-scorecard-setting/kpi/kpi.component';
import { SatuanComponent } from './data-master/satuan/satuan.component';
import { BalancedScorecardSbuComponent } from './balanced-scorecard-sbu/balanced-scorecard-sbu.component';
import { AddSbuComponent } from './balanced-scorecard-sbu/add-sbu/add-sbu.component';
import { DataSbuComponent } from './balanced-scorecard-sbu/data-sbu/data-sbu.component';
import { KpiSbuComponent } from './balanced-scorecard-sbu/kpi-sbu/kpi-sbu.component';
import { SbuComponent } from './data-master/sbu/sbu.component';



@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxRadioGroupModule,
    TabsModule,
    TranslateModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxTreeListModule,
    DxMapModule,
    SharedModule,
    DxFileUploaderModule,
    DxLoadIndicatorModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxPopupModule,
    FormsModule
    ],
  declarations: [
    MasterAssetComponent,
    RoleComponent,
    AddRoleComponent,
    AddUserComponent,
    UserComponent,
    DetailComponent,
    DetailBrandComponent,
    DetailTypeComponent,
    AddAssetBrandComponent,
    AddManufactureComponent,
    AddTypeComponent,
    DetailUserComponent,
    SysMenuComponent,
    AddSysMenuComponent,
    VisiComponent,
    AddVisiComponent,
    MisiComponent,
    RolemenuComponent,
    AddRolemenuComponent,
    RoleDashboardComponent,
    DashboardComponent,
    DetailDashboardComponent,
    BalancedScorecardSettingComponent,
    AddComponent,
    DataComponent,
    KpiComponent,
    SatuanComponent,
    BalancedScorecardSbuComponent,
    AddSbuComponent,
    DataSbuComponent,
    KpiSbuComponent,
    SbuComponent,
    
  ],
  exports: [
  ],
  bootstrap: [
    AddRoleComponent
  ]
})
export class AdministrationModule { }
