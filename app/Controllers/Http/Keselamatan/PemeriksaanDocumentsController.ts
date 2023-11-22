import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Komponen from 'App/Models/Komponen'
import Env from "@ioc:Adonis/Core/Env"
import Drive from '@ioc:Adonis/Core/Drive'

import PemeriksaanDocument from 'App/Models/PemeriksaanDocument'

export default class PemeriksaanDocumentsController {
  public async index({params}: HttpContextContract) {
    const {pemeriksaan_uuid} = params

    const documents = await PemeriksaanDocument.query().preload("komponen").where('pemeriksaan_uuid', pemeriksaan_uuid).orderBy('id','asc')

    const datas:{}[] = []

    documents.forEach(async element  => {
      const row={}
      row['id']= element.uuid
      row['name']=element.komponen.name
      row['description']= element.description
      row['jenis']= element.filetype
      row['aksi']={
        id:element.uuid,
        url:Env.get("BASE_URL")+  await Drive.getSignedUrl("documents/"+  element.filename)
      }
      datas.push(row)
    });

    return datas
  }

  public async create({}: HttpContextContract) {}

  public async store({params, request,response}: HttpContextContract) {
    const {pemeriksaan_uuid} = params
    const {komponen_uuid, description, filetype, filename} = request.all()

    try {
      const document = new PemeriksaanDocument
      document.pemeriksaanUuid = pemeriksaan_uuid
      document.komponenUuid = komponen_uuid
      document.description = description
      document.filetype = filetype
      document.filename = filename
      await document.save()

      const komponen = await Komponen.findBy("uuid", komponen_uuid)

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses tambah dokumen pemeriksaan berhasil..!",
          data: {
            id:document.uuid,
            name: komponen?.name,
            description:document.description,
            jenis: filetype
          }
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{},
        errors:error
      })
    }


  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const document = await PemeriksaanDocument.findBy("uuid", id)
      await document?.delete()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses hapus data berhasil...!",
          data:{
            id: id
          }
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        code : 500,
        response:{
          message: "Opps..., terjadi kesalahan "+ error
        },
        errors:error
      })
    }
  }
}
