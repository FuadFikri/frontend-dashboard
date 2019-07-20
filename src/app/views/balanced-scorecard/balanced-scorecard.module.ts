import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalancedScorecardComponent } from './balanced-scorecard.component';
import { Routes, RouterModule } from '@angular/router';
import { CardBarComponent } from './card-bar/card-bar.component';
import { DxPopupModule,DxButtonModule, DxNumberBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-carousel-lib';

const routingBalancedScoreCard: Routes=[
{path:'balanced-scorecard', component:BalancedScorecardComponent}
];

@NgModule({
  declarations: [BalancedScorecardComponent, CardBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routingBalancedScoreCard),
    DxPopupModule,
    DxButtonModule,
    DxNumberBoxModule,
    FormsModule,
    CarouselModule,
  ]
})
export class BalancedScorecardModule { }
