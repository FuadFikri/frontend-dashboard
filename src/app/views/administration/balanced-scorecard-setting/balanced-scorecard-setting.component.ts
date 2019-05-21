import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalancedScorecardService } from './balanced-scorecard.service';
import { Subscription } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-balanced-scorecard-setting',
  templateUrl: './balanced-scorecard-setting.component.html',
  styleUrls: ['./balanced-scorecard-setting.component.scss'],
  providers: [BalancedScorecardService]
})
export class BalancedScorecardSettingComponent implements OnInit, OnDestroy {
  perspektif:any;
  cardBar:any;
  cardBarSource:any;
  resultArray:any[];
  constructor(private service: BalancedScorecardService) { 
    this.cardBarSource= [];
  }
  subscription :Subscription;
  ngOnInit() {
    this.subscription = this.service.getPerspektifs().subscribe(resp =>{
      this.perspektif = resp.d;
    })

    this.service.getCardBarWithData().subscribe( resp => {
      this.cardBar = Object.keys(resp.d).map(function(index){
        let card = resp.d[index];
        return card;
    });
      console.log("card",this.cardBar);
    });
    
  }

  getCardBar(key) {
    let item = this.cardBarSource.find((i) => i.key === key);
    if (!item) {
        item = {
            key: key,
            dataSourceInstance: new DataSource({
                store: new ArrayStore({
                    data: this.cardBar,
                    key: "perspektif_id"
                }),
                filter: ["perspektif_id", "=", key]
            })
        };
        this.cardBarSource.push(item)
    }
    return item.dataSourceInstance;
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
