import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import { Observable, of, timer } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { AuthenticationService } from 'app/service';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss']
})
export class CardBoxComponent implements OnInit {
  cards:any;
  cardsData:any;
  alive=true;
  constructor(private dashService: DashboardService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    Observable.timer(0,30000)
    .takeWhile(() => this.alive)
    .subscribe(() =>  {
      this.authService.getWidgets('Card-Box').subscribe(resp=>{
        this.cards = resp.d;
        console.log("cards",this.cards);
      })
      this.dashService.getCardsData().subscribe(res=>{
        this.cardsData = res.d;
      })
    })

  }

}
