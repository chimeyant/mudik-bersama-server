import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class KendaraanOperational extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public jenisKendaraanOperationalUuid:string

  @column()
  public name:string

  @column()
  public nopol:string

  @column()
  public kondisi:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(kendaraanoperational:KendaraanOperational){
    kendaraanoperational.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return{
      id:this.uuid,
      name: this.name,
      nopol:this.nopol,
      kondisi: this.kondisi == 'baik' ? {color:'green', text:'Baik'}: {color:'red',text:"Rusak"}
    }
  }

  @computed()
  public get datarecord(){
    return {
      id: this.uuid,
      name:this.name,
      jenis_kendaraan_operational_uuid: this.jenisKendaraanOperationalUuid,
      nopol:this.nopol,
      kondisi: this.kondisi
    }
  }
}
