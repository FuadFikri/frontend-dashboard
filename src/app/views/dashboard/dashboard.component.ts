import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from './dashboard.service';
import 'rxjs/add/operator/takeWhile';
import { Observable, of, timer } from 'rxjs';

import {  DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { CarouselComponent } from 'ngx-carousel-lib';
import { AuthenticationService } from './../../service/authentication.service';
import { Widget, KomposisiSo } from './card-box/Model';

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
  
  now;
  komposisiSo:KomposisiSo[];

  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;
 


  pivotGridDataSource: any;
  closeableCards: Array<boolean>=[];
  constructor(@Inject(DashboardService) private dashService: DashboardService,
              private authService: AuthenticationService) {
                this.now = new Date();
   
  }

  ngOnInit(): void {
    this.komposisiSo = [
      {name: "open", val:"1000"},
      {name: "close", val:"3000"}
    ]

    Observable.timer(0,30000) //get setiap 30s setelah detik ke 0
    .takeWhile(() => this.alive)
    .subscribe(() =>  {
      let tahun = (this.now.getFullYear()).toString();
      let bulan = (this.now.getMonth()).toString();
      this.dashService.getWidgetByTahunBulanType(tahun,bulan,"CARD").subscribe(resp=>{
        this.cards = resp.d;

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
