import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  DashboardService
} from '../dashboard.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import {
  Widget
} from '../Model';
import {
  BalancedScorecardService
} from '../../balanced-scorecard-setting/balanced-scorecard.service';
import { DxButtonComponent, DxSelectBoxComponent } from 'devextreme-angular';
@Component({
  selector: 'app-detail-dashboard',
  templateUrl: './detail-dashboard.component.html',
  styleUrls: ['./detail-dashboard.component.scss'],
  providers: [DashboardService, BalancedScorecardService]
})

export class DetailDashboardComponent implements OnInit {
  @ViewChild(DxButtonComponent) dxButton: DxButtonComponent;
  @ViewChild(DxSelectBoxComponent) dxSelect: DxSelectBoxComponent;
  
  cardSource: any = [];
  boxSource: any = [];
  doughnutSource: any = [];
  nkoSource: any = [];
  widgets: any;
  widgetDataStorage: any;
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
  DoughnutColor = ['Bright', 'Harmony Light', 'Ocean', 'Pastel', 'Soft', 'Soft Pastel', 'Vintage', 'Violet', 'Carmine', 'Dark Moon', 'Dark Violet', 'Green Mist', 'Soft Blue', 'Material', 'Office']
  tahunDropDown = [];
  now: any;
  boxSize;

  kpi;
  isCanGenerate: boolean;
  constructor(private dashboardService: DashboardService, private balancedScoreCardService: BalancedScorecardService) {
    this.widgetDataStorage = [];
    this.now = new Date();

  }

