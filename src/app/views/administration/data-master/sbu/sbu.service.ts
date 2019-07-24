import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from 'app/app.constant';
import { Sbu } from './sbu.model';

@Injectable()
export class SbuService {

  private _urlSBU = this.a.SERVER_URL + '/system/BalancedScorecard/Sbu';
  constructor(private http: HttpClient, private a: AppConstant) { }



  getSbu() {
    return this.http.get <any> (this._urlSBU + '/list');
  }
  insertSbu(data:Sbu){
    const token = localStorage.getItem('token');
    return this.http.post <any> (this._urlSBU + "/insert",data);

  }



  updateSbu(data:Sbu) {
    return this.http.post <any> (this._urlSBU + "/update",data);
  }

  deleteSbu(id:string) {
    return this.http.get <any> (this._urlSBU + "/delete?id_sbu="+id);
  }
}
