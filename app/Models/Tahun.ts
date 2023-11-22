import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Periode from './Periode'

export default class Tahun extends compose( BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public periodeUuid:string

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(tahun:Tahun){
    tahun.uuid = uuid()
  }

  @belongsTo(()=> Periode,{foreignKey:"periodeUuid",localKey:"uuid"})
  public periode:BelongsTo<typeof Periode>

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      periode: this.periode.name,
      name: this.name,
      description: this.description
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      periode_uuid: this.periodeUuid,
      name: this.name,
      description: this.description,
    }
  }


}
