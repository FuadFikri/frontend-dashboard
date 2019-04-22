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
        component: DashboardComponent,
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
