import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { BaseModel, column, beforeCreate, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Pejabat extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public nip:string

  @column()
  public gol:string

  @column()
  public pangkat:string

  @column()
  public nohp: string

  @column()
  public wainfo: boolean

  @column()
  public status:boolean

  @column()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(pejabat:Pejabat){
    pejabat.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return {
      id: this.uuid,
      nip: this.nip,
      name: this.name,
      gol: this.gol
    }
  }

  public get datarecord(){
    return {
      id: this.uuid,
      nip: this.nip,
      name: this.name,
      gol:this.gol,
      pangkat: this.pangkat,
      nohp: this.nohp,
      wainfo: this.wainfo,
      status: this.status,
    }
  }
}
