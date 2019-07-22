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
  cardSource:any=[];
  boxSource:any=[];
  doughnutSource:any=[];
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
  cardBoxSize;
  cardBoxColor;
  cardBoxCloseable;
  slidePositions = [
    {"at_slide":"1"},
    {"at_slide":"2"},
    {"at_slide":"3"},
  ];
  constructor(private dashboardService: DashboardService) {
    this.widgetDataStorage=[];
  }

  ngOnInit() {
    this.dashboardService.getWidgetType().subscribe(res => {
      this.boxSource.push(res.d[0]);
      this.cardSource.push(res.d[1]);
      this.doughnutSource.push(res.d[2]);
    });
    console.log("selected dashboard = ",this.selectedDashboard);
    this.dashboardService.getWidgets().subscribe(res => {
      this.widgets = res.d;
      console.log(this.widgets);
    });
    this.cardBoxSize  = this.dashboardService.getCardBoxSize();
    this.cardBoxColor = this.dashboardService.getCardBoxColor();
    this.cardBoxCloseable = this.dashboardService.getCardBoxCloseable();
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
        this.options.message = 'Widget Configuration Updated';
        notify(this.options, 'success', 3000);
        console.log("updating success",this.data);
      }else{
        this.options.message = 'updating Failed';
          notify(this.options, 'error', 3000);
        console.log("updating failed ", res);
      }
    }, err => {
      this.options.message = 'updating Failed';
      notify(this.options, 'error', 3000);
      console.log("updating failed ", err);
    });
  }

  updateSlide(e){
    this.data = e.newData;
    this.data.widget_type = e.oldData.widget_type;
    this.dashboardService.updateSlidePosition(this.data).subscribe(res => {
      console.log('update success', res);
      this.options.message = 'Widget Position Updated';
      notify(this.options, 'success', 3000);
      console.log("updating success",this.data);
    }, err => {
      this.options.message = 'updating Failed';
      notify(this.options, 'error', 3000);
      console.log("updating failed ", err);
    }
    );
  }
  
  delete(e){
    let widget_id = e.key;
    this.dashboardService.delete(widget_id).subscribe(res=> {
      if(res.d==1){
        this.options.message = 'Widget Deleted';
        notify(this.options, 'success', 3000);
        console.log("deleting success ",widget_id);
      }else{
        this.options.message = 'deleting Failed';
          notify(this.options, 'error', 3000);
        console.log("deleting failed ", res);
      }
    }, err => {
      this.options.message = 'deleting Failed';
      notify(this.options, 'error', 3000);
      console.log("deleting failed ", err);
    });
  }

}
