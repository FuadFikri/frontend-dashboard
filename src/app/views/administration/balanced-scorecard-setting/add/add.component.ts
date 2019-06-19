import { Component, OnInit } from '@angular/core';
import { BalancedScorecardService } from '../balanced-scorecard.service';
import { CardBar } from '../Model';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [BalancedScorecardService]
})
export class AddComponent implements OnInit {

  perspektifDropDown:any;
  ukuranCardBar:any;
  polarisasiDropDown:any;
  cardBar;

  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };

  constructor(private _service: BalancedScorecardService, private _router : Router) {
    this._service.getPerspektifs().subscribe( res => {
      this.perspektifDropDown = res.d;
    });

    this.ukuranCardBar = this._service.getUkuranCardBar();
    this.cardBar = new CardBar(undefined, "","","","","","","","","","","","","","","");
   }

  ngOnInit() {
    this.polarisasiDropDown = this._service.getPolarisasi();
  }

  insert(e) {
    e.preventDefault();
    
    this.cardBar.perspektif_id = this.cardBar.perspektif_id.toString();
    this.cardBar.tahun = this.cardBar.tahun.toString();
    this.cardBar.target_rkap = this.cardBar.target_rkap.toString();
    this.cardBar.target_bulanan = "0";
    this.cardBar.realisasi = "0";
    this.cardBar.nama_kpi = this.cardBar.nama_kpi.toString();
    this.cardBar.formula = this.cardBar.formula.toString();
    this.cardBar.bobot = this.cardBar.bobot.toString();
    this.cardBar.satuan = this.cardBar.satuan.toString();
    this.cardBar.ukuran = this.cardBar.ukuran.toString();
    this.cardBar.polarisasi = this.cardBar.polarisasi.toString();
    // this.cardBar.persentase = this.cardBar.persentase.toString();
    // this.cardBar.nilai = this.cardBar.nilai.toString();
    // console.log(this.cardBar)
    this._service.insertCardBar(this.cardBar).subscribe(res => {
      if(res.d==null && res.s == 200){
        this.options.message = 'New Card Created';
        notify(this.options, 'success', 3000);
        console.log("insert success",res);
        this._router.navigate(['/administration/balanced-scorecard']);
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
}
