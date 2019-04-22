import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import { Widget } from '../Model';
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
  data: Widget;
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };
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

  update(e){
    this.data = e.newData;
    this.data.widget_id = e.oldData.widget_id;
    console.log(this.data);
    
    this.dashboardService.update(this.data).subscribe(res=> {
      if(res.d==1){
        this.options.message = 'Dashboard Role Updated';
        notify(this.options, 'success', 3000);
        console.log("updating success",this.data);
      }else{
        this.options.message = 'updating Failed';
          notify(this.options, 'error', 3000);
        console.log("updating failed ");
      }
    }, err => {
      this.options.message = 'updating Failed';
      notify(this.options, 'error', 3000);
    });
  }

}
