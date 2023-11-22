import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'
import DocumentValidator from 'App/Validators/MasterData/DocumentValidator';

export default class DocumentsController {
  public async index({}: HttpContextContract) {
    const documents = await Document.query().orderBy('id','desc')

    const datas:{}[]=[]

    documents.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['description']= element.description
      row['publish']= element.publish ? {color:'green', text:'publish'}:{color:'red',text:'un publish'},
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, description, filename, publish}= request.all()

    await request.validate(DocumentValidator)

    try {
      const document = new Document
      document.name = name
      document.description = description
      document.filename= filename
      document.publish = publish
      await document.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses tambah data berhasil...!",
          data: document.dataview
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

  public async show({params}: HttpContextContract) {
    const {id}= params

    const document = await Document.findBy('uuid',id)

    return document?.datarecord;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response}: HttpContextContract) {
    const {id}= params
    const {name, description, filename, publish}= request.all()

    await request.validate(DocumentValidator)

    try {
      const document = await Document.findBy('uuid',id)
      document?.merge({name:name, description:description, filename:filename, publish:publish})
      await document?.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses ubah dokumen berhasil...!",
          data: document?.dataview
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

  public async destroy({params,response}: HttpContextContract) {
    const {id}= params
    try {
      const document = await Document.findBy("uuid",id)
      await document?.delete()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses hapus data berhasil...!",
          data:{
            id:id
          }
        },
        errors:[]
      })
    } catch (error) {
      return response.status(501).json({
        success:false,
        code:501,
        response:{

        },
        errors:error
      })
    }
  }
}
