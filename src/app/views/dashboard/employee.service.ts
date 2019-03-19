import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from 'app/app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'
import { widgetInterface } from './widgetInterface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = this.a.SERVER_URL + '/master/Widget/';

  constructor(private http:HttpClient, private a: AppConstant) { }

  

  getCards(){
    return this.http.get<any>(this.url+'cards');
  }
  getCardsData(){
    return this.http.get<any>(this.url+'dataCards');
  }

  getCircularGauge(){
    return this.http.get<any>(this.url+'circularGauges');
  }
  getCircularGaugeData(){
    return this.http.get<any>(this.url+'dataCircularGauges');
  }
}
