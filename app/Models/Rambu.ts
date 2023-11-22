import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, column, beforeCreate, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Rambu extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public jenisRambuId:number

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public icon:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(rambu:Rambu){
    rambu.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return {
      id:this.uuid,
      name:this.name,
      jenis_rambu_id: this.jenisRambuId,
      description: this.description,
      icon: this.icon
    }
  }
}
