import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { Perspektif, CardBar, KPI, Nilai } from './Model';
@Injectable()
export class BalancedScorecardService {

  bulanSource = [
    { 'bulan': 'JANUARI', 'id': '1'},
    {'bulan' : 'FEBRUARI', 'id': '2'},
    {'bulan' : 'MARET', 'id': '3'},
    {'bulan' : 'APRIL', 'id': '4'},
    {'bulan' : 'MEI', 'id': '5'},
    {'bulan' : 'JUNI', 'id': '6'},
    {'bulan' : 'JULI', 'id': '7'},
    {'bulan' : 'AGUSTUS', 'id': '8'},
    {'bulan' : 'SEPTEMBER', 'id': '9'},
    {'bulan' : 'OKTOBER', 'id': '10'},
    {'bulan' : 'NOVEMBER', 'id': '11'},
    {'bulan' : 'DESEMBER', 'id': '12'},

  ];
  ukuranCardBar = [
    {'ukuran': 'Besar', 'panjang_kolom': '6', 'id': '1'},
    {'ukuran': 'Sedang', 'panjang_kolom': '4', 'id': '2'},
    {'ukuran': 'Kecil', 'panjang_kolom': '3', 'id': '3'},
  ]
  polarisasi = [
    {'display': 'POSITIF', 'value': 'fa-long-arrow-up', 'id': '1'},
    {'display': 'NEGATIF', 'value': 'fa-long-arrow-down', 'id': '2'}
  ]


  private _urlPerspektif = this.a.SERVER_URL + '/system/BalancedScorecard/Perspektif';
  private _urlCardBar = this.a.SERVER_URL + '/system/BalancedScorecard/CardBar';
  private _urlKPI = this.a.SERVER_URL + '/system/BalancedScorecard/KPI';
  private _urlNilai = this.a.SERVER_URL + '/system/BalancedScorecard/Nilai';
  constructor(private http: HttpClient, private a: AppConstant) { }



  getPerspektifs(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this._urlPerspektif + '/sortedList', {
      username : username,
      token : token
    })
  }

  insertPerspektif(perspektif: Perspektif) {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post<any> (this._urlPerspektif + '/insert', perspektif )
  }

  getKpiPusat(tahun: String): Observable<any> {
    const username  = localStorage.getItem('username');
    const token     = localStorage.getItem('token');

    return this.http.post <any> (this._urlKPI + '/getKpiPusat?tahun=' + tahun, {
      username : username,
      token : token,
    } )
  }
  getKpiSbu(tahun: String,sbu_id:String): Observable<any> {
    const username  = localStorage.getItem('username');
    const token     = localStorage.getItem('token');

    return this.http.post <any> (this._urlKPI + '/getKpiSbu?tahun=' + tahun +'&sbu_id='+sbu_id, {
      username : username,
      token : token,
    } )
  }
  getCardBarByTahunDanBulanLevelNol(tahun: String, bulan: String): Observable<any> {
    const username  = localStorage.getItem('username');
    const token     = localStorage.getItem('token');

    if (bulan) {
      // pake =
      return this.http.post <any> (this._urlCardBar + '/getCardBarLevelNol?tahun='+tahun+'&bulan='+bulan, {
        username : username,
        token : token,
      } )
    } else {
      // pake like
      return this.http.post <any> (this._urlCardBar + '/getCardBarLevelNolByTahunandBulan?tahun=' + tahun + '&bulan=' + bulan, {
        username : username,
        token : token,
      } )
    }
  }
  getCardBarByTahunDanBulanLevelSatu(tahun: String, bulan: String,daerah:String): Observable<any> {
    const username  = localStorage.getItem('username');
    const token     = localStorage.getItem('token');

    if (bulan) {
      // pakai =
      return this.http.post <any> (this._urlCardBar + '/getCardBarLevelSatu?tahun='+tahun+'&bulan='+bulan+'&daerah='+daerah, {
        username : username,
        token : token,
      } )
    } else {
      // pakai like
      return this.http.post <any> (this._urlCardBar + '/getCardBarLevelSatuByTahunandBulan?tahun=' + tahun + '&bulan=' + bulan + '&daerah='+daerah, {
        username : username,
        token : token,
      } )
    }
  }
  getCardBar(): Observable<any> {
    const username  = localStorage.getItem('username');
    const token     = localStorage.getItem('token');

    return this.http.post <any> (this._urlCardBar + '/list', {
      username : username,
      token : token,
    } )
  }

  updatePerspektif(data: Perspektif) {
    return this.http.post <any> (this._urlPerspektif + '/update', data)
  }
  updateCardBar(data: CardBar) {
    return this.http.post <any> (this._urlCardBar + '/update', data)
  }
  updateNilai(data: Nilai) {
    return this.http.post <any> (this._urlNilai + '/update', data)
  }
  updateKPI(data: KPI) {
    return this.http.post <any> (this._urlKPI + '/update', data)
  }

  insertCardBar(data: CardBar) {
    console.log('before save', data);
    return this.http.post <any> (this._urlCardBar + '/insertAll', data);
  }
  insertKPI(data: KPI) {
    console.log('before save', data);
    return this.http.post <any> (this._urlKPI + '/insert', data);
  }
  insertAllNilai(data: Nilai) {
    console.log('before save', data)
    return this.http.post <any> (this._urlNilai + '/insertAll', data);
  }

  deleteKPI(id: String) {
    console.log('before delete',id);
    const token = localStorage.getItem('token');
    return this.http.get <any> (this._urlKPI + '/delete?id=' + id);
  }
  deletePerspektif(id: String) {
    console.log('before delete',id);
    const token = localStorage.getItem('token');
    return this.http.get <any> (this._urlPerspektif + '/delete?id=' + id);
  }

  getBulanDropDown() {
    return this.bulanSource;
  }
  getUkuranCardBar() {
    return this.ukuranCardBar;
  }
  getPolarisasi() {
    return this.polarisasi;
  }

  getTahun() {
    return this.http.get <any> (this._urlCardBar + '/getTahun');
  }


  upload(data:any){
    return this.http.post <any> (this._urlNilai + "/uploadFile",data);
  }

  getTotalNilaiLevelNol(tahun:string, bulan:string) {
    return this.http.get <any> (this._urlCardBar + '/totalNilai?tahun='+tahun + '&bulan='+bulan +'&daerah=pusat');
  }
  getTotalNilaiLevelSatu(tahun:string, bulan:string, daerah:string) {
    return this.http.get <any> (this._urlCardBar + '/totalNilai?tahun='+tahun + '&bulan='+bulan+'&daerah='+daerah);
  }
}
