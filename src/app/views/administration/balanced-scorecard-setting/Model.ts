export class Perspektif{
    id:number;
    nama_perspektif:string;
    sortnumber:number;
}

export class CardBar {
    id:any;
    nama_kpi:any;
    perspektif_id:any;
    target_rkap:any;
    target_bulanan:any;
    realisasi:any;
    bulan:any;
    tahun:any;
    formula:any;
    satuan:any;
    bobot:any;
    persentase:any;
    nilai:any;


    constructor(id:any,
        title:any,
        perspektif_id:any,
        target_rkap:any,
        target_bulanan:any,
        realisasi:any,
        bulan:any,
        tahun:any,
        formula:any,
        satuan:any,
        bobot:any,
        persentase:any,
        nilai:any) {
            
        }
}