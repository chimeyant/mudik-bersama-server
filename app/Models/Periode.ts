import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Periode extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public status:boolean

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(periode:Periode){
    periode.uuid  = uuid()
  }

  @computed()
  public get dataview(){
    return{
      id:this.uuid,
      name: this.name,
      description: this.description,
      status: this.status ? {color:'green',text:'Aktif'}:{color:'red',text:"Tidak Aktif"}
    }
  }

  @computed()
  public get datarecord(){
    return {
      id: this.uuid,
      name: this.name,
      description: this.description,
      status: this.status
    }
  }

}
