import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { WidgetType, Widget } from './Model';

@Injectable()
export class DashboardService {

  private dashboardURL = this.a.SERVER_URL + '/system/DashboardRole';
  private widgetJoinURL = this.a.SERVER_URL + '/system/DashboardWidget';
  private widgetURL = this.a.SERVER_URL + '/system/Widget';
  private widgetDataURL = this.a.SERVER_URL + '/system/WidgetData';

  cardBoxSize = [
    {"widget_size":"col-md-4",
    "caption" : "Wide"},
    {"widget_size":"col-md-3",
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

  boxSize = [
    {"size":"col-md-3", "caption":"3"},
    {"size":"col-md-4", "caption":"4"},
    {"size":"col-md-5", "caption":"5"},
  ]
  constructor(private http: HttpClient, private a: AppConstant) { }

  getAll(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.dashboardURL + '/getDashboardWithRoleName', {
      username : username,
      token : token
    })
  }
  getWidgets(tahun: string, bulan: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.widgetJoinURL + '/getWidgetByTahunBulanType?tahun='+tahun+'&bulan='+bulan+'&widget_type=', {
      username : username,
      token : token
    })
  }

  getWidgetByDID(did:any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get < any > (this.widgetJoinURL +'/table?did=' + did);
  }

  getWidgetByType(widget_type:String): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get < any > (this.widgetJoinURL +'/keyval?widget_type=' + widget_type.toUpperCase);
  }

  getCardBoxSize(){
    return this.cardBoxSize;
  }
  getBoxSize() {
    return this.boxSize;
  }

  getCardBoxColor() {
    return this.cardBoxColor;
  }
  
  getCardBoxCloseable(){
    return this.cardBoxCloseable;
  }

  // return = widgettype dan at_slide nya
  getWidgetType(){
    return this.http.get < any > (this.widgetJoinURL +'/getWidgetType');
  }

  updateWidget(data: Widget): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log("before save", data);
    return this.http.post < any > (this.widgetURL + '/update', data)
  }
  updateWidgetData(data: Widget): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log("before save", data);
    return this.http.post < any > (this.widgetDataURL + '/update', data)
  }

  updateSlidePosition(data: Widget): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log("before save", data);
    return this.http.post < any > (this.widgetJoinURL + '/updateSlidePosition', data)
  }

  delete(widget_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.widgetJoinURL + '/delete?token=' + token + '&widget_id=' + widget_id)
  }

  getWidgetsId() {
    return this.http.get <any> (this.widgetJoinURL+ "/getWidgetId");
  }

  generateWidgets(tahun:String, widget_id:String) {
    return this.http.get <any> (this.widgetJoinURL+ "/generateWidgets?tahun="+tahun + "&widget_id="+widget_id);
  }

  // untuk dropdown generate widget
  getLastTahun() {
    return this.http.get <any> (this.widgetJoinURL + '/getLastTahun');
  }
}
