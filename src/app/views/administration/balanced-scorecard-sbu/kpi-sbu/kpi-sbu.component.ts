import {
  Component,
  OnInit
} from '@angular/core';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

import notify from 'devextreme/ui/notify';
import { BalancedScorecardService } from '../../balanced-scorecard-setting/balanced-scorecard.service';
import { KPI, Perspektif } from '../../balanced-scorecard-setting/Model';
import { ActivatedRoute } from '@angular/router';
import { SbuService } from '../../data-master/sbu/sbu.service';
import { SatuanService } from '../../data-master/satuan/satuan.service';
@Component({
  selector: 'app-kpi-sbu',
  templateUrl: './kpi-sbu.component.html',
  styleUrls: ['./kpi-sbu.component.scss'],
  providers: [BalancedScorecardService,SbuService,SatuanService]
})
export class KpiSbuComponent implements OnInit {

  kpi: KPI;
  SbuDropDown:any[];
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
  perspektif: any;
  daerah: any;
  sbu_id: any;
  satuanSource:any;
  constructor(private _service: BalancedScorecardService, private router: ActivatedRoute,private sbuService: SbuService, private satuanService: SatuanService) {
    this.cardBarSource = [];
    this.now = new Date();
  }

  ngOnInit() {
    let daerah = this.router.snapshot.paramMap.get("daerah");
    this.daerah = daerah;
    console.log(this.daerah);
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
    // mencari id_sbu dari parameter daerah dari url
    this.sbuService.getSbu().subscribe(res => {
      this.SbuDropDown = res.d;
      this.SbuDropDown.map((e) => {
        if (e.daerah == this.daerah) {
          this.sbu_id = e.id_sbu;
        }
      })

    this._service.getKpiSbu(tahun,this.sbu_id).subscribe(resp => {
      // object to array
      this.cardBars = Object.keys(resp.d).map(function (index) {
        const card = resp.d[index];
        return card;
      });
      console.log('cards', this.cardBars);
    });
      console.log(this.sbu_id)

      this.satuanService.getSatuans().subscribe(res => {
        this.satuanSource = res.d;
      })
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
            key: 'id'
          }),
          filter: ['perspektif_id', '=', key]
        })
      };
      this.cardBarSource.push(item)
    }
    return item.dataSourceInstance;
  }


  insertPerspektif(e) {
    console.log(e.data)
    this.perspektif = new Perspektif();
    this.perspektif.nama_perspektif = e.data.nama_perspektif;
    this.perspektif.sortnumber = e.data.sortnumber;
    this._service.insertPerspektif(this.perspektif).subscribe(resp => {
      if (resp.d == 1 && resp.s == 200) {
        this.options.message = 'Success Created';
        notify(this.options, 'success', 3000);
        console.log('Created success', resp);
      } else {
        this.options.message = 'Creating Failed';
        notify(this.options, 'error', 3000);
        console.log('Created failed ', resp);
      }
    }, err => {
      this.options.message = 'Created Failed';
      notify(this.options, 'error', 3000);
      console.log('Created failed ', err);
    })
    console.log(this.perspektif)
  }

  deletePerspektif(e) {
    const id = e.key;
    this._service.deletePerspektif(id).subscribe(resp => {

      if (resp.d == 1 && resp.s == 200) {
        this.options.message = 'Success Deleted';
        notify(this.options, 'success', 3000);
        console.log('Deleting success', resp);
      } else {
        this.options.message = 'Deleting Failed';
        notify(this.options, 'error', 3000);
        console.log('Deleting failed ', resp);
      }
    }, err => {
      this.options.message = 'Deleting Failed';
      notify(this.options, 'error', 3000);
      console.log('Deleting failed ', err);
    })
  }

  updatePerspektif(e) {
    this.perspektif = e.newData;
    this.perspektif.id = e.key;
    console.log('pers', this.perspektif);
    this._service.updatePerspektif(this.perspektif).subscribe(res => {
      if (res.d == 1) {
        this.options.message = 'Success Updated';
        notify(this.options, 'success', 3000);
        console.log('updating success', this.perspektif);
      } else {
        this.options.message = 'updating Failed';
          notify(this.options, 'error', 3000);
        console.log('updating failed ', res);
      }
    }, err => {
      this.options.message = 'updating Failed';
      notify(this.options, 'error', 3000);
      console.log('updating failed ', err);

    });
  }


  updateKPI(e) {
    this.kpi = e.newData;
    this.kpi.id = e.key;
    this._service.updateKPI(this.kpi).subscribe(resp => {
      if (resp.d == 1 && resp.s == 200) {
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

  deleteKPI(e) {
    const id = e.key;
    this._service.deleteKPI(id).subscribe(resp => {

      if (resp.d == 1 && resp.s == 200) {
        this.options.message = 'Success Deleted';
        notify(this.options, 'success', 3000);
        console.log('Deleting success', resp);
      } else {
        this.options.message = 'Deleting Failed';
        notify(this.options, 'error', 3000);
        console.log('Deleting failed ', resp);
      }
    }, err => {
      this.options.message = 'Deleting Failed';
      notify(this.options, 'error', 3000);
      console.log('Deleting failed ', err);
    })
  }


}
