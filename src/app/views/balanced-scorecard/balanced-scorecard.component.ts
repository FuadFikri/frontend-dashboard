import { Component, OnInit, ViewChild } from '@angular/core';
import { BalancedScorecardService } from '../administration/balanced-scorecard-setting/balanced-scorecard.service';
import { CardBar } from '../administration/balanced-scorecard-setting/Model';
import { CarouselComponent } from 'ngx-carousel-lib';
@Component({
  selector: 'app-balanced-scorecard',
  templateUrl: './balanced-scorecard.component.html',
  styleUrls: ['./balanced-scorecard.component.scss'],
  providers: [BalancedScorecardService]
})
export class BalancedScorecardComponent implements OnInit {
  @ViewChild('topCarousel') topCarousel: CarouselComponent;
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
    let bulan = this.now.getMonth() // getMonth mulai dari 0
    if(bulan == 0){
      bulan = 12;
    }
    console.log(bulan,tahun)
    this._service.getPerspektifs().subscribe(res => {
      this.daftarPerspektif = res.d
      this.perspektif_id = res.d.map(perspektif => perspektif.id)
      
        this._service.getCardBarByTahunDanBulanLevelNol(tahun,bulan.toString()).subscribe(res => {
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

  loop(e) {
    let lastIndex = this.daftarCardBarFiltered.length;
    
    if (e.activeIndex === lastIndex-1) {
      
      window.setTimeout(() => {
        this.topCarousel.slideTo(0);
        
      }, 5000);
      window.clearTimeout();
      console.log("to slide 0 = ", e.activeIndex);
      console.log("delay= ", this.topCarousel.delayAutoPlay);
    }
    window.clearTimeout();
    console.log("active index = ", e.activeIndex);
  }

}
