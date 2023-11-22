import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column, beforeCreate, computed, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import JenisPengaduan from './JenisPengaduan'

export default class Pengaduan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public userId:string

  @column()
  public jenisPengaduanUuid:string

  @column()
  public title:string

  @column()
  public content:string

  @column()
  public lat:string

  @column()
  public lng:string

  @column()
  public fotoAwal:string

  @column()
  public verifiedAt:DateTime

  @column()
  public verifiedUserId:string

  @column()
  public tindakLanjutAt:DateTime

  @column()
  public tindakLanjutUserUuid:string

  @column()
  public fotoAkhir:string

  @column()
  public status:string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(pengaduan: Pengaduan){
    pengaduan.uuid = uuid()
  }

  @computed()
  public get statusDisplay(){
    return this.status == '1' ? {color:'grey', text: "Laporan Baru"} : this.status == '2' ? {color:'orange', text:"Dalam Penanganan"} : {color:'green', text:"Selesai"}
  }

  @belongsTo(()=> User,{foreignKey:"userId", localKey:"id"})
  public user:BelongsTo<typeof User>

  @belongsTo(()=>JenisPengaduan,{foreignKey:"jenisPengaduanUuid", localKey:"uuid"})
  public jenispengaduan:BelongsTo<typeof JenisPengaduan>

  @computed()
  public get dataview(){
    return {
      id: this.uuid,
      content: this.content,
      lat: this.lat,
      lng: this.lng,
      status: this.status == '1' ? {color:'grey', text: "Laporan Baru"} : this.status == '2' ? {color:'orange', text:"Dalam Penanganan"} : {color:'green', text:"Selesai"}
    }
  }

  @computed()
  public get datarecord(){
    return {
      id: this.uuid,
      jenis_pengaduan_uuid: this.jenisPengaduanUuid,
      title: this.title,
      content: this.content,
      lat: this.lat,
      lng: this.lng,
      foto_awal: this.fotoAwal
    }
  }

}
