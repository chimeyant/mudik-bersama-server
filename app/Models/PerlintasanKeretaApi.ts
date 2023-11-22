import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class PerlintasanKeretaApi extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

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
  public doorstop:boolean

  @column()
  public status:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(perlintasanKeretaApi: PerlintasanKeretaApi){
    perlintasanKeretaApi.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return {
      id: this.uuid,
      name: this.name,
      address: this.address,
      doorstop: this.doorstop? {color:'green', text: 'Ada'}: {color:'red', text:"Tidak Ada"}
    }
  }

  @computed()
  public get datarecord(){
    return {
      id: this.uuid,
      name: this.name,
      district_uuid: this.districtUuid,
      village_uuid: this.villageUuid,
      address: this.address,
      lat: this.lat,
      lng: this.lng,
      doorstop: this.doorstop,
    }
  }
}
