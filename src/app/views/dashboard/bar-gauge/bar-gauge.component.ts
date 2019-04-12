import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-gauge',
  templateUrl: './bar-gauge.component.html',
  styleUrls: ['./bar-gauge.component.scss']
})
export class BarGaugeComponent implements OnInit {
  
  public background = '#FFFFFF';
  constructor() { }

  ngOnInit() {
  }


  customizeTooltipBar(arg) {
    return {
      html: "<a href='https://google.com'> " + (arg.index + 1) + " - " + arg.valueText + " </a>"
    };
  }
}
