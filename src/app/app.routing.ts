import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './security/auth.guard';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
import { ExecutiveComponent } from 'app/views/dashboard/executive/executive.component';
import { MonitoringComponent } from 'app/views/dashboard/monitoring/monitoring.component';
import { BalancedScorecardModule } from './views/balanced-scorecard/balanced-scorecard.module';

export const routes: Routes = [
  {
    path: 'balanced-scorecard',
    redirectTo: 'balanced-scorecard',
    pathMatch: 'full',
    // loadChildren: './views/balanced-scorecard/balanced-scorecard.module#BalancedScorecardModule'
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: SimpleLayoutComponent,
    loadChildren: './views/dashboard/dashboard.module#DashboardModule',
    // canActivate: [AuthGuard]
  }, 
  
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard_technical',
        loadChildren: './views/dashboard/monitoring/monitoring.module#MonitoringModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard_management',
        loadChildren: './views/dashboard/executive/executive.module#ExecutiveModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'master',
        loadChildren: './views/master/master.module#MasterModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'asset',
        loadChildren: './views/asset/asset.module#AssetModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'location',
        loadChildren: './views/location/location.module#LocationModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'commisioning',
        loadChildren: './views/commisioning/commisioning.module#CommisioningModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'monitoring',
        loadChildren: './views/monitoring/monitoring.module#MonitoringModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'setting',
        loadChildren: './views/setting/setting.module#SettingModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'reporting',
        loadChildren: './views/reporting/reporting.module#ReportingModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'administration',
        loadChildren: './views/administration/administration.module#AdministrationModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'setting',
        loadChildren: './views/setting/setting.module#SettingModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'devextreme',
        loadChildren: './views/devextreme/devextreme.module#DevextremeModule'
      },
      {
        path: 'remote',
        loadChildren: './views/remote/remote.module#RemoteModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: './views/notification/notification.module#NotificationModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), BalancedScorecardModule ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
