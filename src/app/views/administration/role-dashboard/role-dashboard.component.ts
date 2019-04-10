import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { RoleDashboardService } from './role-dashboard.service';
import { Dashboard } from "./dashboard.model";

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
    }

  insert(e){
    this.data = e.data;
    this.roleDashboardService.save(this.data).subscribe(res=> {
      if(res.d==1){
        console.log("insert success");
      }else{
        console.log("insert failed ");
      }
    });
  } 
  
  update(e){
    this.data = e.newData;
    this.data.dashboard_id = e.oldData.dashboard_id;
    this.roleDashboardService.update(this.data).subscribe(res=> {
      if(res.d==1){
        console.log("update success", this.data);
      }else{
        console.log("update failed ");
      }
    });
  }

  delete(e){
    let dashboard_id = e.key;
    this.roleDashboardService.delete(dashboard_id).subscribe(res=> {
      if(res.d==1){
        console.log("deleting success on id", dashboard_id);
      }else{
        console.log("deleting failed ");
      }
    });
  }

  ngOnInit() {
  }

}
