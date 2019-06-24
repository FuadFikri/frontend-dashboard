import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  BalancedScorecardService
} from './balanced-scorecard.service';
import {
  Subscription
} from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import {
  Perspektif,
  CardBar,
  Nilai
} from './Model';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'app-balanced-scorecard-setting',
  templateUrl: './balanced-scorecard-setting.component.html',
  styleUrls: ['./balanced-scorecard-setting.component.scss'],
  providers: [BalancedScorecardService]
})
export class BalancedScorecardSettingComponent implements OnInit, OnDestroy {
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

  constructor(private service: BalancedScorecardService) {
    this.cardBarSource = [];
    this.now = new Date();
    this.queryParams.tahun = this.now.getFullYear().toString();
  }
  ngOnInit() {
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
    this.service.getCardBarByTahunDanBulan(tahun, this.bulanDropDown[this.now.getMonth()].id).subscribe(resp => {
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

  updatePerspektif(e) {
    this.perspektif = e.newData;
    this.perspektif.id = e.key;
    console.log('pers', this.perspektif);
    this.service.updatePerspektif(this.perspektif).subscribe(res => {
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

  insertPerspektif(e) {
    console.log(e.data)
    this.perspektif = new Perspektif();
    this.perspektif.nama_perspektif = e.data.nama_perspektif;
    this.perspektif.sortnumber = e.data.sortnumber;
    this.service.insertPerspektif(this.perspektif).subscribe(res => {
      console.log(res);
    })
    console.log(this.perspektif)
  }


  hitungPersentase(e) {
    let hasil;
    if (this.nilai.target_bulanan && this.nilai.realisasi) {
      hasil = (this.nilai.realisasi / this.nilai.target_bulanan) * 100;
    } else if (this.nilai.target_bulanan) {
      hasil = (e.oldData.realisasi / this.nilai.target_bulanan) * 100
    } else if (this.nilai.realisasi) {
      hasil = (this.nilai.realisasi / e.oldData.target_bulanan) * 100;
    }
    console.log('hasil', hasil);
    this.nilai.persentase = hasil.toFixed();
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

      const persentase = this.hitungPersentase(e);

      const nilai = this.hitungNilai(e, persentase);

      this.nilai.persentase = this.nilai.persentase.toString();
      this.nilai.realisasi = this.nilai.realisasi.toString();
      this.nilai.target_bulanan = this.nilai.target_bulanan.toString();
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
