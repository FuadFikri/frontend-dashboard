import { Component, OnInit } from '@angular/core';

import notify from 'devextreme/ui/notify';
import { Router, ActivatedRoute } from '@angular/router';
import { CardBar, KPI, Nilai } from '../../balanced-scorecard-setting/Model';
import { BalancedScorecardService } from '../../balanced-scorecard-setting/balanced-scorecard.service';
import { SatuanService } from '../../data-master/satuan/satuan.service';
import { SbuService } from '../../data-master/sbu/sbu.service';

@Component({
  selector: 'app-add-sbu',
  templateUrl: './add-sbu.component.html',
  styleUrls: ['./add-sbu.component.scss'],
  providers: [BalancedScorecardService,SatuanService,SbuService]
})
export class AddSbuComponent implements OnInit {
  satuanDropDown:any;
  SbuDropDown:any[];
  perspektifDropDown:any;
  ukuranCardBar:any;
  polarisasiDropDown:any;
  cardBar;
  KPI;
  nilai;
  daerah:String;
  sbu_id:String;
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };

  constructor(private _service: BalancedScorecardService, private route:ActivatedRoute, private _router : Router,private satuanService: SatuanService, private sbuService: SbuService) {
    this._service.getPerspektifs().subscribe( res => {
      this.perspektifDropDown = res.d;
    });

    this.ukuranCardBar = this._service.getUkuranCardBar();
    this.cardBar = new CardBar(undefined, "","","","","","","","","","","","","","","");
    this.KPI = new KPI(undefined,"","","","","","","","","","","","");
    this.nilai = new Nilai(undefined, "0","0","0","0","","","");
   }

  ngOnInit() {
    let daerah = this.route.snapshot.paramMap.get("daerah");
    this.daerah = daerah;
    console.log(this.daerah);
    this.polarisasiDropDown = this._service.getPolarisasi();

    this.satuanService.getSatuans().subscribe(res => {
      this.satuanDropDown = res.d;
    })

    // mencari id_sbu dari parameter daerah dari url
    this.sbuService.getSbu().subscribe(res => {
      this.SbuDropDown = res.d;
      this.SbuDropDown.find( (el => {
        if (el.daerah == this.daerah) {
          this.sbu_id = el.id_sbu
        }
      }))
    })
  }

  insert(e) {
    e.preventDefault();
    
    this.KPI.perspektif_id = this.KPI.perspektif_id.toString();
    this.KPI.tahun = this.KPI.tahun.toString();
    this.KPI.target_rkap = this.KPI.target_rkap.toString();
    // this.KPI.nama_kpi = this.KPI.nama_kpi.toString();
    this.KPI.kpi_measurement = this.KPI.kpi_measurement.toString();
    this.KPI.bobot = this.KPI.bobot.toString();
    this.KPI.satuan = this.KPI.satuan.toString();
    this.KPI.ukuran_id = this.KPI.ukuran_id.toString();
    this.KPI.polarisasi_id = this.KPI.polarisasi_id.toString();
    this.KPI.sbu_id = this.sbu_id.toString();
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
