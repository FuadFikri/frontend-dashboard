import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { BalancedScorecardService } from '../../balanced-scorecard-setting/balanced-scorecard.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'app-dashboard-data',
  templateUrl: './dashboard-data.component.html',
  styleUrls: ['./dashboard-data.component.scss'],
  providers:[DashboardService,BalancedScorecardService]
})
export class DashboardDataComponent implements OnInit {
  widgetDataStorage: any[];
  now: Date;
  cardSource: any;
  doughnutSource: any;
  widgets: any;
  bulanDropDown: { 'bulan': string; 'id': string; }[];

  constructor(private dashboardService: DashboardService, private balancedScoreCardService: BalancedScorecardService) {
    this.now = new Date();

  }

  ngOnInit() {
    this.dashboardService.getCardsData() .subscribe(res => {
      this.cardSource = res.d.list;
      console.log("card",res)
    })
    this.dashboardService.getDonatData() .subscribe(res => {
      this.doughnutSource = res.d.list;
      console.log("donat",res)
    })

    this.bulanDropDown = this.balancedScoreCardService.getBulanDropDown();
  }


}
