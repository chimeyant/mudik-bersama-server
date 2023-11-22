import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Permohonan from './Permohonan'

export default class Pemeriksaan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public permohonanUuid: string

  @column()
  public hari:string

  @column()
  public tanggal:DateTime

  @column()
  public lokasi:string

  @column()
  public namaLokasi:string

  @column()
  public namaPengemudi:string

  @column()
  public umur:number

  @column()
  public namaPo:string

  @column()
  public nomorKendaraan:string

  @column()
  public jenisKendaraan:string

  @column()
  public nomorStuk:string

  @column()
  public jenisAngkutan:string

  @column()
  public trayek:string

  @column()
  public trayekUuid:string

  @column()
  public laikJalan:string

  @column()
  public tidakLaikJalan:string

  @column()
  public laikJalanStatus:boolean

  @column()
  public laikJalanDiijinkanOperasional: JSON

  @column()
  public laikJalanPeringatanPerbaikan:JSON

  @column()
  public tidakLaikJalanStatus:boolean

  @column()
  public tidakLaikJalanTilangOperasional: JSON

  @column()
  public tidakLaikJalanDilarangOperasional:JSON

  @column()
  public catatan:string

  @column()
  public nipPenguji:string

  @column()
  public namaPenguji:string

  @column()
  public nipPenyidik:string

  @column()
  public namaPenyidik:string

  @column()
  public status:string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(pemeriksaan: Pemeriksaan){
    pemeriksaan.uuid = uuid()
  }

  @belongsTo(()=> Permohonan,{foreignKey:"permohonanUuid",localKey:"uuid"})
  public permohonan: BelongsTo<typeof Permohonan>
}

