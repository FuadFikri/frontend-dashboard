export class DashboardWithRoleName{
    dashboard_id:number;
    role_id:number;
    role_name:string;
    description:string;
}
export class Search {
    role_id: string;
    nama: string;
    keterangan: string;
    isallowregistration: boolean;
    menu: string;
  }

export class WidgetType {
    type:string;
}
export class Widget {
    auto_refresh: number;
    widget_sortnumber: number;
    color: string;
    widget_label: string;
    widget_size: string;
    gauge_end: number;
    gauge_start: number;
    widget_title: string;
    widget_type: string;
    widget_column: string;
    vid: number;
    closeable: number;
    refresh_timescale: number;
    widget_position: string;
    widget_id: number;
    gauge_height: number;
    role_id: number;
    did: number;
    refresh_period: number;
    gauge_interval: number;
    description: string;
  }