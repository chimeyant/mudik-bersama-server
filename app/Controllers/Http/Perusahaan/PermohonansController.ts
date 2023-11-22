import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permohonan from 'App/Models/Permohonan'
import PermohonanValidator from 'App/Validators/Perusahan/PermohonanValidator'
import { DateTime } from 'luxon'
import Whatsapp from 'App/Helpers/Whatsapp'

export default class PermohonansController {
  public async index({auth}: HttpContextContract) {
    const user = await auth.user



    const permohonans = await Permohonan.query().where('perusahaan_uuid', user?.perusahaanUuid).orderBy("created_at", 'desc')

    const datas:{}[]=[]

    permohonans.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['noreg']= element.noreg
      row['nomor_surat']= element.nomorSurat
      row['tanggal']= element.tanggalPelaksanaan ? DateTime.fromJSDate(element.tanggalPelaksanaan).toFormat("yyyy/MM/dd") + " "+ element.jamPelaksanaan : "-"
      row['status']= element.status == '0' ? {color:'grey', text:'Draft'} : element.status == '1' ? {color: 'orange', text: 'Pengajuan'} : element.status == '2' ? {color:'blue', text:"Penjadwalan"} : element.status == '3' ? {color:'green', text:'Selesai'} : element.status == '4' ? {color:'orange', text:'Perbaikan'} : {color:'red', text:'Pembatalan'}
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response, auth}: HttpContextContract) {
    const user = await auth.user
    const {perihal, keterangan, nomor_surat, kontak_person, nomor_telpon, tanggal_permohonan, jam_permohonan,  lokasi, alamat_pemeriksaan, lat,lng, file_surat}= request.all()



    await request.validate(PermohonanValidator)

    try {
      const permohonan = new Permohonan
      permohonan.perusahaanUuid = user?.perusahaanUuid
      permohonan.perihal = perihal
      permohonan.keterangan = keterangan
      permohonan.nomorSurat = nomor_surat
      permohonan.kontakPerson = kontak_person
      permohonan.nomorTelpon= nomor_telpon
      permohonan.tanggalPermohonan = tanggal_permohonan
      permohonan.jamPermohonan = jam_permohonan
      permohonan.lokasi = lokasi
      permohonan.alamatPemeriksaan = alamat_pemeriksaan
      permohonan.fileSurat = file_surat
      permohonan.status ='0';
      await permohonan.save()


      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses simpan berhasil",
        response:{
          status:true,
          message:"Proses pembuatan surat permohonan berhasil"
        },
        errors:[],
      })

    } catch (error) {
      return response.status(501).json({
        success:false,
        code:501,
        message:"Opps..., terjadi kesalahan ",
        response:{},
        errors:error
      })
    }


  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const permohonan = await Permohonan.findBy("uuid", id)

    const data ={}
    data['id']= permohonan?.uuid
    data['perihal']= permohonan?.perihal
    data['keterangan']= permohonan?.keterangan
    data['nomor_surat']= permohonan?.nomorSurat
    data['kontak_person']= permohonan?.kontakPerson
    data['nomor_telpon']= permohonan?.nomorTelpon
    data['tanggal_permohonan']= DateTime.fromJSDate(permohonan?.tanggalPermohonan).toFormat("yyyy-MM-dd");
    data['jam_permohonan']= permohonan?.jamPermohonan
    data['lokasi']= permohonan?.lokasi
    data['alamat_pemeriksaan']= permohonan?.alamatPemeriksaan
    data['file_surat']= permohonan?.fileSurat

    return data;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params

    const {perihal, keterangan, nomor_surat, kontak_person, nomor_telpon, tanggal_permohonan, jam_permohonan,  lokasi, alamat_pemeriksaan, file_surat}= request.all()

    await request.validate(PermohonanValidator)

    try {
      const permohonan = await Permohonan.findBy("uuid",id)
      if(Number(permohonan?.status) > 1){
        return response.json({
          success:true,
          code:500,
          response:{
            message: "Data telah dikunci...!"
          }
        })
      }
      permohonan?.merge({perihal:perihal, keterangan:keterangan, nomorSurat:nomor_surat, kontakPerson:kontak_person, nomorTelpon:nomor_telpon, tanggalPermohonan:tanggal_permohonan, jamPermohonan:jam_permohonan, lokasi:lokasi, alamatPemeriksaan:alamat_pemeriksaan, fileSurat:file_surat})
      await permohonan?.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          status:true,
          message:"Proses ubah surat permohonan berhasil"
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

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const permohonan = await Permohonan.findBy("uuid",id)

      if(Number(permohonan?.status) > 0){
        return response.status(200).json({
          success:false,
          code:200,
          response:{
            status:false,
            message:"Opps..., permohonan telah dikunci, silahkan lakukan pembatalan"
          },
          errors:[]
        })
      }

      await permohonan?.delete()
      return response.json({
        success:true,
        code:200,
        response:{
          status:true,
          message:"Proses hapus data berhasil..!"
        },
        errors:[]
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

  public async kirimpermohonan({request, response,auth }:HttpContextContract){
    const {id}= request.all()
    const user = auth.user

    const noreg = await this.getnoreg()

    try {
      const permohonan = await Permohonan.findBy('uuid', id)
      if (permohonan?.noreg != null){
        return response.status(200).json({
          success:false,
          code:200,
          response:{
            status:false,
            message:"Permohonan sudah dalam tahapan pengajuan"
          }
        })
      }
      permohonan?.merge({noreg: noreg, tanggal:new Date(), status:'1' })
      await permohonan?.save()

      //kirim pesan whatsapp
      const pesan = "*SINIKMAT LANTAS* \r\n `Nikmati Layanan Nyaman Bersama DISHUB Kab. Tangerang` \r\n\r\nHalo... \r\n"+ user?.name.toUpperCase() + "\r\n\r\nTerimakasih, Permohonan anda akan segera kami proses, silahkan menunggu informasi tahapan selanjutnya  \r\n\r\nSalam, \r\n\r\nSINIKMAT LANTAS \r\nKabupaten Tangerang"

      await Whatsapp.sendMessage(user?.phone, pesan)

      return response.status(200).json({
        success:true,
        code : 200,
        response: {
          message:"Proses permohonan berhasil dikirim"
        }
      })
    } catch (error) {
      return response.json({
        success:false,
        code:501,
        response:{},
        errors:error
      })
    }
  }

  public async batalkanpermohonan({request, response}:HttpContextContract){
    const {id}= request.all()

    try {
      const permohonan = await Permohonan.findBy("uuid",id)
      permohonan?.merge({status:'5'})
      await permohonan?.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          status:true,
          message:"Proses pembatalan permohonan berhasil..!"
        },
        errors:[]
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

  public async getnoreg(){
    const sekarang = new Date();

    const tahun = sekarang.getFullYear()
    const bulan = sekarang.getMonth() + 1

    const tahunbulan  = tahun + "-" + bulan +"%"

    const permohonan = await Permohonan.query().select('noreg').where('tanggal', "like" , tahunbulan).orderBy('id','desc').first()

    const tnoreg = permohonan?.noreg ? permohonan.noreg :null
    const lnoreg = tnoreg ? tnoreg?.substring(18,12) : null
    const nnoreg = lnoreg ? Number(lnoreg) + 1 : 1
    const snoreg = nnoreg ?  nnoreg.toString(): "1"


    let noreg:string="";

    if(nnoreg==1){
      noreg = "REG-"+ tahun +"."+ bulan + ".00001"
    }else{
      if(snoreg.length == 1){
        noreg = "REG-"+ tahun +"."+ bulan + ".0000" + nnoreg
      }
      if(snoreg.length == 2){
        noreg = "REG-"+ tahun +"."+ bulan + ".000" + nnoreg
      }
      if(snoreg.length == 3){
        noreg = "REG-"+ tahun +"."+ bulan + ".00" + nnoreg
      }
      if(snoreg.length == 4){
        noreg = "REG-"+ tahun +"."+ bulan + ".0" + nnoreg
      }
      if(snoreg.length == 5){
        noreg = "REG-"+ tahun +"."+ bulan + "." + nnoreg
      }
    }

    return noreg

  }
}
