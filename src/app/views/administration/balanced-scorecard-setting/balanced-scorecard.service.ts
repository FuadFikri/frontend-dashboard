import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { Perspektif, CardBar } from './Model';
@Injectable()
export class BalancedScorecardService {

  bulanSource = [
    {"bulan" : "Januari"},
    {"bulan" : "Februari"},
    {"bulan" : "Maret"},
    {"bulan" : "April"},
    {"bulan" : "Mei"},
    {"bulan" : "Juni"},
    {"bulan" : "Juli"},
    {"bulan" : "Agustus"},
    {"bulan" : "September"},
    {"bulan" : "Oktober"},
    {"bulan" : "November"},
    {"bulan" : "Desember"},
    
  ];


  private _urlPerspektif = this.a.SERVER_URL + '/system/BalancedScorecard/Perspektif';
  private _urlCardBar = this.a.SERVER_URL + '/system/BalancedScorecard/CardBar';
  constructor(private http: HttpClient, private a: AppConstant) { }

  

  getPerspektifs(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this._urlPerspektif + '/list', {
      username : username,
      token : token
    })
  }

  getCardBarWithData(): Observable<any> {
    const username  = localStorage.getItem('username');
    const token     = localStorage.getItem('token');
    const tahun     = "2019";
    return this.http.post <any> (this._urlCardBar + '/keyval?tahun='+tahun,{
      username : username,
      token : token,
    } )
  }

  updatePerspektif(data:Perspektif) {
    return this.http.post <any> (this._urlPerspektif + '/update',data)
  }
  updateCardBar(data:CardBar) {
    return this.http.post <any> (this._urlCardBar + '/update',data)
  }

  insertCardBar(data:CardBar) {
    return this.http.post <any> (this._urlCardBar + '/insert', data);
  }

  getBulanDropDown() {
    return this.bulanSource;
  }
}
