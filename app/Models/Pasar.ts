import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Pasar extends compose(BaseModel,SoftDeletes ){
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public type:string

  @column()
  public name: string

  @column()
  public description:string

  @column()
  public provinceUuid:string

  @column()
  public regencyUuid:string

  @column()
  public districtUuid:string

  @column()
  public villageUuid:string

  @column()
  public address:string

  @column()
  public lat:string

  @column()
  public lng:string

  @column()
  public img:string

  @column()
  public status:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(pasar:Pasar){
    pasar.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      name: this.name,
      description: this.description,
      address: this.address,
      status: this.status ? {color:'green',text:"Aktif"}:{color:'red', text:"Tidak Aktif"}
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      type: this.type,
      name: this.name,
      description: this.description,
      status: this.status,
      province_uuid: this.provinceUuid,
      regency_uuid:this.regencyUuid,
      district_uuid: this.districtUuid,
      village_uuid:this.villageUuid,
      address:this.address,
      lat: this.lat,
      lng: this.lng
    }
  }

  @computed()
  public get combo(){
    return{
      value: this.uuid,
      text: this.name
    }
  }
}
