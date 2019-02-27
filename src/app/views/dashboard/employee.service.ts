import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from 'app/app.constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = this.a.SERVER_URL + '/master/employee/count';

  constructor(private http:HttpClient, private a: AppConstant) { }

  

  getData(){
    return this.http.get(this.url);
  }
}
