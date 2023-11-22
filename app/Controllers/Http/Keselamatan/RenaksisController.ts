import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Renaksi from 'App/Models/Renaksi'

export default class RenaksisController {
  public async index({auth}: HttpContextContract) {
    const user =  auth.user

    if(user?.authent== 'opd'){
      const renaksis = await Renaksi.query().preload('periode').preload('tahun').preload('opd').preload('pilar').preload("program").preload('kegiatan').where('opd_uuid',user.opdUuid).orderBy("id", 'asc')

      const datas:{}[]=[]

      renaksis.forEach(element => {
        const row={}
        row['id']= element.uuid
        row['opd']= element.opd ? element.opd.name:''
        row['periode']= element.periode ? element.periode.name : "",
        row['tahun']= element.tahun ? element.tahun.name : "",
        row['pilar']= element.pilar ? element.pilar.name :""
        row['program']= element.program ? element.program.name :""
        row['kegiatan']= element.kegiatan ? element.kegiatan.name :""
        row['target']= element.target
        row['persentasi']= element.persentasi < 99 ? {color:'red', value: element.persentasi} : element.persentasi > 100 ? { color: 'blue', value: 100}: { color: 'green', value: element.persentasi}
        datas.push(row)
      });

      return datas;
    }
    else{
      const renaksis = await  Renaksi.query().preload('periode').preload('tahun').preload('opd').preload('pilar').preload("program").preload('kegiatan').orderBy("id", 'asc')

      const datas:{}[]=[]

      renaksis.forEach(element => {
        const row={}
        row['id']= element.uuid
        row['opd']= element.opd.name
        row['pilar']= element.pilar.name
        row['program']= element.program.name
        row['kegiatan']= element.kegiatan.name
        row['tahun']= element.tahun.name
        row['persentasi']= element.persentasi < 99 ? {color:'red', value: element.persentasi} : element.persentasi > 100 ? { color: 'blue', value: 100}: { color: 'green', value: element.persentasi}
        datas.push(row)
      });

      return [];
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response,auth}: HttpContextContract) {
    const user = auth.user
    const {pilar_uuid, program_uuid, kegiatan_uuid, target,persentasi, periode_uuid,tahun_uuid, indikator, satuan, capaian, anggaran, realisasi, sumber}= request.all()

    try {
      const renaksi = new Renaksi
      renaksi.opdUuid = user?.opdUuid
      renaksi.pilarUuid = pilar_uuid
      renaksi.programUuid = program_uuid
      renaksi.tahunUuid = tahun_uuid
      renaksi.kegiatanUuid = kegiatan_uuid
      renaksi.periodeUuid = periode_uuid
      renaksi.persentasi= 0
      renaksi.indikator = indikator
      renaksi.satuan = satuan
      renaksi.capaian = capaian
      renaksi.anggaran = anggaran
      renaksi.realisasi = realisasi
      renaksi.sumber = sumber
      await renaksi.save()

      //const viewrenaksi = await Renaksi.query().preload("periode").preload('opd').preload('pilar').preload("program").preload('kegiatan').where('uuid',renaksi.uuid).first()
      await renaksi.preload('periode')
      await renaksi.preload("tahun")
      await renaksi.preload("opd")
      await renaksi.preload('pilar')
      await renaksi.preload('program')
      await renaksi.preload('kegiatan')

      return response.json({
        success:true,
        response:{
          message:"Proses simpan data berhasil",
          data: renaksi.datadisplay,
        }
      })

    } catch (error) {
      return response.json({
        success:false,
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id} = params

    const renaksi = await Renaksi.findBy("uuid",id)

    const data = {}
    data['id']= renaksi?.uuid
    data['periode_uuid']= renaksi?.periodeUuid
    data['tahun_uuid']= renaksi?.tahunUuid
    data['pilar_uuid']= renaksi?.pilarUuid
    data['program_uuid']= renaksi?.programUuid
    data['kegiatan_uuid']= renaksi?.kegiatanUuid
    data['target']= renaksi?.target
    data['presentasi']= renaksi?.persentasi
    data['indikator']= renaksi?.indikator
    data['satuan']= renaksi?.satuan
    data['capaian']= renaksi?.capaian
    data['anggaran']= renaksi?.anggaran
    data['realisasi']= renaksi?.realisasi
    data['sumber']= renaksi?.sumber

    return data;
  }

  public async edit({}: HttpContextContract) {
  }

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {pilar_uuid, program_uuid, kegiatan_uuid, target,persentasi, periode_uuid, tahun_uuid,indikator, satuan, capaian, anggaran, realisasi, sumber}= request.all()

    try {
      const renaksi = await Renaksi.findBy("uuid",id)

      renaksi?.merge({pilarUuid:pilar_uuid, programUuid:program_uuid, kegiatanUuid:kegiatan_uuid, target:target, persentasi:persentasi, periodeUuid:periode_uuid,tahunUuid:tahun_uuid, indikator:indikator, satuan:satuan, capaian:capaian, anggaran:anggaran, realisasi:realisasi, sumber})
      await renaksi?.save()

      await renaksi?.preload('periode')
      await renaksi?.preload("tahun")
      await renaksi?.preload("opd")
      await renaksi?.preload('pilar')
      await renaksi?.preload('program')
      await renaksi?.preload('kegiatan')

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data berhasil...",
          data: renaksi?.datadisplay
        }
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan ",
        },
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const renaksi = await Renaksi.findBy("uuid",id)
      await renaksi?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil",
          data:{
            id:id
          }
        }
      })
    } catch (error) {
      return response.status(500).json({
        code:200,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan"
        },
        errors:error
      })
    }
  }
}
