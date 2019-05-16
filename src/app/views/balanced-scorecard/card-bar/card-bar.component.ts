import { Component, OnInit, Input } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'card-bar',
  templateUrl: './card-bar.component.html',
  styleUrls: ['./card-bar.component.scss']
})
export class CardBarComponent implements OnInit {
  @Input() color;
  hovered:boolean=false;
  popupVisible=false;

  buttonOptions: any = {
    text: "Save",
    type: "success",
    useSubmitBehavior: true
  }

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

  openModal() {
    this.popupVisible = true;
}


  

}
