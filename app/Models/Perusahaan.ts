import { DateTime } from 'luxon'
import {v4 as uuid}from "uuid"
import { BaseModel, column, beforeCreate, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Perusahaan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public direktur:string

  @column()
  public npwp:string

  @column()
  public nib:string

  @column()
  public provinceUuid:string

  @column()
  public regencyUuid:string

  @column()
  public districtUuid:string

  @column()
  public villageUuid:string

  @column()
  public phone:string

  @column()
  public alamat:string

  @column()
  public lat:string

  @column()
  public lng:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUuid(perusahaan:Perusahaan){
    perusahaan.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      name: this.name.toUpperCase(),
      phone: this.phone,
      alamat: this.alamat,
    }
  }
}
