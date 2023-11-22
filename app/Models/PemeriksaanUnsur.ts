import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class PemeriksaanUnsur extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public pemeriksaanUuid:string

  @column()
  public kartuUjiStukIjin:String

  @column()
  public kartuUjiStukTilang:String

  @column()
  public kpRegulerIjin:String

  @column()
  public kpRegulerTilang:String

  @column()
  public kpCadanganIjin: String

  @column()
  public kpCadanganTilang:String

  @column()
  public simPengemudiIjin: String

  @column()
  public simPengemudiTilang:String

  @column()
  public lampuUtamaDekatIjin:String

  @column()
  public lampuUtamaDekatTilang:String

  @column()
  public lampuUtamaJauhIjin:String

  @column()
  public lampuUtamaJauhTilang:String

  @column()
  public lampuSienDepanIjin:String

  @column()
  public lampuSienDepanTilang:String

  @column()
  public lampuSienBelakangIjin:String

  @column()
  public lampuSienBelakangTilang:String

  @column()
  public lampuRemIjin:String

  @column()
  public lampuRemTilang:String

  @column()
  public lampuMundurIjin:String

  @column()
  public lampuMundurTilang:String

  @column()
  public kondisiRemUtamaIjin:String

  @column()
  public kondisiRemUtamaTilang:String

  @column()
  public kondisiRemParkirIjin:String

  @column()
  public kondisiRemParkirTilang:String

  @column()
  public kondisiKacaDepanIjin:String

  @column()
  public kondisiKacaDepanTilang:String

  @column()
  public pintuUtamaIjin:String

  @column()
  public pintuUtamaTilang:String

  @column()
  public kondisiBanDepanIjin:String

  @column()
  public kondisiBanDepanTilang:String

  @column()
  public kondisiBanBelakangIjin:String

  @column()
  public kondisiBanBelakangTilang:String

  @column()
  public sabukPengamanIjin:String

  @column()
  public sabukPengamanTilang:String

  @column()
  public pengukurKecepatanIjin:String

  @column()
  public pengukurKecepatanTilang:String

  @column()
  public penghapusKacaIjin:String

  @column()
  public penghapusKacaTilang:String

  @column()
  public pintuDaruratIjin:String

  @column()
  public pintuDaruratTilang:String

  @column()
  public jendelaDaruratIjin:String

  @column()
  public jendelaDaruratTilang:String

  @column()
  public alatPemecahKacaIjin:String

  @column()
  public alatPemecahKacaTilang:String

  @column()
  public lampuPosisiDepanIjin:String

  @column()
  public lampuPosisiDepanTilang:String

  @column()
  public lampuPosisiBelakangIjin:String

  @column()
  public lampuPosisiBelakangTilang:String

  @column()
  public kacaSpionIjin:String

  @column()
  public kacaSpionTilang:String

  @column()
  public klaksonIjin:String

  @column()
  public klaksonTilang:String

  @column()
  public lantaiTanggaIjin:String

  @column()
  public lantaiTanggaTilang:String

  @column()
  public jlhTempatDudukIjin:String

  @column()
  public jlhTempatDudukTilang:String

  @column()
  public banCadanganIjin:String

  @column()
  public banCadanganTilang:String

  @column()
  public segitigaPengamanIjin:String

  @column()
  public segitigaPengamanTilang:String

  @column()
  public dongkrakIjin:String

  @column()
  public dongkrakTilang:String

  @column()
  public pembukaRodaIjin:String

  @column()
  public pembukaRodaTilang:String

  @column()
  public lampuSenterIjin:String

  @column()
  public lampuSenterTilang:String

  @column()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(pemeriksaanUnsur : PemeriksaanUnsur){
    pemeriksaanUnsur.uuid = uuid()
  }
}
