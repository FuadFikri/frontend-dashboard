import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-bar',
  templateUrl: './card-bar.component.html',
  styleUrls: ['./card-bar.component.scss']
})
export class CardBarComponent implements OnInit {
  @Input() color;
  hovered:boolean=false;
  constructor() { }

  ngOnInit() {
  }

  toogle() {

    if (this.hovered) {
      this.hovered = false;
    } else {
      this.hovered = true;
    }
  }
  

}
