import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { Perspektif, CardBar } from './Model';
@Injectable()
export class BalancedScorecardService {

  bulanSource = [
    { "bulan": "JANUARI","id":"1"},
    {"bulan" : "FEBRUARI","id":"2"},
    {"bulan" : "MARET","id":"3"},
    {"bulan" : "APRIL","id":"4"},
    {"bulan" : "MEI","id":"5"},
    {"bulan" : "JUNI","id":"6"},
    {"bulan" : "JULI","id":"7"},
    {"bulan" : "AGUSTUS","id":"8"},
    {"bulan" : "SEPTEMBER","id":"9"},
    {"bulan" : "OKTOBER","id":"10"},
    {"bulan" : "NOVEMBER","id":"11"},
    {"bulan" : "DESEMBER","id":"12"},
    
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

  getCardBarWithData(tahun:String, bulan : String): Observable<any> {
    const username  = localStorage.getItem('username');
    const token     = localStorage.getItem('token');
    
    return this.http.post <any> (this._urlCardBar + '/keyval?tahun='+tahun +'&bulan='+bulan,{
      username : username,
      token : token,
    } )
  }
  getCardBarByTahun(tahun:String): Observable<any> {
    const username  = localStorage.getItem('username');
    const token     = localStorage.getItem('token');
    
    return this.http.post <any> (this._urlCardBar + '/keyval?tahun='+tahun,{
      username : username,
      token : token,
    } )
  }
  getCardBar(): Observable<any> {
    const username  = localStorage.getItem('username');
    const token     = localStorage.getItem('token');
    
    return this.http.post <any> (this._urlCardBar + '/list',{
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
    console.log("before save",data);
    return this.http.post <any> (this._urlCardBar + '/insertAll', data);
  }

  getBulanDropDown() {
    return this.bulanSource;
  }

  getTahun() {
    return this.http.get <any> (this._urlCardBar + '/getTahun');
  }
}
