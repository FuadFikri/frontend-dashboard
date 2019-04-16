import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { Dashboard } from "./Model";

@Injectable()
export class RoleDashboardService {

  private dashboardURL = this.a.SERVER_URL + '/system/DashboardRole';
  private userRoleURL = this.a.SERVER_URL + '/system/UserRole';
  private widgetURL = this.a.SERVER_URL + '/system/DashboardWidget';

  constructor(private http: HttpClient, private a: AppConstant) { }

  getAll(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.dashboardURL + '/list', {
      username : username,
      token : token
    })
  }

  getUserRole(): Observable<any> {
    return this.http.get < any >(this.userRoleURL  + '/list');
  }

  save(data: Dashboard): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < Dashboard > (this.dashboardURL + '/insert', data);
  }

  update(data: Dashboard): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log("before save", data);
    return this.http.post < any > (this.dashboardURL + '/update', data)
  }

  delete(dashboard_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.dashboardURL + '/delete?token=' + token + '&dashboard_id=' + dashboard_id)
  }

  getWidgets(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.widgetURL + '/list', {
      username : username,
      token : token
    })
  }


}
