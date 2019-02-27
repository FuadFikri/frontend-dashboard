import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteComponent } from './site/site.component';
import { ScheduleComponent } from './schedule/schedule.component';
const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Setting'
        },
        children: [
            {
                path: 'site_regulation',
                component: SiteComponent,
                data: {
                    title: 'Site Regulation'
                }
            },
            {
                path: 'scheduler',
                component: ScheduleComponent,
                data: {
                    title: 'Schedule Setting'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
