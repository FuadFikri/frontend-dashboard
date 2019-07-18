import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from 'app/app.constant';
import { Satuan } from './satuan.model';

@Injectable()
export class SatuanService {

  private _url = this.a.SERVER_URL + "/system/BalancedScorecard/Satuan"

  constructor(private http: HttpClient, private a: AppConstant) { }

  insertSatuan(data:Satuan){
    const token = localStorage.getItem('token');
    return this.http.post <any> (this._url + "/insert",data);

  }

  getSatuans(){
    return this.http.get <any> (this._url + "/list")
  }

  updateSatuan(data:Satuan) {
    return this.http.post <any> (this._url + "/update",data);
  }

  deleteSatuan(id:string) {
    return this.http.get <any> (this._url + "/delete?id_satuan="+id);
  }
  
}
