import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import {
  Subscription
} from 'rxjs';
import {
  ActivatedRoute
} from '@angular/router';
import 'rxjs/add/operator/filter';
import {
  BalancedScorecardService
} from '../../balanced-scorecard-setting/balanced-scorecard.service';

@Component({
  selector: 'app-data-sbu',
  templateUrl: './data-sbu.component.html',
  styleUrls: ['./data-sbu.component.scss'],
  providers: [BalancedScorecardService]
})
export class DataSbuComponent implements OnInit {
  cardBarSource;
  cardBars;
  subscription1: Subscription;
  subscription2: Subscription;
  perspektifSource;
  bulanDropDown;
  tahun;
  daerah;
  constructor(private service: BalancedScorecardService, private route: ActivatedRoute) {
    this.cardBarSource = [];
  }


  ngOnInit() {
    let daerah = this.route.snapshot.paramMap.get("daerah");
    this.daerah = daerah;
    this.route.queryParams.filter(params => params.tahun)
      .subscribe(params => {

        this.subscription1 = this.service.getCardBarByTahunDanBulanLevelSatu(params.tahun, params.bulan, daerah).subscribe(resp => {
          // object to array
          this.cardBars = Object.keys(resp.d).map(function (index) {
            let card = resp.d[index];
            return card;
          });
          console.log("cards", this.cardBars);
        });
        this.tahun = params.tahun;
      });
    this.bulanDropDown = this.service.getBulanDropDown();

    this.subscription2 = this.service.getPerspektifs().subscribe(resp => {
      this.perspektifSource = resp.d;
    })
  }



  getCardBar(key) {
    let item = this.cardBarSource.find((i) => i.key === key);
    if (!item) {
      item = {
        key: key,
        dataSourceInstance: new DataSource({
          store: new ArrayStore({
            data: this.cardBars,
            key: "id"
          }),
          filter: ["perspektif_id", "=", key]
        })
      };
      this.cardBarSource.push(item)
    }
    return item.dataSourceInstance;
  }

  // ngOnDestroy(): void {
  //   this.subscription1.unsubscribe();
  //   this.subscription2.unsubscribe();
  // }

}
