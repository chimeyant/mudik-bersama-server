import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kegiatan from 'App/Models/Kegiatan'
import KegiatanValidator from 'App/Validators/MasterData/KegiatanValidator'

export default class KegiatansController {
  public async index({params}: HttpContextContract) {
    const {program_uuid} = params
    const kegiatans = await Kegiatan.query().where("program_uuid", program_uuid).orderBy("nourut",'asc')

    const datas:{}[]= []

    kegiatans.forEach(element => {
      const row={}
      row['id']= element.uuid
      row['name']= element.name
      row['indikator']= element.indikator
      row['pendanaan']= element.pendanaan
      datas.push(row)
    });

    return datas;


  }

  public async create({}: HttpContextContract) {}

  public async store({params,request,response}: HttpContextContract) {
    const {program_uuid}= params
    const {name, indikator, penanggung_jawab, pendukung, pendanaan, nourut}= request.all()

    await request.validate(KegiatanValidator)

    try {
      const kegiatan = new Kegiatan
      kegiatan.programUuid= program_uuid
      kegiatan.name = name
      kegiatan.indikator = indikator
      kegiatan.penanggungJawab = JSON.stringify(penanggung_jawab)
      kegiatan.pendukung = JSON.stringify(pendukung)
      kegiatan.pendanaan = pendanaan
      kegiatan.nourut= nourut
      await kegiatan.save()

      return response.json({
        success:true,
        response:{
          message:"Proses tambah kegiatan berhasil",
          data:{
            id:kegiatan.uuid,
            name:name,
            indikator:indikator,
            pendanaan:pendanaan
          }
        }
      })

    } catch (error) {
      return response.status(500).json({
        success:false,
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params
    const kegiatan = await Kegiatan.findBy("uuid",id)

    return kegiatan?.record
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response}: HttpContextContract) {
    const {id}= params
    const {name, indikator, penanggung_jawab, pendukung, pendanaan, nourut} = request.all()

    await request.validate(KegiatanValidator)

    try {
      const kegiatan = await Kegiatan.findBy("uuid",id)
      kegiatan?.merge({
        name:name,
        indikator:indikator,
        penanggungJawab: JSON.stringify(penanggung_jawab),
        pendukung:JSON.stringify(pendukung),
        pendanaan:pendanaan,
        nourut:nourut
      })

      await kegiatan?.save()

      return response.json({
        success:true,
        response:{
          message:"Proses ubah data berhasil",
          data:{
            id: kegiatan?.uuid,
            name: name,
            indikator:indikator,
            pendanaan:pendanaan
          }
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const kegiatan= await Kegiatan.findBy('uuid',id)
      await kegiatan?.delete()

      return response.json({
        success:true,
        response:{
          message:'Proses hapus data berhasil',
          data:{
            id:id
          }
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        errors:error
      })
    }
  }

  public async combo({params}:HttpContextContract){
    const {program_uuid}= params
    const kegiatans = await Kegiatan.query().where("program_uuid", program_uuid).orderBy("nourut",'asc')

    const datas:{}[]=[]
    kegiatans.forEach(element => {
      const row ={}
      row['value']= element.uuid
      row['text']= element.nourut + ". "+ element.name
      datas.push(row)
    });

    return datas;
  }
}
