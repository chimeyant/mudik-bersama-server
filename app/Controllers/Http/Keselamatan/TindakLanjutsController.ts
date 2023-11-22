import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permohonan from 'App/Models/Permohonan'
import TindakLanjutValidator from 'App/Validators/Keselamatan/TindakLanjutValidator'
import { DateTime } from 'luxon'
import Drive from '@ioc:Adonis/Core/Drive'
import Env from "@ioc:Adonis/Core/Env"
import Whatsapp from 'App/Helpers/Whatsapp'

export default class TindakLanjutsController {
  public async index({params}: HttpContextContract) {
    const {uuid}= params

    const permohonan = await Permohonan.query().preload("perusahaan").where('uuid', uuid).first()

    const data = {}
    data['id']= permohonan?.uuid
    data['uuid']= permohonan?.uuid
    data['noreg']= permohonan?.noreg
    data['tanggal']= permohonan?.tanggal
    data['perusahaan_uuid']=permohonan?.perusahaanUuid
    data['perusahaan']= permohonan?.perusahaan
    data['perihal']= permohonan?.perihal
    data['keterangan']= permohonan?.keterangan
    data['nomor_surat']= permohonan?.nomorSurat
    data['kontak_person']= permohonan?.kontakPerson
    data['nomor_telpon']= permohonan?.nomorTelpon
    data['tanggal_permohonan']= permohonan?.tanggalPermohonan ? DateTime.fromJSDate(permohonan.tanggalPermohonan).toFormat("yyyy-MM-dd"):null
    data['jam_permohonan']= permohonan?.jamPermohonan
    data['tanggal_pelaksanaan']= permohonan?.tanggalPelaksanaan ? DateTime.fromJSDate(permohonan.tanggalPelaksanaan).toFormat("yyyy-MM-dd"):null
    data['jam_pelaksanaan'] = permohonan?.jamPelaksanaan
    data['lokasi']= permohonan?.lokasi
    data['alamat_pemeriksaan']= permohonan?.alamatPemeriksaan
    data['status']= permohonan?.status
    data['status_view']= permohonan?.status == '1' ? {color:'orange', text:"Pengajuan"} : permohonan?.status=='2' ? {color:'blue', text:"Penjadwalan"} : {color:'red', text:'NA'}

    return data;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {
  }

  public async show({params}: HttpContextContract) {
    const {uuid}= params

    const permohonan = await Permohonan.query().preload("perusahaan").where('uuid', uuid).first()

    const data = {}
    data['id']= permohonan?.uuid
    data['uuid']= permohonan?.uuid
    data['noreg']= permohonan?.noreg
    data['tanggal']= permohonan?.tanggal
    data['perusahaan_uuid']=permohonan?.perusahaanUuid
    data['perusahaan']= permohonan?.perusahaan
    data['perihal']= permohonan?.perihal
    data['keterangan']= permohonan?.keterangan
    data['nomor_surat']= permohonan?.nomorSurat
    data['kontak_person']= permohonan?.kontakPerson
    data['nomor_telpon']= permohonan?.nomorTelpon
    data['tanggal_permohonan']= permohonan?.tanggalPermohonan ? DateTime.fromJSDate(permohonan.tanggalPermohonan).toFormat("yyyy-MM-dd"):null
    data['jam_permohonan']= permohonan?.jamPermohonan
    data['tanggal_pelaksanaan']= permohonan?.tanggalPelaksanaan ? DateTime.fromJSDate(permohonan.tanggalPermohonan).toFormat("yyyy-MM-dd"):null
    data['jam_pelaksanaan'] = permohonan?.jamPelaksanaan
    data['lokasi']= permohonan?.lokasi
    data['alamat_pemeriksaan']= permohonan?.alamatPemeriksaan
    data['status']= permohonan?.status
    data['status_view']= permohonan?.status == '1' ? {color:'orange', text:"Pengajuan"} : permohonan?.status=='2' ? {color:'blue', text:"Penjadwalan"} : {color:'red', text:'NA'}

    return data;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request, response}: HttpContextContract) {
    const { id}= params

    const {tanggal_pelaksanaan, jam_pelaksanaan, lokasi, alamat_pemeriksaan, status} = request.all()

    await request.validate(TindakLanjutValidator)

    try {
      const permohonan = await Permohonan.findBy("uuid", id)

      permohonan?.merge({tanggalPelaksanaan: tanggal_pelaksanaan, jamPelaksanaan:jam_pelaksanaan, lokasi:lokasi, alamatPemeriksaan: alamat_pemeriksaan, status:status})
      await permohonan?.save()

      //beri pemberitahuan lewat whatsapp
      const pesan = "*SINIKMAT LANTAS* \r\n `Nikmati Layanan Nyaman Bersama DISHUB Kab. Tangerang` \r\n\r\nPemberitahuan \r\nUntuk Pemeriksaan Rampcheck yang  anda permohonkan  akan dilaksanakan pada tanggal "+  DateTime.fromSQL(permohonan?.tanggalPelaksanaan).toFormat("dd/MM/yyyy") + " Jam : " + permohonan?.jamPelaksanaan +" WIB Di Kantor Dinas Perhubungan Kab. Tangerang" +"\r\n\r\n \r\n\r\nSalam, \r\n\r\nSINIKMAT LANTAS \r\nKabupaten Tangerang"

      await Whatsapp.sendMessage(permohonan?.nomorTelpon, pesan)

      return response.json({
        success: true,
        code:200,
        message: "Proses tindak lanjut berhasil..!",
      })
    } catch (error) {
      return response.json({
        success:false,
        code:501,
        message:"Opps..., terjadi kesalahan..!"
      })
    }
  }

  public async destroy({}: HttpContextContract) {}

  public async downloadPermohonan({request, response}:HttpContextContract){
    const {id} = request.all()

    try {
      const permohonan = await Permohonan.findBy("uuid", id)

      const url =  await Drive.getSignedUrl("documents/"+ permohonan?.fileSurat)

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"success",
          url: Env.get("BASE_URL")+ url
        },
        erros:[]
      })
    } catch (error) {

    }
  }
}
