import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Ditributor extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public description:string



  @column()
  public address:string

  @column()
  public provinceCode:string

  @column()
  public regencyCode:string

  @column()
  public districtCode:string

  @column()
  public villageCode:string

  @column()
  public owner:string

  @column()
  public contactPerson:string

  @column()
  public telp:string

  @column()
  public lat:string

  @column()
  public lng:string

  @column()
  public deletedAt:DateTime

  @column()
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(distributor:Ditributor){
    distributor.uuid = uuid()
  }

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      name:this.name,
      description: this.description,
      address: this.address,
      owner: this.owner,
      contact_person: this.contactPerson,
      telp: this.telp,
      lat: this.lat,
      lng: this.lng

    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      name: this.name,
      description: this.description,
      address: this.address,
      province_code: this.provinceCode,
      regency_code: this.regencyCode,
      district_code: this.districtCode,
      village_code: this.villageCode,
      owner:this.owner,
      contact_person: this.contactPerson,
      telp: this.telp,
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
