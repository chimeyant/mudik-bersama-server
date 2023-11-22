import { DateTime } from 'luxon'
import {compose} from "@ioc:Adonis/Core/Helpers"
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {v4 as uuid} from "uuid"
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Kendaraan from './Kendaraan'
import Ditributor from './Ditributor'
import Pasar from './Pasar'

export default class Pengiriman extends compose(BaseModel,SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public kendaraanUuid:string

  @column()
  public dari:string

  @column()
  public tujuan:string

  @column()
  public koordinatAwal:string

  @column()
  public koordinatAkhir:string

  @column()
  public jarak:number

  @column()
  public estimasiWaktu:number

  @column()
  public biaya: number

  @column()
  public komoditas:string

  @column()
  public barang:string

  @column()
  public jumlah:number

  @column()
  public tanggalKeberangkatan: String

  @column()
  public tanggalKedatangan:String

  @column()
  public jamKeberangkatan:string

  @column()
  public jamKedatangan:string

  @column()
  public status:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(pengiriman:Pengiriman){
    pengiriman.uuid = uuid()
  }

  @belongsTo(()=> Kendaraan,{foreignKey:"kendaraanUuid", localKey:"uuid"})
  public kendaraan: BelongsTo<typeof Kendaraan>

  @belongsTo(()=> Ditributor,{foreignKey:"dari", localKey:"uuid"})
  public distributor: BelongsTo<typeof Ditributor>

  @belongsTo(()=> Pasar, {foreignKey:'tujuan', localKey:"uuid"})
  public pasar: BelongsTo<typeof Pasar>

  @computed()
  public get datadisplay(){
    return{
      id:this.uuid,
      tanggal:DateTime.fromJSDate(this.tanggalKeberangkatan).toFormat("dd/MM/yyyy") ,
      dari: this.dari,
      tujuan: this.tujuan,
      jarak: this.jarak,
      biaya: this.biaya,
      komoditas: this.komoditas,
      barang: this.barang,
      jumlah: this.jumlah,
      lokasi: this.dari + " Ke "+ this.tujuan
    }
  }

  @computed()
  public get datarecord(){
    return{
      id: this.uuid,
      kendaraan_uuid: this.kendaraanUuid,
      dari: this.dari,
      tujuan: this.tujuan,
      koordinat_awal: this.koordinatAwal,
      koordinat_akhir: this.koordinatAkhir,
      jarak: this.jarak,
      estimasi_waktu: this.estimasiWaktu,
      biaya: this.biaya,
      komoditas: this.komoditas,
      barang:this.barang,
      jumlah: this.jumlah,
    }
  }
}
