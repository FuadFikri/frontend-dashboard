import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balanced-scorecard',
  templateUrl: './balanced-scorecard.component.html',
  styleUrls: ['./balanced-scorecard.component.scss']
})
export class BalancedScorecardComponent implements OnInit {

  primary = "primary";
  info = "info";
  secondary = "secondary";
  constructor() { }

  ngOnInit() {
  }

}
