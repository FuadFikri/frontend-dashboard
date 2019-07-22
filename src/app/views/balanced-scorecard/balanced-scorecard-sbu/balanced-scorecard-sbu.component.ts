import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  CarouselComponent
} from 'ngx-carousel-lib';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';
import {
  Observable
} from 'rxjs';
import { CardBar } from 'app/views/administration/balanced-scorecard-setting/Model';
import { BalancedScorecardService } from 'app/views/administration/balanced-scorecard-setting/balanced-scorecard.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-balanced-scorecard-sbu',
  templateUrl: './balanced-scorecard-sbu.component.html',
  styleUrls: ['./balanced-scorecard-sbu.component.scss'],
  providers: [BalancedScorecardService]
})
export class BalancedScorecardSbuComponent implements OnInit, OnDestroy {
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

  now;
  alive = true;
  daerah;

  constructor(private _service: BalancedScorecardService, private _route: ActivatedRoute) {
    this.daftarCardBarFiltered = [];
    this.now = new Date()
  }

  ngOnInit() {
    let daerah = this._route.snapshot.paramMap.get("daerah");
    this.daerah = daerah;
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

          this._service.getCardBarByTahunDanBulanLevelSatu(tahun, bulan.toString(),this.daerah).subscribe(res => {
            this.daftarCardBar = Object.keys(res.d).map(function (index) {
              let card = res.d[index];
              return card;
            });
            console.log(this.daftarCardBar)
            for (let index = 0; index < this.perspektif_id.length; index++) {
              this.cardBarFiltered = this.daftarCardBar.filter(cardbar => cardbar.perspektif_id == this.perspektif_id[index])
              this.daftarCardBarFiltered.push(this.cardBarFiltered);
            }
            console.log(this.daftarCardBarFiltered)
          })
        })
      });
  }

  loop(e) {
    // let lastIndex = this.daftarCardBarFiltered.length;
    if (e.activeIndex === 4) {
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

  ngOnDestroy(): void {
    this.alive=false;
  }
}
