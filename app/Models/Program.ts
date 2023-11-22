import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Program extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public pilarUuid: string

  @column()
  public name:string

  @column()
  public nourut:number

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(program:Program){
    program.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return {
      id: this.uuid,
      name:this.name
    }
  }

  @computed()
  public get record(){
    return {
      id:this.uuid,
      name:this.name,
      nourut: this.nourut
    }
  }
}
