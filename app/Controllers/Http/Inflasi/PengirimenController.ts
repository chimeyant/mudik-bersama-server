import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PengirimanService from 'App/Services/Inflasi/PengirimanService'

export default class PengirimenController {
  protected Service = PengirimanService

  public async index({}: HttpContextContract) {
    const result = await this.Service.lists()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {kendaraan_uuid, dari, tujuan, jarak,estimasi_waktu, biaya, komoditas, barang,jumlah,tanggal_keberangkatan, tanggal_kedatangan,jam_keberangkatan, jam_kedatangan}= request.all()

    const payload={
      kendaraan_uuid: kendaraan_uuid,
      dari: dari,
      tujuan:tujuan,
      jarak: jarak,
      biaya: biaya,
      komoditas: komoditas,
      barang: barang,
      jumlah: jumlah,
      estimasi_waktu: estimasi_waktu,
      tanggal_keberangkatan: tanggal_keberangkatan,
      tanggal_kedatangan: tanggal_kedatangan,
      jam_keberangkatan: jam_keberangkatan,
      jam_kedatangan: jam_kedatangan,
      status:'0'
    }

    const result = await this.Service.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {

    const result = await this.Service.show(params.id)

    return  result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {kendaraan_uuid, dari, tujuan, jarak,estimasi_waktu, biaya, komoditas, barang,jumlah,tanggal_keberangkatan, tanggal_kedatangan,jam_keberangkatan, jam_kedatangan}= request.all()

    const payload={
      kendaraan_uuid: kendaraan_uuid,
      dari: dari,
      tujuan:tujuan,
      jarak: jarak,
      biaya: biaya,
      komoditas: komoditas,
      barang: barang,
      jumlah: jumlah,
      estimasi_waktu: estimasi_waktu,
      tanggal_keberangkatan: tanggal_keberangkatan,
      tanggal_kedatangan: tanggal_kedatangan,
      jam_keberangkatan: jam_keberangkatan,
      jam_kedatangan: jam_kedatangan,
      status:'0'
    }

    const result = await this.Service.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({params, response}: HttpContextContract) {

    const result = await this.Service.delete(params.id)

    return response.status(result.code).send(result)
  }
}
