import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
@Component({
  selector: 'app-detail-dashboard',
  templateUrl: './detail-dashboard.component.html',
  styleUrls: ['./detail-dashboard.component.scss'],
  providers:[DashboardService]
})

export class DetailDashboardComponent implements OnInit {
  cardBoxSource:any;
  CircularSource:any;
  widgets:any;
  widgetDataStorage:any;
  @Input() selectedDashboard;
  @Input() detailVisible;
  @Input() isEdit;
  @Input() isDetail;
  @Output() onHideDetail = new EventEmitter();
  constructor(private dashboardService: DashboardService) {
    this.widgetDataStorage=[];
  }

  ngOnInit() {
    this.cardBoxSource = this.dashboardService.getCardBoxType("CARD-BOX");
    this.CircularSource = this.dashboardService.getCardBoxType("CIRCULAR-GAUGE");
    console.log(this.CircularSource);
    
    console.log("selected",this.selectedDashboard);
    this.dashboardService.getWidgetWhereDID(parseInt(this.selectedDashboard)).subscribe(res => {
      this.widgets = res.d;
    });
  }

  getWidgetList(key) {
    let item = this.widgetDataStorage.find((i) => i.key === key);
    if (!item) {
        item = {
            key: key,
            dataSourceInstance: new DataSource({
                store: new ArrayStore({
                    data: this.widgets,
                    key: "widget_id"
                }),
                filter: ["widget_type", "=", key]
            })
        };
        this.widgetDataStorage.push(item)
    }
    return item.dataSourceInstance;
}

}
