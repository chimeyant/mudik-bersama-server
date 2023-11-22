import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, column, beforeCreate, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Document extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public filename:string

  @column()
  public publish: boolean

  @column()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(document:Document){
    document.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return {
      id: this.uuid,
      name:this.name,
      description: this.description,
      publish: this.publish ? {color:'green', text:'publish'}:{color:'red',text:'un publish'},
    }
  }

  public get datarecord(){
    return {
      id: this.uuid,
      name: this.name,
      description: this.description,
      filename: this.filename,
      publish: this.publish,
    }
  }
}
