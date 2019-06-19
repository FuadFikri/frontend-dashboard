import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalancedScorecardService } from './balanced-scorecard.service';
import { Subscription } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Perspektif, CardBar } from './Model';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'app-balanced-scorecard-setting',
  templateUrl: './balanced-scorecard-setting.component.html',
  styleUrls: ['./balanced-scorecard-setting.component.scss'],
  providers: [BalancedScorecardService]
})
export class BalancedScorecardSettingComponent implements OnInit, OnDestroy {
  perspektifSource:Perspektif;
  cardBars:any;
  cardBarSource:any;
  
  perspektif:Perspektif;
  cardBar:CardBar;

  bulanDropDown;
  now:any;
  bulan:string;

  tahunSelectBoxSource;
  queryParams = {
    tahun: "",
    bulan:""
  };
  
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };

  constructor(private service: BalancedScorecardService) { 
    this.cardBarSource= [];
    this.now = new Date();
    this.queryParams.tahun = this.now.getFullYear().toString();
  }
  subscription :Subscription;
  ngOnInit() {
    this.service.getTahun().subscribe(res => {
      this.tahunSelectBoxSource = res.d;
    })
    this.bulanDropDown = this.service.getBulanDropDown(); 
    this.subscription = this.service.getPerspektifs().subscribe(resp =>{
      this.perspektifSource = resp.d;
    })
    this.bulan = this.bulanDropDown[this.now.getMonth()].bulan;
    let tahun = this.now.getFullYear().toString();

    console.log(this.bulan,tahun);
    this.service.getCardBarWithData(tahun, this.bulanDropDown[this.now.getMonth()].id).subscribe( resp => {
      // object to array
      this.cardBars = Object.keys(resp.d).map(function(index){
        let card = resp.d[index];
        return card;
    });
      console.log("cards",this.cardBars);
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
                    key: "id"
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

  updatePerspektif(e) {
    this.perspektif = e.newData;
    this.perspektif.id = e.key;
    console.log("pers",this.perspektif);
    this.service.updatePerspektif(this.perspektif).subscribe(res => {
      if(res.d==1){
        this.options.message = 'Success Updated';
        notify(this.options, 'success', 3000);
        console.log("updating success",this.perspektif);
      }else{
        this.options.message = 'updating Failed';
          notify(this.options, 'error', 3000);
        console.log("updating failed ", res);
      }
    }, err => {
      this.options.message = 'updating Failed';
      notify(this.options, 'error', 3000);
      console.log("updating failed ", err);
    
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

  /*
  1. target bulanan
      e.oldData.realisasi/this.cardBar.target_bulanan

  2. realisasi
      this.cardBar.realisasi/e.oldData.target_bulanan

  3. target bulanan dan realisasi
      this.cardBar.realisasi/this.cardBar.target_bulanan;

  */
  updateCardBar(e) {
    this.cardBar = e.newData;
    this.cardBar.id = e.key;
    this.cardBar.persentase = this.cardBar.realisasi/this.cardBar.target_bulanan;
    let hasil
    if (this.cardBar.realisasi || this.cardBar.target_bulanan) {
      if (this.cardBar.target_bulanan && this.cardBar.realisasi) {
        hasil = (this.cardBar.realisasi/this.cardBar.target_bulanan)*100;
      } else if (this.cardBar.target_bulanan){
        hasil = (e.oldData.realisasi/this.cardBar.target_bulanan)*100
      } else if (this.cardBar.realisasi){
        hasil = (this.cardBar.realisasi/e.oldData.target_bulanan)*100;
      }
      console.log("hasil",hasil);
      this.cardBar.persentase = hasil.toFixed();

      let nilai;
      if(hasil >= e.oldData.bobot){
        nilai = new Number(e.oldData.bobot);
        this.cardBar.keterangan = "Baik"
      }else {
        nilai = e.oldData.bobot * this.cardBar.persentase;
        this.cardBar.keterangan = "Masalah"
      }
      this.cardBar.persentase = this.cardBar.persentase.toString();
      console.log(nilai);
      this.cardBar.nilai = nilai.toPrecision(2);
      this.cardBar.nilai = this.cardBar.nilai.toString();
    } 
    
    console.log("cardBar",this.cardBar);
    this.service.updateCardBar(this.cardBar).subscribe(res => {
      if(res.d==1){
        this.options.message = 'Success Updated';
        notify(this.options, 'success', 3000);
        console.log("updating success",this.cardBar);
      }else{
        this.options.message = 'updating Failed';
          notify(this.options, 'error', 3000);
        console.log("updating failed ", res);
      }
    }, err => {
      this.options.message = 'updating Failed';
      notify(this.options, 'error', 3000);
      console.log("updating failed ", err);
    
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
      if(res.d==null && res.s == 200){
        this.options.message = 'New Card Created';
        notify(this.options, 'success', 3000);
        console.log("updating success",res);
      }else{
        this.options.message = 'Creating Failed';
          notify(this.options, 'error', 3000);
        console.log("updating failed ", res);
      }
    }, err => {
      this.options.message = 'Creating Failed';
      notify(this.options, 'error', 3000);
      console.log("updating failed ", err);
    
    });
  }

  customizeBobot(data) {
    return "Bobot : " + data.value;
  }
  customizeNilai(data) {
    return "Nilai : " + data.value;
  }
  
  persen(cellInfo) {
    if (cellInfo.value) {
      return cellInfo.value + "%"
    }
  }

}
