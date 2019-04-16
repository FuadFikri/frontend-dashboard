import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { RoleDashboardService } from './role-dashboard.service';
import { Dashboard, Widget } from "./Model";
import notify from 'devextreme/ui/notify';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.scss'],
  providers: [RoleDashboardService]
})
export class RoleDashboardComponent implements OnInit {

  gridDataSource:any;
  Role:any;
  data:Dashboard;
  widgets:Widget[];
  widgetDataSource:any;
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };

  constructor(private elementRef: ElementRef,
    @Inject(RoleDashboardService) private roleDashboardService: RoleDashboardService) { 
        this.roleDashboardService.getAll().subscribe(resp => {
          console.log(resp);
          this.gridDataSource = resp.d;
        }, err => {
          console.log(err);
        })
        this.roleDashboardService.getUserRole().subscribe(resp => {
          this.Role = resp.d;
          console.log(this.Role);
        }, err => {
          console.log(err);
        })
        this.roleDashboardService.getWidgets().subscribe(resp => {
          this.widgets = resp.d;
          console.log("new",this.widgets);
        }, err => {
          console.log(err);
        })
    
        
        this.widgetDataSource=[];  
    }

    getWidgets(key) {
      let item = this.widgetDataSource.find((i) => i.key === key);
      if (!item) {
          item = {
              key: key,
              dataSourceInstance: new DataSource({
                  store: new ArrayStore({
                      data: this.widgets,
                      key: "did"
                  }),
                  filter: ["did", "=", key]
              })
          };
          this.widgetDataSource.push(item)
      }
      return item.dataSourceInstance;
  }



  insert(e){
    this.data = e.data;
    this.roleDashboardService.save(this.data).subscribe(res=> {
      if(res.d==1){
        this.options.message = 'New Dashboard Role Saved ';
        notify(this.options, 'success', 3000);
        console.log("insert success");
      }else{
        this.options.message = 'Saving Failed';
          notify(this.options, 'error', 3000);
        console.log("insert failed ");
      }
    }, err => {
      this.options.message = 'Saving Failed';
      notify(this.options, 'error', 3000);
    });
  } 
  
  update(e){
    this.data = e.newData;
    this.data.dashboard_id = e.oldData.dashboard_id;
    this.roleDashboardService.update(this.data).subscribe(res=> {
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

  delete(e){
    let dashboard_id = e.key;
    this.roleDashboardService.delete(dashboard_id).subscribe(res=> {
      if(res.d==1){
        this.options.message = 'Dashboard Role Deleted';
        notify(this.options, 'success', 3000);
        console.log("deleting success ",dashboard_id);
      }else{
        this.options.message = 'deleting Failed';
          notify(this.options, 'error', 3000);
        console.log("deleting failed ");
      }
    }, err => {
      this.options.message = 'deleting Failed';
      notify(this.options, 'error', 3000);
    });
  }

  ngOnInit() {
  }

}
