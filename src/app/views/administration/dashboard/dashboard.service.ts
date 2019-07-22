import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { WidgetType, Widget } from './Model';

@Injectable()
export class DashboardService {

  private dashboardURL = this.a.SERVER_URL + '/system/DashboardRole';
  private widgetURL = this.a.SERVER_URL + '/system/DashboardWidget';

  cardBoxSize = [
    {"widget_size":"col-lg-6",
    "caption" : "Wide"},
    {"widget_size":"col-lg-3",
    "caption" : "Square"}
  ];
  cardBoxColor = [
    {"color":"success","caption" : "Green"},
    {"color":"primary","caption" : "Blue"},
    {"color":"warning","caption" : "Yellow"},
    {"color":"danger","caption" : "Red"}
  ];
  cardBoxCloseable = [
    {"value":"1","caption":"True"},
    {"value":"0","caption":"False"}
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

  getCardBoxSize(){
    return this.cardBoxSize;
  }

  getCardBoxColor() {
    return this.cardBoxColor;
  }
  
  getCardBoxCloseable(){
    return this.cardBoxCloseable;
  }

  // return = widgettype dan at_slide nya
  getWidgetType(){
    return this.http.get < any > (this.widgetURL +'/getWidgetType');
  }

  update(data: Widget): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log("before save", data);
    return this.http.post < any > (this.widgetURL + '/update', data)
  }

  updateSlidePosition(data: Widget): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log("before save", data);
    return this.http.post < any > (this.widgetURL + '/updateSlidePosition', data)
  }

  delete(widget_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.widgetURL + '/delete?token=' + token + '&widget_id=' + widget_id)
  }

  getWidgetsId() {
    return this.http.get <any> (this.widgetURL+ "/getWidgetId");
  }

  generateWidgets(tahun:String, widget_id:String) {
    return this.http.get <any> (this.widgetURL+ "/generateWidgets?tahun="+tahun + "&widget_id="+widget_id);
  }
}
