import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  AppConstant
} from 'app/app.constant';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'
import {
  Sale
} from './saleInterface';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = this.a.SERVER_URL + '/system/DashboardWidget';

  constructor(private http: HttpClient, private a: AppConstant) {}



  getWidgetByTahunBulanType(tahun, bulan, widget_type) {
    return this.http.get < any > (this.url + '/getWidgetByTahunBulanType?' +
      'tahun=' + tahun +
      '&bulan=' + bulan +
      '&widget_type=' + widget_type
    );
  }
  getBoxs() {
    return this.http.get < any > (this.url + '/table?widget_type=BOX');
  }
  getDoughnuts() {
    return this.http.get < any > (this.url + '/table?widget_type=DOUGHNUT');
  }
  
  updateBoxValue(id_kpi,widget_id,bulan, tahun) {
    return this.http.get < any > (this.url + '/updateBoxValue?bulan='+bulan+'&id_kpi='+id_kpi+'&widget_id='+widget_id+'&tahun='+tahun);
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  getCardsData() {
    return this.http.get < any > (this.url + 'dataCards');
  }

  getCircularGauge() {
    return this.http.get < any > (this.url + 'circularGauges');
  }
  getCircularGaugeData() {
    return this.http.get < any > (this.url + 'dataCircularGauges');
  }



}
