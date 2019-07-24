import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  DxDataGridComponent
} from 'devextreme-angular';
import {
  SbuService
} from './sbu.service';
import notify from 'devextreme/ui/notify';
import {
  Sbu
} from './sbu.model';
@Component({
  selector: 'app-sbu',
  templateUrl: './sbu.component.html',
  styleUrls: ['./sbu.component.scss'],
  providers: [SbuService]
})
export class SbuComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  sbu: Sbu;
  sbuSource;
  startEditAction: string = "dblClick"
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };

  constructor(private _service: SbuService) {}

  ngOnInit() {
    this._service.getSbu().subscribe((response) => {
      this.sbuSource = response.d
    })
  }

  insertSbu(e) {
    console.log(e.data)
    this.sbu = new Sbu();
    this.sbu.daerah = e.data.daerah.toString();
    this._service.insertSbu(this.sbu).subscribe(resp => {
      if (resp.d == 1 && resp.s == 200) {
        this.options.message = 'Success Created';
        this.refresh()
        notify(this.options, 'success', 3000);
        console.log('Created success', resp);
      } else {
        this.options.message = 'Creating Failed';
        notify(this.options, 'error', 3000);
        console.log('Created failed ', resp);
      }
    }, err => {
      this.options.message = 'Created Failed';
      notify(this.options, 'error', 3000);
      console.log('Created failed ', err);
    })
    console.log(this.sbu)
  }

  deleteSbu(e) {
    const id = e.key.toString();
    this._service.deleteSbu(id).subscribe(resp => {

      if (resp.d == 1 && resp.s == 200) {
        this.options.message = 'Success Deleted';
        notify(this.options, 'success', 3000);
        console.log('Deleting success', resp);
      } else {
        this.options.message = 'Deleting Failed';
        notify(this.options, 'error', 3000);
        console.log('Deleting failed ', resp);
      }
    }, err => {
      this.options.message = 'Deleting Failed';
      notify(this.options, 'error', 3000);
      console.log('Deleting failed ', err);
    })
  }

  updateSbu(e) {
    this.sbu = e.newData;
    this.sbu.id_sbu = e.key.toString();
    console.log('before update', this.sbu);
    this._service.updateSbu(this.sbu).subscribe(res => {
      if (res.d == 1) {
        this.options.message = 'Success Updated';
        notify(this.options, 'success', 3000);
        console.log('updating success', this.sbu);
      } else {
        this.options.message = 'updating Failed';
        notify(this.options, 'error', 3000);
        console.log('updating failed ', res);
      }
    }, err => {
      this.options.message = 'updating Failed';
      notify(this.options, 'error', 3000);
      console.log('updating failed ', err);

    });
  }

  refresh() {
    this._service.getSbu().subscribe(res => {
      this.sbuSource = res.d;
    })
    this.dataGrid.instance.refresh();
  }


}
