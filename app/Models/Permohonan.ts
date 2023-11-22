import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column , beforeCreate, belongsTo,BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import Perusahaan from './Perusahaan'

export default class Permohonan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public noreg:string

  @column()
  public tanggal:Date

  @column()
  public perusahaanUuid:string

  @column()
  public perihal:string

  @column()
  public keterangan:string

  @column()
  public nomorSurat:string

  @column()
  public kontakPerson:string

  @column()
  public nomorTelpon:string


  @column()
  public tanggalPermohonan:Date

  @column()
  public jamPermohonan:string

  @column()
  public tanggalPelaksanaan:Date

  @column()
  public jamPelaksanaan:string

  @column()
  public lokasi:string

  @column()
  public alamatPemeriksaan:string

  @column()
  public fileSurat:string

  @column()
  public status:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(permohonan:Permohonan){
    permohonan.uuid = uuid()
  }

  @belongsTo(()=> Perusahaan,{foreignKey:"perusahaanUuid", localKey:'uuid'})
  public perusahaan: BelongsTo<typeof Perusahaan>
}
