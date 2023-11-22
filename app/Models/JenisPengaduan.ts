import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, column, beforeCreate, computed } from '@ioc:Adonis/Lucid/Orm'

export default class JenisPengaduan extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public kode:string

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public status:boolean

  @column()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(jenispengaduan: JenisPengaduan){
    jenispengaduan.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return {
      id:this.uuid,
      name:this.name,
      kode:this.kode,
      description: this.description,
      status:this.status ? {color:'green', text: 'AKTIF'} : {color:'red', text:"TIDAK AKTIF"}
    }
  }

  public get datarecord(){
    return {
      id: this.uuid,
      name: this.name,
      kode:this.kode,
      description:this.description,
      status: this.status
    }
  }
}
