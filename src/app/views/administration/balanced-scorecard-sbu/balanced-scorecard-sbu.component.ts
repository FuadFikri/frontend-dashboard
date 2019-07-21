import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  Subscription
} from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

import notify from 'devextreme/ui/notify';
import { BalancedScorecardService } from '../balanced-scorecard-setting/balanced-scorecard.service';
import { Perspektif, CardBar, Nilai } from '../balanced-scorecard-setting/Model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-balanced-scorecard-sbu',
  templateUrl: './balanced-scorecard-sbu.component.html',
  styleUrls: ['./balanced-scorecard-sbu.component.scss'],
  providers: [BalancedScorecardService]
})
export class BalancedScorecardSbuComponent implements OnInit, OnDestroy {
  perspektifSource: Perspektif;
  cardBars: any;
  cardBarSource: any;
  ukuranCardBar: any;

  perspektif: Perspektif;
  cardBar: CardBar;
  nilai: Nilai;

  bulanDropDown;
  now: any;
  bulan: string;

  tahunSelectBoxSource;
  queryParams = {
    tahun: '',
    bulan: ''
  };

  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };
  subscription: Subscription;

  totalBobot = 0;

  constructor(private service: BalancedScorecardService, private _route: ActivatedRoute) {
    this.cardBarSource = [];
    this.now = new Date();
    this.queryParams.tahun = this.now.getFullYear().toString();
  }
  ngOnInit() {
    let daerah = this._route.snapshot.paramMap.get("daerah");
    console.log(daerah);
    this.service.getTahun().subscribe(res => {
      this.tahunSelectBoxSource = res.d;
    })
    this.bulanDropDown = this.service.getBulanDropDown();
    this.ukuranCardBar = this.service.getUkuranCardBar();
    this.subscription = this.service.getPerspektifs().subscribe(resp => {
      this.perspektifSource = resp.d;
    })
    this.bulan = this.bulanDropDown[this.now.getMonth()].bulan;
    const tahun = this.now.getFullYear().toString();

    console.log(this.bulan, tahun);
    this.service.getCardBarByTahunDanBulanLevelNol(tahun, this.bulanDropDown[this.now.getMonth()].id).subscribe(resp => {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  

  


  hitungPersentase(e) {
    let hasil;
    if (this.nilai.target_bulanan && this.nilai.realisasi) {
      hasil = (this.nilai.realisasi / this.nilai.target_bulanan) * 100;
    } else if (this.nilai.target_bulanan) {
      if (!e.oldData.realisasi) {
        hasil = 0;
      }else {
        hasil = (e.oldData.realisasi / this.nilai.target_bulanan) * 100
      }
    } else if (this.nilai.realisasi) {
      hasil = (this.nilai.realisasi / e.oldData.target_bulanan) * 100;
    }
    console.log('hasil', hasil);
    this.nilai.persentase = hasil.toFixed();
    return hasil;
  }
  hitungPersentasePolarisasiNegatif(e) {
    let hasil;
    if (this.nilai.target_bulanan && this.nilai.realisasi) {
      hasil = (2-(this.nilai.realisasi / this.nilai.target_bulanan)) * 100;
    } else if (this.nilai.target_bulanan) {
      if (!e.oldData.realisasi) {
        hasil = 0;
      }else {
        hasil = (2-(e.oldData.realisasi / this.nilai.target_bulanan)) * 100;
      }
    } else if (this.nilai.realisasi) {
      hasil = (2-(this.nilai.realisasi / e.oldData.target_bulanan)) * 100;
    }
    console.log('persentase', hasil);
    if(hasil < 0){
      hasil = '0';
      this.nilai.persentase = hasil;
    } else {
      this.nilai.persentase = hasil.toFixed();
    }
    return hasil;
  }

  hitungNilai(e, persentase) {
    let nilai: any;
    if (persentase >= 100) {
      nilai = new Number(e.oldData.bobot);
      console.log('nilaiBaik', nilai);
      this.nilai.keterangan = 'Baik'
    } else {
      nilai = e.oldData.bobot * this.nilai.persentase / 100;
      this.nilai.keterangan = 'Masalah'
      console.log('nilaiMasalah', nilai);
    }

    return nilai;
  }

  updateCardBar(e) {
    this.nilai = e.newData;
    this.nilai.id_nilai = e.oldData.id_nilai;

    if (this.nilai.realisasi || this.nilai.target_bulanan) {

      let persentase;
      if (e.oldData.polarisasi_id=="1") {
        persentase = this.hitungPersentase(e);
      } else {
        persentase = this.hitungPersentasePolarisasiNegatif(e);
      }

      const nilai = this.hitungNilai(e, persentase);

      this.nilai.persentase = this.nilai.persentase.toString();
      if (this.nilai.realisasi) {
        this.nilai.realisasi = this.nilai.realisasi.toString();
      }
      if (!this.nilai.target_bulanan) {
        this.nilai.target_bulanan = e.oldData.target_bulanan.toString();
      } else {
        this.nilai.target_bulanan = this.nilai.target_bulanan.toString();
      }
      this.nilai.nilai = nilai.toPrecision(2);
      this.nilai.nilai = this.nilai.nilai.toString();
    }

    console.log('nilai', this.nilai);
    this.service.updateNilai(this.nilai).subscribe(res => {
      if (res.d == 1) {
        this.options.message = 'Success Updated';
        notify(this.options, 'success', 3000);
        console.log('updating success', this.nilai);
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

  insertCardBar(e, perspektif_id) {
    this.cardBar = e.data;
    this.cardBar.perspektif_id = perspektif_id.toString();
    this.cardBar.tahun = this.cardBar.tahun.toString();
    this.cardBar.target_rkap = this.cardBar.target_rkap.toString();
    this.cardBar.target_bulanan = this.cardBar.target_bulanan.toString();
    this.cardBar.realisasi = this.cardBar.realisasi.toString();
    this.cardBar.nama_kpi = this.cardBar.nama_kpi.toString();

    this.service.insertCardBar(this.cardBar).subscribe(res => {
      if (res.d == null && res.s == 200) {
        this.options.message = 'New Card Created';
        notify(this.options, 'success', 3000);
        console.log('updating success', res);
      } else {
        this.options.message = 'Creating Failed';
        notify(this.options, 'error', 3000);
        console.log('updating failed ', res);
      }
    }, err => {
      this.options.message = 'Creating Failed';
      notify(this.options, 'error', 3000);
      console.log('updating failed ', err);

    });
  }
  customizeBobot(data) {
    this.totalBobot += data.value;
    return 'Bobot : ' + data.value;
  }
  customizeNilai(data) {
    return 'Nilai : ' + data.value;
  }

  persen(cellInfo) {
    if (cellInfo.value) {
      return cellInfo.value + '%'
    }
  }

}
