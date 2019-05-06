import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import { Observable, of, timer } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { AuthenticationService } from 'app/service';
import { Widget } from './Model';

@Component({
  selector: 'card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss']
})
export class CardBoxComponent implements OnInit {
  @Input() cards:any;
  @Input() closeable:Array<boolean>;
  cardsData:any;
  alive=true;
  constructor(private dashService: DashboardService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    
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

