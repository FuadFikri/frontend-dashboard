import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class RoleDashboardService {

  private dashboardURL = this.a.SERVER_URL + '/system/Dashboard';
  private userRoleURL = this.a.SERVER_URL + '/system/UserRole';

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
}
