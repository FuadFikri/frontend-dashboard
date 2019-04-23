import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import { Observable, of, timer } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { AuthenticationService } from 'app/service';

@Component({
  selector: 'app-circular-gauge',
  templateUrl: './circular-gauge.component.html',
  styleUrls: ['./circular-gauge.component.scss']
})
export class CircularGaugeComponent implements OnInit {
  circularGauge:any;
  circularGaugeData:Array<String>=[];
  alive: boolean=true;

  constructor(private dashService: DashboardService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    Observable.timer(0,30000)
    .takeWhile(() => this.alive)
    .subscribe(() =>  {
      this.authService.getWidgets('circular-gauge').subscribe(resp=>{
        this.circularGauge = resp.d;
        console.log('gauge',this.circularGauge);
      })

      // this.dashService.getCircularGaugeData().subscribe(res=>{
      //   let x = res.d;
      //   this.circularGaugeData = [];
      //   for (let index = 0; index < x.length; index++) {
      //     this.circularGaugeData.push(x[index].employee_id);
      //   }
      // })
    })
  }

  deleteGauge($event){
    let card = $event.target.parentElement.parentElement.parentElement.parentElement;
    console.log(card);
    card.style.visibility="hidden";
  }

  private getParent($event){
    return $event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
  }

  ngOnDestroy(){
    this.alive = false; // switches your IntervalObservable off
  }

}
