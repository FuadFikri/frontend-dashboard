export class Perspektif {
  id: number;
  nama_perspektif: string;
  sortnumber: number;
}

export class CardBar {
  id: any;
  nama_kpi: any;
  perspektif_id: any;
  target_rkap: any;
  target_bulanan: any;
  realisasi: any;
  bulan: any;
  tahun: any;
  formula: any;
  satuan: any;
  bobot: any;
  persentase: any;
  nilai: any;
  ukuran: any
  keterangan: any;
  polarisasi: any;


  constructor(id: any,
    title: any,
    perspektif_id: any,
    target_rkap: any,
    target_bulanan: any,
    realisasi: any,
    bulan: any,
    tahun: any,
    formula: any,
    satuan: any,
    bobot: any,
    persentase: any,
    nilai: any,
    ukuran: any,
    keterangan: any,
    polarisasi: any) {

  }

}
export class KPI {
  id: any;
  nama_kpi: any;
  perspektif_id: any;
  target_rkap: any;
  tahun: any;
  formula: any;
  satuan: any;
  bobot: any;
  ukuran_id: any
  polarisasi_id: any;

  constructor(
    id: any,
    nama_kpi: any,
    perspektif_id: any,
    target_rkap: any,
    tahun: any,
    formula: any,
    satuan: any,
    bobot: any,
    ukuran_id: any,
    polarisasi_id: any
  ) {

  }
}

export class Nilai {
  id_nilai: any;
  target_bulanan: any;
  realisasi: any;
  persentase: any;
  nilai: any;
  keterangan: any;
  kpi_id: any;
  bulan: any;

  constructor(
    id_nilai: any,
    target_bulanan: any,
    realisasi: any,
    persentase: any,
    nilai: any,
    keterangan: any,
    kpi_id: any,
    bulan: any
  ) {

  }
}
