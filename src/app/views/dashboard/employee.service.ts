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

  private url = this.a.SERVER_URL + '/master/Widget/list';

  constructor(private http:HttpClient, private a: AppConstant) { }

  

  getData(){
    return this.http.get<widgetInterface>(this.url);
  }
}
