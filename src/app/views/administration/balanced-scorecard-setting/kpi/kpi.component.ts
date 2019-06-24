import {
  Component,
  OnInit
} from '@angular/core';
import {
  BalancedScorecardService
} from '../balanced-scorecard.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { KPI } from '../Model';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss'],
  providers: [BalancedScorecardService]
})
export class KpiComponent implements OnInit {

  kpi:KPI;
  polarisasiSource;
  ukuranCardBar;
  perspektifSource;
  cardBarSource: any;
  cardBars: any;
  tahunSelectBoxSource: any;
  bulanDropDown: any;
  now: any;
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };
  constructor(private _service: BalancedScorecardService) {
    this.cardBarSource = [];
    this.now = new Date();
  }

  ngOnInit() {
    this.polarisasiSource = this._service.getPolarisasi();
    this.ukuranCardBar = this._service.getUkuranCardBar();
    this._service.getTahun().subscribe(res => {
      this.tahunSelectBoxSource = res.d;
    })
    this.bulanDropDown = this._service.getBulanDropDown();
    this._service.getPerspektifs().subscribe(res => {
      this.perspektifSource = res.d;
    })

    const tahun = this.now.getFullYear().toString();
    this._service.getKPI(tahun).subscribe(resp => {
      // object to array
      this.cardBars = Object.keys(resp.d).map(function (index) {
        const card = resp.d[index];
        return card;
      });
      console.log('cards', this.cardBars);
    });
  }

  getCardBar(key) {
    let item = this.cardBarSource.find((i) => i.key === key);
    if (!item) {
      item = {
        key: key,
        dataSourceInstance: new DataSource({
          store: new ArrayStore({
            data: this.cardBars,
            key: 'id'
          }),
          filter: ['perspektif_id', '=', key]
        })
      };
      this.cardBarSource.push(item)
    }
    return item.dataSourceInstance;
  }

  updateKPI(e) {
    this.kpi = e.newData;
    this.kpi.id = e.key;
    this._service.updateKPI(this.kpi).subscribe(resp => {
      if (resp.d == 1 && resp.s==200) {
        this.options.message = 'Success Updated';
        notify(this.options, 'success', 3000);
        console.log('updating success', this.kpi);
      } else {
        this.options.message = 'updating Failed';
        notify(this.options, 'error', 3000);
        console.log('updating failed ', resp);
      }
    }, err => {
      this.options.message = 'updating Failed';
      notify(this.options, 'error', 3000);
      console.log('updating failed ', err);

    
    })
  }

}
