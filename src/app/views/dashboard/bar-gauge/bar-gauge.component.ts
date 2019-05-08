import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../card-box/Model';

@Component({
  selector: 'app-bar-gauge',
  templateUrl: './bar-gauge.component.html',
  styleUrls: ['./bar-gauge.component.scss']
})
export class BarGaugeComponent implements OnInit {
  @Input() widgets: Widget[];
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
