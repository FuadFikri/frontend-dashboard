import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from 'app/app.constant';

@Injectable()
export class SbuService {

  private _urlSBU = this.a.SERVER_URL + '/system/BalancedScorecard/Sbu';
  constructor(private http: HttpClient, private a: AppConstant) { }



  getSbu() {
    return this.http.get <any> (this._urlSBU + '/list');
  }
}
