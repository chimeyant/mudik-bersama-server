import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Kegiatan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public programUuid:string

  @column()
  public name:string

  @column()
  public indikator:string

  @column()
  public penanggungJawab: string

  @column()
  public pendukung:string

  @column()
  public pendanaan:string

  @column()
  public nourut: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(kegiatan:Kegiatan){
    kegiatan.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return{
      id:this.uuid,
      name:this.name,
      indikator:this.indikator,
    }
  }

  @computed()
  public get record(){
    return {
      id:this.uuid,
      name:this.name,
      indikator:this.indikator,
      penanggung_jawab: JSON.parse(this.penanggungJawab),
      pendukung: JSON.parse(this.pendukung),
      pendanaan:this.pendanaan,
      nourut:this.nourut
    }
  }
}
