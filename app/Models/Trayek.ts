import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Trayek extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: String

  @column()
  public name: String

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(trayek: Trayek){
    trayek.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return {
      id: this.uuid,
      name: this.name,
      status: this.status ? {color:'green', text:'Aktif'} : {color:'red', text: "Tidak Aktif"}
    }
  }

  @computed()
  public get record(){
    return {
      id: this.uuid,
      name: this.name,
      status: this.status
    }
  }

  @computed()
  public get getCombo(){
    return {
      text: this.name,
      value: this.uuid,
    }
  }


}
