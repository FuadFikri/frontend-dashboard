import { Component, OnInit } from '@angular/core';
import { SbuService } from '../../data-master/sbu/sbu.service';

@Component({
  selector: 'app-sbu-list',
  templateUrl: './sbu-list.component.html',
  styleUrls: ['./sbu-list.component.scss'],
  providers: [SbuService]
})
export class SbuListComponent implements OnInit {

  sbuSource;

  constructor(private sbuService: SbuService) { }

  ngOnInit() {
    this.sbuService.getSbu().subscribe(res => {
      this.sbuSource = res.d;
    })
  }

  openAdministration(cell) {
    console.log(cell);
    
  }
  
  openDashboard(cell) {
    console.log(cell);

  }
  openKPI(cell) {
    console.log(cell);

  }

}
