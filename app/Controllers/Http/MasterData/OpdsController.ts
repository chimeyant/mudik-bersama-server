import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Opd from 'App/Models/Opd'

export default class OpdsController {
  public async index({}: HttpContextContract) {
    const opds = await Opd.query().orderBy("id",'asc')

    const datas:{}[]=[]

    opds.forEach(element => {
      datas.push(element.dataview)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name}= request.all()

    try {
      const opd = new Opd
      opd.name =name
      await opd.save()

      return response.status(200).json({
        success:true,
        response:{
          message:"Proses tambah instansi berhasil..!",
          data:opd.dataview
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        response:{},
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const opd = await Opd.findBy("uuid", id)
    return opd?.record
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name}= request.all()

    try {
      const opd = await Opd.findBy('uuid', id)
      opd?.merge({name:name})
      await opd?.save()

      return response.status(200).json({
        success:true,
        response:{
          message:"Proses ubah data berhasil",
          data: opd?.dataview
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        errors:error
      })
    }
  }

  public async destroy({params,response}: HttpContextContract) {
    const {id}= params
    try {
      const opd = await Opd.findBy("uuid",id)
      await opd?.delete()

      return response.status(200).json({
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
        success:false,
        errors:error
      })
    }
  }

  public async combo(){
    const instansis = await Opd.query().orderBy("name",'asc')

  const datas:{}[]=[]

  instansis.forEach(element => {
    const row = {}
    row['value']= element.uuid
    row['text']= element.name
    datas.push(row)
  });
    return datas;
  }
}
