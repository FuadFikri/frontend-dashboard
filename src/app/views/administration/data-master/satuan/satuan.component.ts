import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import { SatuanService } from './satuan.service';
import { Satuan } from './satuan.model';
import { DxDataGridComponent } from 'devextreme-angular';
@Component({
  selector: 'app-satuan',
  templateUrl: './satuan.component.html',
  styleUrls: ['./satuan.component.scss'],
  providers: [SatuanService]
})
export class SatuanComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  satuan:Satuan;
  satuanSource;
  startEditAction:string = "dblClick"
 
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };
  
  constructor(private _service: SatuanService) {

  }

  ngOnInit() {

    this._service.getSatuans().subscribe((response)=> {
      this.satuanSource = response.d
    })
   
  }

  

  insertSatuan(e) {
    console.log(e.data)
    this.satuan = new Satuan();
    this.satuan.satuan = e.data.satuan.toString();
    this._service.insertSatuan(this.satuan).subscribe(resp => {
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
    console.log(this.satuan)
  }

  deleteSatuan(e) {
    const id = e.key.toString();
    this._service.deleteSatuan(id).subscribe(resp => {

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

  updateSatuan(e) {
    this.satuan = e.newData;
    this.satuan.id_satuan = e.key.toString();
    console.log('before update', this.satuan);
    this._service.updateSatuan(this.satuan).subscribe(res => {
      if (res.d == 1) {
        this.options.message = 'Success Updated';
        notify(this.options, 'success', 3000);
        console.log('updating success', this.satuan);
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
    this._service.getSatuans().subscribe(res => {
      this.satuanSource = res.d;
    })
    this.dataGrid.instance.refresh();
  }


 

}
