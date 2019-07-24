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
    widget_sortnumber: number;
    color: string;
    widget_label: string;
    widget_size: string;
    widget_title: string;
    widget_type: string;
    widget_id: any;
    bulan:any;
    tahun:any;
    id_widget_data:any;
    widget_value_1:any;
    widget_value_2:any;
    kpi_id:any;
  }