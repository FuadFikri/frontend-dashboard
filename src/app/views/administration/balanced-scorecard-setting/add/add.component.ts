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

    this.cardBar = new CardBar(undefined, "","","","","","","");
   }

  ngOnInit() {
  }

  insert() {
    this.cardBar.perspektif_id = this.cardBar.perspektif_id.toString();
    this.cardBar.tahun = this.cardBar.tahun.toString();
    this.cardBar.target_tahunan = this.cardBar.target_tahunan.toString();
    this.cardBar.target_bulanan = this.cardBar.target_bulanan.toString();
    this.cardBar.realisasi = this.cardBar.realisasi.toString();
    this.cardBar.title = this.cardBar.title.toString();

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