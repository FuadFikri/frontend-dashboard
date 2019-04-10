import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { RoleDashboardService } from './role-dashboard.service';

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.scss'],
  providers: [RoleDashboardService]
})
export class RoleDashboardComponent implements OnInit {

  gridDataSource:any;
  Role:any;
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

  ngOnInit() {
  }

}
