import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-bar',
  templateUrl: './card-bar.component.html',
  styleUrls: ['./card-bar.component.scss']
})
export class CardBarComponent implements OnInit {
  @Input() color;
  @Input()wide : boolean;
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
  onFormSubmit(e) {
    console.log(e);
  }

  save(e) {
    console.log(this.realisasi);
  }


  

}
