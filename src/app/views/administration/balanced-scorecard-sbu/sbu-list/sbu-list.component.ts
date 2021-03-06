import {
  Component,
  OnInit
} from '@angular/core';
import {
  SbuService
} from '../../data-master/sbu/sbu.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-sbu-list',
  templateUrl: './sbu-list.component.html',
  styleUrls: ['./sbu-list.component.scss'],
  providers: [SbuService]
})
export class SbuListComponent implements OnInit {

  sbuSource;

  constructor(private sbuService: SbuService, private route: Router) {}

  ngOnInit() {
    this.sbuService.getSbu().subscribe(res => {
      this.sbuSource = res.d;
    })
  }

  openAdministration(cell) {
    let daerah = cell.data.daerah;
    this.route.navigate(['/administration/balanced-scorecard/sbu/' + daerah]).catch((reason => {
      console.log(reason);
    }))

  }


  openKPI(cell) {
    let daerah = cell.data.daerah;
    this.route.navigate(['/administration/balanced-scorecard/kpi-sbu/' + daerah]).catch((reason => {
      console.log(reason);
    }))
  }

  openDashboard(cell: any) {
    // open link in new tab
    let daerah = cell.data.daerah;
    let url = location.origin
    let path = location.pathname
    let fullUrl =url + path + "/#/balanced-scorecard-sbu/" + daerah;
    const newTab = window.open(fullUrl, '_blank')
    // set opener to null so that no one can references it
    newTab.opener = null
  }

}
