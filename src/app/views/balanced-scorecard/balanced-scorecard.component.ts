import { Component, OnInit } from '@angular/core';
import { BalancedScorecardService } from '../administration/balanced-scorecard-setting/balanced-scorecard.service';
import { CardBar } from '../administration/balanced-scorecard-setting/Model';

@Component({
  selector: 'app-balanced-scorecard',
  templateUrl: './balanced-scorecard.component.html',
  styleUrls: ['./balanced-scorecard.component.scss'],
  providers: [BalancedScorecardService]
})
export class BalancedScorecardComponent implements OnInit {

  primary = "primary";
  info = "info";
  secondary = "secondary";
  warning = "warning";
  danger = "danger";
  success = "success";
  wide:boolean=true;
  small:boolean=false;

  daftarPerspektif;
  perspektif_id;
  daftarCardBar;
  cardBarFiltered;
  daftarCardBarFiltered:CardBar[];

  now;

  constructor(private _service : BalancedScorecardService) { 
    this.daftarCardBarFiltered = [];
    this.now = new Date()
  }

  ngOnInit() {
    let tahun = this.now.getFullYear().toString();
    let bulan = this.now.getMonth()+1
    console.log(bulan,tahun)
    this._service.getPerspektifs().subscribe(res => {
      this.daftarPerspektif = res.d
      this.perspektif_id = res.d.map(perspektif => perspektif.id)
      
        this._service.getCardBarByTahunDanBulan(tahun,bulan.toString()).subscribe(res => {
          this.daftarCardBar = Object.keys(res.d).map(function(index){
            let card = res.d[index];
            return card;
        });
          console.log(this.daftarCardBar)
          for (let index = 0; index < this.perspektif_id.length; index++) {
            this.cardBarFiltered = this.daftarCardBar.filter(cardbar => cardbar.perspektif_id==this.perspektif_id[index])
            this.daftarCardBarFiltered.push(this.cardBarFiltered);
          }
          console.log(this.daftarCardBarFiltered)
      })
    })
  }

}
