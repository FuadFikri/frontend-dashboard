import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {
  BalancedScorecardService
} from '../administration/balanced-scorecard-setting/balanced-scorecard.service';
import {
  CardBar
} from '../administration/balanced-scorecard-setting/Model';
import {
  CarouselComponent
} from 'ngx-carousel-lib';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';
import {
  Observable
} from 'rxjs';
@Component({
  selector: 'app-balanced-scorecard',
  templateUrl: './balanced-scorecard.component.html',
  styleUrls: ['./balanced-scorecard.component.scss'],
  providers: [BalancedScorecardService]
})
export class BalancedScorecardComponent implements OnInit, OnDestroy {
  
  @ViewChild('topCarousel') topCarousel: CarouselComponent;
  primary = "primary";
  info = "info";
  secondary = "secondary";
  warning = "warning";
  danger = "danger";
  success = "success";
  wide: boolean = true;
  small: boolean = false;

  daftarPerspektif;
  perspektif_id;
  daftarCardBar;
  cardBarFiltered;
  daftarCardBarFiltered: CardBar[];
  slideSatu;
  slideDua;
  slideTiga;
  slideEmpat;
  slideLima;

  rkapSatu=[];
  bulananSatu=[];
  realisasiSatu=[];
  
  rkapDua=[];
  bulananDua=[];
  realisasiDua=[];

  rkapTiga=[];
  bulananTiga=[];
  realisasiTiga=[];

  rkapEmpat=[];
  bulananEmpat=[];
  realisasiEmpat=[];

  rkapLima=[];
  bulananLima=[];
  realisasiLima=[];

  now;
  alive = true;

  constructor(private _service: BalancedScorecardService) {
    this.daftarCardBarFiltered = [];
    this.now = new Date()
  }

  ngOnInit() {
    let tahun = this.now.getFullYear().toString();
    let bulan = this.now.getMonth() // getMonth mulai dari 0
    if (bulan == 0) {
      bulan = 12;
    }
    console.log(bulan, tahun)
    Observable.timer(0, 30000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.daftarCardBarFiltered = [];
        this._service.getPerspektifs().subscribe(res => {
          this.daftarPerspektif = res.d
          this.perspektif_id = res.d.map(perspektif => perspektif.id)

          this._service.getCardBarByTahunDanBulanLevelNol(tahun, bulan.toString()).subscribe(res => {
            this.daftarCardBar = Object.keys(res.d).map(function (index) {
              let card = res.d[index];
              return card;
            });
            console.log(this.daftarCardBar)
            for (let index = 0; index < this.perspektif_id.length; index++) {
              this.cardBarFiltered = this.daftarCardBar.filter(cardbar => cardbar.perspektif_id == this.perspektif_id[index])
              this.daftarCardBarFiltered.push(this.cardBarFiltered);
            }
            this.slideSatu = this.daftarCardBarFiltered[0];
            this.slideDua = this.daftarCardBarFiltered[1];
            this.slideTiga = this.daftarCardBarFiltered[2];
            this.slideEmpat = this.daftarCardBarFiltered[3];
            this.slideLima = this.daftarCardBarFiltered[4];
            
            this.rkapSatu = [];
            this.bulananSatu = [];
            this.realisasiSatu = [];
            this.slideSatu.forEach(element => {
              this.rkapSatu.push(parseInt(element.target_rkap))
            });
            this.slideSatu.forEach(el => {
              this.bulananSatu.push(parseInt(el.target_bulanan))
            })
            this.slideSatu.forEach(el => {
              this.realisasiSatu.push(parseInt(el.realisasi))
            })

            this.rkapDua = [];
            this.bulananDua = [];
            this.realisasiDua = [];
            this.slideDua.forEach(element => {
              this.rkapDua.push(parseInt(element.target_rkap))
            });
            this.slideDua.forEach(el => {
              this.bulananDua.push(parseInt(el.target_bulanan))
            })
            this.slideDua.forEach(el => {
              this.realisasiDua.push(parseInt(el.realisasi))
            })

            this.rkapTiga = [];
            this.bulananTiga = [];
            this.realisasiTiga = [];
            this.slideTiga.forEach(element => {
              this.rkapTiga.push(parseInt(element.target_rkap))
            });
            this.slideTiga.forEach(el => {
              this.bulananTiga.push(parseInt(el.target_bulanan))
            })
            this.slideTiga.forEach(el => {
              this.realisasiTiga.push(parseInt(el.realisasi))
            })
            
            
            this.rkapEmpat = [];
            this.bulananEmpat = [];
            this.realisasiEmpat = [];
            this.slideEmpat.forEach(element => {
              this.rkapEmpat.push(parseInt(element.target_rkap))
            });
            this.slideEmpat.forEach(el => {
              this.bulananEmpat.push(parseInt(el.target_bulanan))
            })
            this.slideEmpat.forEach(el => {
              this.realisasiEmpat.push(parseInt(el.realisasi))
            })
            
            this.rkapLima = [];
            this.bulananLima = [];
            this.realisasiLima = [];
            this.slideLima.forEach(element => {
              this.rkapLima.push(parseInt(element.target_rkap))
            });
            this.slideLima.forEach(el => {
              this.bulananLima.push(parseInt(el.target_bulanan))
            })
            this.slideLima.forEach(el => {
              this.realisasiLima.push(parseInt(el.realisasi))
            })
            
          })
        })

      });



  }

  loop(e) {
    // let lastIndex = this.daftarCardBarFiltered.length;

    if (e.activeIndex === 4) {

      window.setTimeout(() => {
        this.topCarousel.slideTo(0);

      }, 15000);
      window.clearTimeout();
      console.log("to slide 0 = ", e.activeIndex);
      console.log("delay= ", this.topCarousel.delayAutoPlay);
    }
    window.clearTimeout();
    console.log("active index = ", e.activeIndex);
  }

  ngOnDestroy(): void {
    this.alive=false;
  }

  format(value) {
    return  (value * 100).toFixed() + '%';
}
formatRKAP(value) {
  return "";
}
formatBulanan(value) {
  return (value * 100).toFixed() + '% RKAP';
}

}
