import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { WidgetType, Widget } from './Model';

@Injectable()
export class DashboardService {

  private dashboardURL = this.a.SERVER_URL + '/system/DashboardRole';
  private widgetURL = this.a.SERVER_URL + '/system/DashboardWidget';

  widgetTypes:any = [
    [{"type":"CARD-BOX"}],
    [{"type":"CIRCULAR-GAUGE"}],
    [{"type":"BAR-GAUGE"}]
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

  getWidgetByDID(did:any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get < any > (this.widgetURL +'/table?did=' + did);
  }

  getWidgetByType(widget_type:String): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get < any > (this.widgetURL +'/keyval?widget_type=' + widget_type.toUpperCase);
  }
  getCardBox(){
      return this.widgetTypes[0];
  }

  getCircularGauge(){
    return this.widgetTypes[1];
  }
  getBarGauge(){
    return this.widgetTypes[2];
  }

  update(data: Widget): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log("before save", data);
    return this.http.post < any > (this.widgetURL + '/update', data)
  }

  delete(widget_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.widgetURL + '/delete?token=' + token + '&widget_id=' + widget_id)
  }
}
