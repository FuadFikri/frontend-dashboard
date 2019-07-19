import { Component, OnInit } from '@angular/core';

import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';
import { CardBar, KPI, Nilai } from '../../balanced-scorecard-setting/Model';
import { BalancedScorecardService } from '../../balanced-scorecard-setting/balanced-scorecard.service';

@Component({
  selector: 'app-add-sbu',
  templateUrl: './add-sbu.component.html',
  styleUrls: ['./add-sbu.component.scss'],
  providers: [BalancedScorecardService]
})
export class AddSbuComponent implements OnInit {

  perspektifDropDown:any;
  ukuranCardBar:any;
  polarisasiDropDown:any;
  cardBar;
  KPI;
  nilai;

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
    this.KPI = new KPI(undefined,"","","","","","","","","","");
    this.nilai = new Nilai(undefined, "0","0","0","0","","","");
   }

  ngOnInit() {
    this.polarisasiDropDown = this._service.getPolarisasi();
  }

  insert(e) {
    e.preventDefault();
    
    this.KPI.perspektif_id = this.KPI.perspektif_id.toString();
    this.KPI.tahun = this.KPI.tahun.toString();
    this.KPI.target_rkap = this.KPI.target_rkap.toString();
    this.KPI.nama_kpi = this.KPI.nama_kpi.toString();
    this.KPI.formula = this.KPI.formula.toString();
    this.KPI.bobot = this.KPI.bobot.toString();
    this.KPI.satuan = this.KPI.satuan.toString();
    this.KPI.ukuran_id = this.KPI.ukuran_id.toString();
    this.KPI.polarisasi_id = this.KPI.polarisasi_id.toString();
    console.log(this.KPI)
    this._service.insertKPI(this.KPI).subscribe(res => {
      let kpi_id = res.d[0].id;
      this.nilai.kpi_id = kpi_id;
      console.log("respon kpi",res)
        this.insertNilai12Bulan(this.nilai);
      });

  }

  insertNilai12Bulan(nilai:Nilai) {
    this._service.insertAllNilai(nilai).subscribe(resp => {
      if(resp.d==null && resp.s == 200){
        this.options.message = 'New Card Created';
        notify(this.options, 'success', 3000);
        console.log("insert success",resp);
        this._router.navigate(['/administration/balanced-scorecard/kpi']);
      }else{
        this.options.message = 'Creating Failed';
          notify(this.options, 'error', 3000);
        console.log("updating failed ", resp);
      }
    }, err => {
      this.options.message = 'Creating Failed';
      notify(this.options, 'error', 3000);
      console.log("updating failed ", err);
    });
  }
}
