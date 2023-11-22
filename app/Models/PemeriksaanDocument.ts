import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Komponen from './Komponen'

export default class PemeriksaanDocument extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public pemeriksaanUuid: string

  @column()
  public komponenUuid: string

  @column()
  public description: string

  @column()
  public filetype: string

  @column()
  public filename:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(pemeriksaanDocument: PemeriksaanDocument){
    pemeriksaanDocument.uuid = uuid()
  }

  @belongsTo(()=>Komponen,{foreignKey:"komponenUuid", localKey:"uuid"})
  public komponen: BelongsTo<typeof Komponen>
}
