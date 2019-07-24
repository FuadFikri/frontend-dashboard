import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from './master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from './role/role.component';
import { SysMenuComponent } from './sys-menu/sys-menu.component';
import { VisiComponent } from './visi/visi.component';
import { MisiComponent } from './misi/misi.component';
import { RolemenuComponent } from './rolemenu/rolemenu.component';
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
import { SbuListComponent } from './balanced-scorecard-sbu/sbu-list/sbu-list.component';
import { SbuComponent } from './data-master/sbu/sbu.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administration'
    },
    children: [
      {
        path: 'master_asset',
        component: MasterAssetComponent,
        data: {
          title: 'Master Asset'
        }
      }, {
        path: 'users',
        component: UserComponent,
        data: {
          title: 'Users'
        }
      }, {
        path: 'role',
        component: RoleComponent,
        data: {
          title: 'Role'
        }
      },
      {
        path: 'sys-menu',
        component: SysMenuComponent,
        data: {
          title: 'System Menu'
        }
      },
      {
        path: 'visi',
        component: VisiComponent,
        data: {
          title: 'Visi'
        }
      },
      {
        path: 'misi',
        component: MisiComponent,
        data: {
          title: 'Misi'
        }
      },
      {
        path: 'rolemenu',
        component: RolemenuComponent,
        data: {
          title: 'Role Menu Auth'
        }
      },
      {
        path: 'role-dashboard',
        component: RoleDashboardComponent,
        data: {
          title: 'Role Dashboard'
        }
      },
      {
        path: 'dashboard',
        component: DetailDashboardComponent,
        data: {
          title: 'Dashboard Administration'
        }
      },
      {
        path: 'detail-dashboard',
        component: DetailDashboardComponent,
        data: {
          title: 'DetailDashboard Administration'
        }
      },
      {
        path: 'balanced-scorecard',
        data: {
          title: 'Balanced Scorecard '
        },
        children: [
          {
            path: '',
            component: BalancedScorecardSettingComponent,
          },
          {
            path: 'sbu',
            component: SbuListComponent,
          },
          {
            path: 'sbu/:daerah',
            component: BalancedScorecardSbuComponent,
          },
          {
            path: 'add',
            component: AddComponent,
          },
          {
            path: 'add-sbu/:daerah',
            component: AddSbuComponent,
          },
          {
            path: 'data',
            component: DataComponent,
          },
          
          {
            path: 'data-sbu/:daerah',
            component: DataSbuComponent,
          },
          {
            path: 'kpi',
            component: KpiComponent,
          },
          {
            path: 'kpi-sbu/:daerah',
            component: KpiSbuComponent,
          }
        ]
      },

      {
        path: 'satuan',
        component: SatuanComponent,
      },
      {
        path: 'sbu',
        component: SbuComponent,
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
