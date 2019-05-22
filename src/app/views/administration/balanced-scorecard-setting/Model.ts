export class Perspektif{
    id:number;
    nama_perspektif:string;
    sortnumber:number;
}

export class CardBar {
    id:number;
    title:string;
    perspektif_id:number;
    target_tahunan:number;
    target_bulanan:number;
    realisasi:number;
    bulan:number;
    tahun:number;
}