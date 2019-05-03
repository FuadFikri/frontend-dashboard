import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import { Observable, of, timer } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { AuthenticationService } from 'app/service';
import { Widget } from './Model';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss']
})
export class CardBoxComponent implements OnInit {
  cards:Widget[];
  cardsData:any;
  alive=true;
  closeable:Array<boolean>=[];
  constructor(private dashService: DashboardService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    Observable.timer(0,30000) //get setiap 30 detik, dimulai sejak detik ke 0
    .takeWhile(() => this.alive)
    .subscribe(() =>  {
      this.authService.getWidgets('Card-Box').subscribe(resp=>{
        this.cards = resp.d;
        this.cards.map((value) => {
          value.visible = true;
        });
        
      let x = resp.d;
      this.closeable=[];
        for (let index = 0; index < x.length; index++) {
          if (this.cards[index].closeable == 1) {
            this.closeable.push(true);
          }else{
            this.closeable.push(false);
          }
          
      }
      })
      this.dashService.getCardsData().subscribe(res=>{
        this.cardsData = res.d;
      })
    })

    

  }

  hapus(card : Widget) : void{
    card.visible = false;
    // let card = this.getParent($event);
    // card.style.visibility="hidden";
  }
  
  private getParent($event){
    return $event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
  }

  ngOnDestroy(){
    this.alive = false; // switches your IntervalObservable off
  }
}

