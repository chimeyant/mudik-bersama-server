import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Opd from './Opd'
import Pilar from './Pilar'
import Program from './Program'
import Kegiatan from './Kegiatan'
import Periode from './Periode'
import Tahun from './Tahun'

export default class Renaksi extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public opdUuid: string

  @column()
  public pilarUuid:string

  @column()
  public programUuid:string

  @column()
  public kegiatanUuid:string

  @column()
  public periodeUuid:string

  @column()
  public tahunUuid:String

  @column()
  public target: string

  @column()
  public persentasi:number

  @column()
  public indikator:string

  @column()
  public satuan:string

  @column()
  public capaian:string

  @column()
  public anggaran:string

  @column()
  public realisasi:string

  @column()
  public sumber:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public  static createUUID(renaksi:Renaksi){
    renaksi.uuid= uuid()
  }

  @belongsTo(()=>Opd,{foreignKey:"opdUuid",localKey:"uuid"})
  public opd: BelongsTo<typeof Opd>

  @belongsTo(()=>Pilar,{foreignKey:"pilarUuid",localKey:"uuid"})
  public pilar:BelongsTo<typeof Pilar>

  @belongsTo(()=>Program,{foreignKey:"programUuid",localKey:"uuid"})
  public program:BelongsTo<typeof Program>

  @belongsTo(()=> Kegiatan, {foreignKey:"kegiatanUuid",localKey:"uuid"})
  public kegiatan:BelongsTo<typeof Kegiatan>

  @belongsTo(()=> Periode{foreignKey:"periodeUuid",localKey:"uuid"})
  public periode:BelongsTo<typeof Periode>

  @belongsTo(()=> Tahun,{foreignKey:"tahunUuid", localKey:"uuid"})
  public tahun:BelongsTo<typeof Tahun>

  @computed()
  public get datadisplay(){
    return {
      id: this.uuid,
      opd: this.opd.name,
      periode: this.periode ? this.periode.name :'',
      tahun: this.tahun ? this.tahun.name :'',
      pilar: this.pilar ? this.pilar.name :'',
      program: this.program ? this.program.name :'',
      kegiatan: this.kegiatan ? this.kegiatan.name:'',
      persentasi: this.persentasi < 99 ? {color:'red', value: this.persentasi} : this.persentasi > 100 ? { color: 'blue', value: 100}: { color: 'green', value: this.persentasi}
    }
  }

  public get datarecord(){
    return {
      id: this.uuid,
      oped_uuid: this.opdUuid,
      pilar_uuid: this.pilarUuid,
      program_uuid: this.programUuid,
      kegiatan_uuid: this.kegiatanUuid,
      target: this.target,
      persentasi: this.persentasi,
      periode_uuid: this.periodeUuid,
      indikator: this.indikator,
      satuan: this.satuan,
      capaian: this.capaian,
      anggaran: this.anggaran,
      realisasi: this.realisasi,
      sumber: this.sumber,
      tahun_uuid: this.tahunUuid,
    }

  }

}
