import { MSG_DELETE_SUCCESS, MSG_ERROR, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang";
import Pengiriman from "App/Models/Pengiriman";

export type PengirimanType={
  kendaraan_uuid:string,
  dari: string,
  tujuan:string,
  jarak:number,
  biaya:number,
  komoditas: string,
  barang: string,
  jumlah:number,
  estimasi_waktu:number,
  tanggal_keberangkatan:string,
  tanggal_kedatangan:string,
  jam_keberangkatan:string,
  jam_kedatangan:string,
  status?:string,
}

class PengirimanService {
  protected Model = Pengiriman
  async lists(){
    const model = await this.Model.query().preload('kendaraan').preload("distributor").preload("pasar").orderBy("tanggalKeberangkatan",'desc')

    const datas:{}[]=[]

    model.forEach(element => {
      const row ={}

      Object.assign(row, element.datadisplay, {nomor: element.kendaraan.nomor},{tujuan: element.pasar.name },{dari: element.distributor.name})

      datas.push(row)
    });

    return datas;
  }

  async store(payload: PengirimanType){
    // try {
      const model = new this.Model
      model.kendaraanUuid = payload.kendaraan_uuid
      model.dari = payload.dari
      model.tujuan = payload.tujuan
      model.jarak = payload.jarak
      model.biaya = payload.biaya
      model.komoditas = payload.komoditas
      model.barang = payload.barang
      model.jumlah = payload.jumlah
      model.estimasiWaktu = payload.estimasi_waktu
      model.tanggalKeberangkatan = payload.tanggal_keberangkatan
      model.tanggalKedatangan = payload.tanggal_kedatangan
      model.jamKeberangkatan = payload.jam_keberangkatan
      model.jamKedatangan = payload.jam_kedatangan
      model.status = payload.status

      await model.save()

      return {
        code:200,
        success:true,
        response:{
          message:MSG_STORE_SUCCESS,
          data: model.datadisplay
        }
      }
    // } catch (error) {
    //   return{
    //     code: 500,
    //     success:false,
    //     message:MSG_ERROR,
    //     errors:error
    //   }
    // }
  }

  async show(id:any){
    const model = await this.Model.findBy("uuid",id)

    return  model?.datarecord
  }

  async update(payload:PengirimanType, id:any){
    try {
      const model = await this.Model.findBy("uuid",id)
      model?.merge({
        kendaraanUuid: payload.kendaraan_uuid,
        dari: payload.dari,
        tujuan: payload.tujuan,
        jarak: payload.jarak,
        biaya: payload.biaya,
        komoditas: payload.komoditas,
        barang: payload.barang,
        jumlah: payload.jumlah,
        estimasiWaktu: payload.estimasi_waktu,
        tanggalKeberangkatan: payload.tanggal_keberangkatan,
        tanggalKedatangan: payload.tanggal_kedatangan,
        jamKeberangkatan: payload.jam_keberangkatan,
        jamKedatangan: payload.jam_kedatangan,
        status: payload.status
      })

      await model?.save()

      return{
        code:200,
        success:true,
        response:{
          message:MSG_UPDATE_SUCCESS,
          data: model?.datadisplay
        }
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_ERROR,
        errors:error
      }
    }
  }

  async delete(id:any){
    try {
      const model = await this.Model.findBy("uuid",id)
      await model?.delete()

      return{
        code:200,
        success:true,
        response:{
          message:MSG_DELETE_SUCCESS,
          data:{id:id}
        }
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_ERROR,
        errors:error
      }
    }
  }
}

export default new PengirimanService
