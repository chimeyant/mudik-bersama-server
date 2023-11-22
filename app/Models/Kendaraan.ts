import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Perusahaan from './Perusahaan'

export default class Kendaraan extends compose(BaseModel, SoftDeletes ){
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public perusahaanUuid:string

  @column()
  public name:string


  @column()
  public jenis:string

  @column()
  public nomor:string

  @column()
  public supir:string

  @column()
  public telp:string

  @column()
  public status:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(kendaraan:Kendaraan){
    kendaraan.uuid = uuid()
  }

  @belongsTo(()=> Perusahaan, {foreignKey:"perusahaanUuid", localKey:"uuid"})
  public perusahaan: BelongsTo<typeof Perusahaan>

  @computed()
  public get datadisplay(){
    return{
      id: this.uuid,
      name: this.name,
      jenis: this.jenis,
      nomor: this.nomor,
      supir: this.supir,
      telp: this.telp,
      status: this.status ? {color: 'green', text:"Tersedia"}:{color: 'red', text:"Tidak Tersedia"}
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      name: this.name,
      jenis: this.jenis,
      nomor: this.nomor,
      supir: this.supir,
      telp: this.telp,
      status: this.status,
    }
  }

  @computed()
  public get combo(){
    return{
      value: this.uuid,
      text: this.name + " | "+ this.nomor
    }
  }


}
