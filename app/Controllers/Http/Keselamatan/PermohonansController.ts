import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permohonan from 'App/Models/Permohonan';
import Env from "@ioc:Adonis/Core/Env"
import { DateTime } from 'luxon';

export default class PermohonansController {
  public async index({}: HttpContextContract) {
    const permohonans = await Permohonan.query().preload('perusahaan').whereIn('status',['1','2','3']).orderBy('status','asc').orderBy("created_at", 'desc')

    const datas:{}[]=[]

    permohonans.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['noreg']= element.noreg
      row['perusahaan']= element.perusahaan ? element.perusahaan.name : "-"
      row['nomor_surat']= element.nomorSurat
      row['tanggal']= element.tanggalPelaksanaan ? DateTime.fromJSDate( element.tanggalPelaksanaan).toFormat("yyyy/MM/dd") + " "+ element.jamPelaksanaan: "-"
      row['status']= element.status == '0' ? {color:'grey', text:'Draft'} : element.status == '1' ? {color: 'orange', text: 'Pengajuan'} : element.status == '2' ? {color:'blue', text:"Penjadwalan"} : element.status == '3' ? {color:'green', text:'Selesai'} : element.status == '4' ? {color:'orange', text:'Perbaikan'} : {color:'red', text:'Pembatalan'}
      row['aksi']={
        id: element.uuid,
        qr: Env.get("BASE_URL")+"/verify/"+ element.uuid
      }
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params}: HttpContextContract) {
    const {id}= params

    const permohonan = await Permohonan.query().preload("perusahaan").where('uuid', id).first()

    const data ={}

    data['id']= permohonan?.id
    data['uuid']= permohonan?.uuid
    data['noreg']= permohonan?.noreg
    data['tanggal']= permohonan?.tanggal
    data['perusahaan_uuid']= permohonan?.uuid
    data['perusahaan']= permohonan?.perusahaan
    data['perihal']= permohonan?.perihal
    data['keterangan']= permohonan?.keterangan
    data['nomor_surat']= permohonan?.nomorSurat
    data['kontak_person']= permohonan?.kontakPerson
    data['nomor_telepon']= permohonan?.nomorTelpon
    data['tanggal_permohonan']= permohonan?.tanggalPermohonan ? DateTime.fromJSDate(permohonan?.tanggalPermohonan).toFormat("yyyy-MM-dd"):null
    data['jam_permohonan']= permohonan?.jamPermohonan ? permohonan.jamPermohonan :null
    data['tanggal_pemeriksaan']= permohonan?.tanggalPelaksanaan ? DateTime.fromJSDate(permohonan.tanggalPermohonan).toFormat("yyyy-MM-dd"):null
    data['jam_pemeriksaan']= permohonan?.jamPelaksanaan ? permohonan.jamPelaksanaan : null
    data['lokasi']= permohonan?.lokasi
    data['alamat_pemeriksaan']= permohonan?.alamatPemeriksaan
    data['file_surat']= permohonan?.fileSurat
    data['status']= permohonan?.status
    return data;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {tanggal_pelaksaan, jam_pelaksanaan}= request.all()


    try {
      const permohonan = await Permohonan.findBy("uuid",id)
      permohonan?.merge({tanggalPelaksanaan: tanggal_pelaksaan, jamPelaksanaan:jam_pelaksanaan})
      await permohonan?.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          status:true,
          message:"Proses tindak lanjut permohonan berhasil"
        },
        errors:[],
      })

    } catch (error) {
      return response.status(501).json({
        success:false,
        code:501,
        response:{},
        errors:error
      })
    }
  }

  public async setstatus({params, request, response}:HttpContextContract){
    const {id}= params
    const {status}= request.all()

    try {
      const permohonan = await Permohonan.findBy("uuid", id)
      permohonan?.merge({status: status})
      await permohonan?.save()

      return response.json({
        success:true,
        code:200,
        response:{
          message:"Proses perubahan status berhasil"
        },
        errors:[]
      })

    } catch (error) {
      return response.status(500).json({
        success:false,
        errors:error
      })
    }
  }

  public async destroy({}: HttpContextContract) {}
}