  ngOnInit() {
    let tahun = (this.now.getFullYear()).toString();
    let bulan = (this.now.getMonth()).toString();

    this.balancedScoreCardService.getKpiPusat(tahun).subscribe(res => {
      this.kpi = res.d;
    })


    this.dashboardService.getWidgetType().subscribe(res => {
      this.boxSource.push(res.d[0]);
      this.cardSource.push(res.d[1]);
      this.doughnutSource.push(res.d[2]);
      this.nkoSource.push(res.d[3]);
    });


    this.dashboardService.getWidgets(tahun, bulan).subscribe(res => {
      this.widgets = res.d;
      console.log("widgets bulan" + bulan, res);
    });
    this.cardBoxSize = this.dashboardService.getCardBoxSize();
    this.cardBoxColor = this.dashboardService.getCardBoxColor();
    this.boxSize = this.dashboardService.getBoxSize();

    this.dashboardService.getLastTahun().subscribe(res => {
      this.tahunDropDown.push(parseInt(res.d[0].tahun) + 1);
      if (res.d[0].tahun > tahun) {
        this.isCanGenerate = false;
      } else {
        this.isCanGenerate = true;
      }
    })

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

  update(e) {
    this.data = e.newData;

    console.log(this.data);

    if ((this.data.widget_label || this.data.widget_value_1) && (this.data.widget_size || this.data.widget_title || this.data.color || this.data.widget_sortnumber || this.data.kpi_id)) {
      console.log("update data dan widget")
      this.data.widget_id = e.oldData.widget_id;
      this.dashboardService.updateWidget(this.data).subscribe(res => {
        console.log(res)
      }, err => {
        this.options.message = 'updating Failed';
        notify(this.options, 'error', 3000);
        console.log("updating failed ", err);
      });

      this.data = e.newData;
      this.data.id_widget_data = e.oldData.id_widget_data;
      this.dashboardService.updateWidgetData(this.data).subscribe(res => {
        if (res.d == 1) {
          this.options.message = 'Widget Configuration Updated';
          notify(this.options, 'success', 3000);
          console.log("updating success", res);
        } else {
          this.options.message = 'updating Failed';
          notify(this.options, 'error', 3000);
          console.log("updating failed ", res);
        }
      }, err => {
        this.options.message = 'updating Failed';
        notify(this.options, 'error', 3000);
        console.log("updating failed ", err);
      });
    } else if (this.data.widget_size || this.data.widget_title || this.data.color || this.data.widget_sortnumber || this.data.kpi_id) {
      console.log("update widget only")
      this.data.widget_id = e.oldData.widget_id;
      this.updateWidget();
    } else {
      console.log("update dataonly")
      this.data = e.newData;
      this.data.id_widget_data = e.oldData.id_widget_data;
      this.updateWidgetData()
    }


  }

  updateWidget() {
    this.dashboardService.updateWidget(this.data).subscribe(res => {

      if (res.d == 1) {
        this.options.message = 'Widget Configuration Updated';
        notify(this.options, 'success', 3000);
        console.log("updating success", this.data);
      } else {
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

  updateWidgetData() {
    this.dashboardService.updateWidgetData(this.data).subscribe(res => {

      if (res.d == 1) {
        this.options.message = 'Widget Configuration Updated';
        notify(this.options, 'success', 3000);
        console.log("updating success", this.data);
      } else {
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

  updateSlide(e) {
    this.data = e.newData;
    this.data.widget_type = e.oldData.widget_type;
    this.dashboardService.updateSlidePosition(this.data).subscribe(res => {
      console.log('update success', res);
      this.options.message = 'Widget Position Updated';
      notify(this.options, 'success', 3000);
      console.log("updating success", this.data);
    }, err => {
      this.options.message = 'updating Failed';
      notify(this.options, 'error', 3000);
      console.log("updating failed ", err);
    });
  }



  delete(e) {
    let widget_id = e.key;
    this.dashboardService.delete(widget_id).subscribe(res => {
      if (res.d == 1) {
        this.options.message = 'Widget Deleted';
        notify(this.options, 'success', 3000);
        console.log("deleting success ", widget_id);
      } else {
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


  widget_id = [];

  generate(e) {
    console.log("heree", e)
    console.log(this.generated)
    let tahun = this.generated.tahun;
    if (tahun) {
      this.dashboardService.getWidgetsId().subscribe((res) => {
        let widgets = []
        widgets = res.d;
        widgets.map(el => {
          this.widget_id.push(el.widget_id);
        })

        this.widget_id.forEach(element => {
          this.dashboardService.generateWidgets(tahun, element).subscribe(response => {
            console.log(response);
          })
        });
        this.tahunDropDown.pop();
        this.dashboardService.getLastTahun().subscribe(res => {
          this.tahunDropDown.push(parseInt(res.d[0].tahun) + 1);
          if (res.d[0].tahun > tahun) {
            this.isCanGenerate = false;
          } else {
            this.isCanGenerate = true;
          }
        })
        this.dxSelect.instance.reset();
        this.dxSelect.instance.repaint();
        this.dxButton.instance.dispose()
        this.options.message = 'Generating Widget Success';
        notify(this.options, 'success', 3000);

      })
    }
  }
  generated = {
    tahun: ""
  }

  lihat_dashboard() {
    // open link in new tab
    
    let url = location.origin
    let path = location.pathname
    let fullUrl = url + path + "/#/dashboard"
    const newTab = window.open(fullUrl, '_blank')
    // set opener to null so that no one can references it
    newTab.opener = null
  }

  sortNumber;
  sortNumberComparison = () => {
    return this.sortNumber
  }

  updateDonat(e) {
    this.data = e.newData;

    console.log(this.data);

    if ((this.data.widget_value_1 || this.data.widget_value_2) && this.data.color) {
      console.log("update data dan widget")
      this.data.widget_id = e.oldData.widget_id;
      this.dashboardService.updateWidget(this.data).subscribe(res => {
        console.log(res)
      }, err => {
        this.options.message = 'updating Failed';
        notify(this.options, 'error', 3000);
        console.log("updating failed ", err);
      });

      this.data = e.newData;
      this.data.id_widget_data = e.oldData.id_widget_data;
      this.dashboardService.updateWidgetData(this.data).subscribe(res => {
        if (res.d == 1) {
          this.options.message = 'Widget Configuration Updated';
          notify(this.options, 'success', 3000);
          console.log("updating success", res);
        } else {
          this.options.message = 'updating Failed';
          notify(this.options, 'error', 3000);
          console.log("updating failed ", res);
        }
      }, err => {
        this.options.message = 'updating Failed';
        notify(this.options, 'error', 3000);
        console.log("updating failed ", err);
      });
    } else if (this.data.color) {
      console.log("update widget only")
      this.data.widget_id = e.oldData.widget_id;
      this.updateWidget();
    } else {
      console.log("update dataonly")
      this.data = e.newData;
      this.data.id_widget_data = e.oldData.id_widget_data;
      this.data.widget_value_1 = this.data.widget_value_1.toString();
      this.data.widget_value_2 = this.data.widget_value_2.toString();
      this.updateWidgetData()
    }
  }


}
