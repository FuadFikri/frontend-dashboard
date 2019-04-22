import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { WidgetType } from './Model';

@Injectable()
export class DashboardService {

  private dashboardURL = this.a.SERVER_URL + '/system/DashboardRole';
  private widgetURL = this.a.SERVER_URL + '/system/DashboardWidget';

  widgetTypes:WidgetType[] = [
    {"type":"CARD-BOX"},
    {"type":"CIRCULAR-GAUGE"}
  ];
  constructor(private http: HttpClient, private a: AppConstant) { }

  getAll(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.dashboardURL + '/getDashboardWithRoleName', {
      username : username,
      token : token
    })
  }
  getWidgets(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.widgetURL + '/list', {
      username : username,
      token : token
    })
  }

  getWidgetWhereDID(did:any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get < any > (this.widgetURL +'/getWidgetbyDashboardId' +'?did=' + did);
  }

  getWidgetByType(widget_type:String): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get < any > (this.widgetURL +'/keyval?widget_type=' + widget_type.toUpperCase);
  }
  getWidgetType(){
    return this.widgetTypes;
  }
}
