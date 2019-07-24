import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-bar-sbu',
  templateUrl: './card-bar-sbu.component.html',
  styleUrls: ['./card-bar-sbu.component.scss']
})
export class CardBarSbuComponent implements OnInit {

  @Input() color;
  @Input()wide : boolean;
  @Input() nama_kpi;
  @Input() data;
  hovered:boolean=false;
  popupVisible=false;
  realisasi:any;
  buttonOptions: any = {
    text: "Save",
    type: "success",
    useSubmitBehavior: false
  }
  
  constructor() { }

  ngOnInit() {
  }

}
