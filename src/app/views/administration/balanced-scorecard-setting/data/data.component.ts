import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {
  BalancedScorecardService
} from '../balanced-scorecard.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import {
  Subscription
} from 'rxjs';
import {
  ActivatedRoute
} from '@angular/router';
import 'rxjs/add/operator/filter';
import {
  Nilai
} from '../Model';
import notify from 'devextreme/ui/notify';
import { DxFileUploaderComponent, DxDataGridComponent } from 'devextreme-angular';
import { AppConstant } from 'app/app.constant';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  providers: [BalancedScorecardService]
})
export class DataComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(DxFileUploaderComponent) fileUploader: DxFileUploaderComponent;
  nilai: Nilai;
  cardBarSource;
  cardBars;
  subscription1: Subscription;
  subscription2: Subscription;
  perspektifSource;
  bulanDropDown;
  tahun;
  popupVisible:boolean=false;
  buttonMode="outlined"
  formData: FormData;
  file:any;
  bulan: string;

  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };
  totalBobot: any;
  id_nilai: any;
  disableBtUpload: boolean=true;
  resourceUrlRole: string;
  now: Date;

  bulanParams:any;
  tahunParams:any;

  constructor(private service: BalancedScorecardService, private route: ActivatedRoute,private a: AppConstant) {
    this.cardBarSource = [];
    this.resourceUrlRole= a.SERVER_URL;
    this.now = new Date();
  }


  ngOnInit() {
    this.route.queryParams.filter(params => params.tahun)
      .subscribe(params => {
        this.bulanParams = params.bulan;
        this.tahunParams = params.tahun;
        this.subscription1 = this.service.getCardBarByTahunDanBulanLevelNol(params.tahun, params.bulan).subscribe(resp => {
          // object to array
          this.cardBars = Object.keys(resp.d).map(function (index) {
            let card = resp.d[index];
            return card;
          });
          console.log("cards", this.cardBars);
        });
        this.tahun = params.tahun;
      });
    this.bulanDropDown = this.service.getBulanDropDown();

    this.subscription2 = this.service.getPerspektifs().subscribe(resp => {
      this.perspektifSource = resp.d;
    })
  }



  getCardBar(key) {
    let item = this.cardBarSource.find((i) => i.key === key);
    if (!item) {
      item = {
        key: key,
        dataSourceInstance: new DataSource({
          store: new ArrayStore({
            data: this.cardBars,
            key: "id"
          }),
          filter: ["perspektif_id", "=", key]
        })
      };
      this.cardBarSource.push(item)
    }
    return item.dataSourceInstance;
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }




  hitungPersentase(e) {
    let hasil;
    if (this.nilai.target_bulanan && this.nilai.realisasi) {
      hasil = (this.nilai.realisasi / this.nilai.target_bulanan) * 100;
    } else if (this.nilai.target_bulanan) {
      if (!e.oldData.realisasi) {
        hasil = 0;
      }else {
        hasil = (e.oldData.realisasi / this.nilai.target_bulanan) * 100
      }
    } else if (this.nilai.realisasi) {
      if (!e.oldData.target_bulanan) {
        hasil = 0;
      }else {
        hasil = (this.nilai.realisasi / e.oldData.target_bulanan) * 100;
      }
    }
    console.log('hasil', hasil);
    this.nilai.persentase = hasil.toFixed();
    return hasil;
  }
  hitungPersentasePolarisasiNegatif(e) {
    let hasil;
    if (this.nilai.target_bulanan && this.nilai.realisasi) {
      hasil = (2-(this.nilai.realisasi / this.nilai.target_bulanan)) * 100;
    } else if (this.nilai.target_bulanan) {
      if (!e.oldData.realisasi) {
        hasil = 0;
      }else {
        hasil = (2-(e.oldData.realisasi / this.nilai.target_bulanan)) * 100;
      }
    } else if (this.nilai.realisasi ) {
      if (!e.oldData.target_bulanan) {
        hasil = 0;
      }else {
        hasil = (2-(this.nilai.realisasi / e.oldData.target_bulanan)) * 100;
      }
    }
    console.log('persentase', hasil);
    if(hasil < 0){
      hasil = '0';
      this.nilai.persentase = hasil;
    } else {
      this.nilai.persentase = hasil.toFixed();
    }
    return hasil;
  }

  hitungNilai(e, persentase) {
    let nilai: any;
    if (persentase >= 100) {
      nilai = new Number(e.oldData.bobot);
      console.log('nilaiBaik', nilai);
      this.nilai.keterangan = 'Baik'
    } else {
      nilai = e.oldData.bobot * this.nilai.persentase / 100;
      this.nilai.keterangan = 'Masalah'
      console.log('nilaiMasalah', nilai);
    }

    return nilai;
  }

  updateCardBar(e) {
    this.nilai = e.newData;
    this.nilai.id_nilai = e.oldData.id_nilai;
    console.log(this.nilai);
    if (this.nilai.realisasi || this.nilai.target_bulanan) {

      let persentase;
      if (e.oldData.polarisasi_id=="1") {
        persentase = this.hitungPersentase(e);
      } else {
        persentase = this.hitungPersentasePolarisasiNegatif(e);
      }

      const nilai = this.hitungNilai(e, persentase);

      this.nilai.persentase = this.nilai.persentase.toString();
      if (this.nilai.realisasi) {
        this.nilai.realisasi = this.nilai.realisasi.toString();
      }
      if (!this.nilai.target_bulanan) {
        if (e.oldData.target_bulanan) {
          this.nilai.target_bulanan = e.oldData.target_bulanan.toString();
        }
      } else {
        this.nilai.target_bulanan = this.nilai.target_bulanan.toString();
      }
      this.nilai.nilai = nilai.toPrecision(3);
      this.nilai.nilai = this.nilai.nilai.toString();
    }

    console.log('nilai', this.nilai);
    this.service.updateNilai(this.nilai).subscribe(res => {
      if (res.d == 1) {
        this.dataGrid.instance.collapseAll(-1);
        this.refresh();
        this.options.message = 'Success Updated';
        notify(this.options, 'success', 3000);
        console.log('updating success', this.nilai);
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


  customizeBobot(data) {
    this.totalBobot += data.value;
    return 'Bobot : ' + data.value;
  }
  customizeNilai(data) {
    return 'Nilai : ' + data.value.toPrecision(3);
  }

  persen(cellInfo) {
    if (cellInfo.value) {
      return cellInfo.value + '%'
    }
  }

  judulPopup="Upload File";
  openModal(cell) {
    this.popupVisible = true;
    this.id_nilai = cell.value;
  }

    // ketika modal diclose maka uploader di reset
    close(e) {
      this.fileUploader.instance.reset();
    }
    
    
    
  
    uploadFile(e) {
      
      e.preventDefault;
      console.log(e);
      this.popupVisible = false;
  
      
      this.formData = new FormData();
      this.formData.append("id_nilai",this.id_nilai);
      this.formData.append("file",this.file);
  
  
      this.service.upload(this.formData).subscribe(res => {
        if (res.d == 1 && res.s == 200) {
          this.popupVisible = false;
          this.formData = new FormData();
          this.fileUploader.instance.reset();
          
          this.dataGrid.instance.collapseAll(-1);
          this.refresh();
          this.options.message = 'Upload Berhasil';
          notify(this.options, 'success', 3000);
          console.log('updating success', res);
        } else {
          this.options.message = 'Upload Gagal';
          notify(this.options, 'error', 3000);
          console.log('updating failed ', res);
        }
      }, err => {
        this.options.message = 'Creating Failed';
        notify(this.options, 'server error', 3000);
        console.log('server error ', err);
      });
    }
  
    selectFile(e) {
      console.log(e.target.files)
      this.file = e.target.files[0]
      if((this.file.size/1048576)>20){
        console.log("file size", this.file.size/1024);
        this.disableBtUpload = true;
      }else{
        console.log("file size", this.file.size/1048576);
        this.disableBtUpload = false;
      }
    }
    openInNewTab(url:any) {
      // open link in new tab
      let fullUrl= this.resourceUrlRole+ "/"+url;
      const newTab = window.open(fullUrl, '_blank')
      // set opener to null so that no one can references it
      newTab.opener = null
  }
  
  refresh() {
    this.bulan = this.bulanDropDown[(this.now.getMonth())-1].bulan;
      const tahun = this.now.getFullYear().toString();
      this.cardBarSource = [];
    
    this.service.getCardBarByTahunDanBulanLevelNol(this.tahunParams, this.bulanParams).subscribe(resp => {
      // object to array
      this.cardBars = Object.keys(resp.d).map(function (index) {
        const card = resp.d[index];
        return card;
      });
      console.log('cards', this.cardBars);
    });
    this.dataGrid.instance.refresh();
  }

  cek(e) {
    console.log(e)
  }


}
