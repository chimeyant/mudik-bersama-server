import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class Po extends compose(BaseModel) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public address:string

  @column()
  public lat:string

  @column()
  public lng:string

  @column()
  public status:boolean

  @column()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(po:Po){
    po.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return {
      id:this.uuid,
      name: this.name,
      address:this.address,
      lat:this.lat,
      lng:this.lng,
      status: this.status ? {color:'green', text:"Aktif"}:{color:'red', text:"Tidak Aktif"}
    }
  }

  @computed()
  public get datarecord(){
    return {
      id:this.uuid,
      name: this.name,
      address:this.address,
      lat:this.lat,
      lng: this.lng,
      status: this.status,
    }
  }

}
