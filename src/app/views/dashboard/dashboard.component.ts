import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from './dashboard.service';
import 'rxjs/add/operator/takeWhile';
import { Observable, of, timer } from 'rxjs';

import {  DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { CarouselComponent } from 'ngx-carousel-lib';
import { AuthenticationService } from './../../service/authentication.service';
import { KomposisiSo } from './card-box/Model';
import { Widget } from '../administration/dashboard/Model';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.css']
})


export class DashboardComponent implements OnInit {
  array=[1,2,3,4,5]
  @ViewChild('topCarousel') topCarousel: CarouselComponent;
  public brandPrimary = '#FFFFFF';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';
  alive = true;
  circularGauge:Widget[];
  cards:any;
  barGauges:Widget[];
  doughnut:Widget;
  now;
  komposisiSo:KomposisiSo[];
  boxes;

  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;
 


  pivotGridDataSource: any;
  closeableCards: Array<boolean>=[];
  constructor(@Inject(DashboardService) private dashService: DashboardService,
              private authService: AuthenticationService) {
                this.now = new Date();


                
               
                
  }

  ngOnInit(): void {
    

    Observable.timer(0,30000) //get setiap 30s setelah detik ke 0
    .takeWhile(() => this.alive)
    .subscribe(() =>  {
      let tahun = (this.now.getFullYear()).toString();
      let bulan = (this.now.getMonth()).toString();
      this.dashService.getWidgetByTahunBulanType(tahun,bulan,"CARD").subscribe(resp=>{
        this.cards = resp.d;
      })
      
      
      this.dashService.getWidgetByTahunBulanType(tahun,bulan,"BOX").subscribe(resp=>{
        let boxs = resp.d;
        boxs.forEach(box => {
          if (box.kpi_id) {
            this.dashService.updateBoxValue(box.kpi_id, box.widget_id, bulan, tahun).subscribe(res => {
              console.log("box updated",res.d);
            })
          }
        });
        this.boxes = boxs;
        console.log("boxs",boxs);
      })
      
   
      this.dashService.getWidgetByTahunBulanType(tahun,bulan,"DOUGHNUT").subscribe(resp=>{
        this.doughnut = resp.d[0];
        this.komposisiSo = [
          {name: "open", val:resp.d[0].widget_value_1},
          {name: "close", val:resp.d[0].widget_value_2}
        ]
        console.log( this.komposisiSo)
      })
    })
  }


  public ngOnDestroy(): void {
    this.alive = false; 
  }

  loop(e) {
    if (e.activeIndex === 2) {
      window.setTimeout(() => {
        this.topCarousel.slideTo(0);
      }, 6000);
      window.clearTimeout();
      console.log("to slide 0 = ", e.activeIndex);
    }
    window.clearTimeout();
    console.log("active index = ", e.activeIndex);
  }


  
}
