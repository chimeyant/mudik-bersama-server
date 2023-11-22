import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JenisKendaraanOperational from 'App/Models/JenisKendaraanOperational'
import JenisKendaraanOperationalValidator from 'App/Validators/MasterData/JenisKendaraanOperationalValidator';

export default class JenisKendaraanOperationalsController {
  public async index({}: HttpContextContract) {
    const jeniskendaraans = await JenisKendaraanOperational.query().orderBy("name","asc")

    const datas:{}[]=[]

    jeniskendaraans.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name}= request.all()

    await request.validate(JenisKendaraanOperationalValidator)

    try {
      const jeniskendaraan = new JenisKendaraanOperational
      jeniskendaraan.name = name
      await jeniskendaraan.save()

      return response.status(200).json({
          code:200,
          success:true,
          response:{
            message:"Proses tambah jenis kendaraan berhasil",
            data: jeniskendaraan.dataview
          },
          errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan"
        },
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const jeniskendaraan = await JenisKendaraanOperational.findBy("uuid",id)

    return jeniskendaraan?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name}= request.all()

    await request.validate(JenisKendaraanOperationalValidator)

    try {
      const jeniskendaraan = await JenisKendaraanOperational.findBy("uuid",id)
      jeniskendaraan?.merge({
        name:name
      })

      await jeniskendaraan?.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data berhasil...!",
          data:jeniskendaraan?.dataview
        },
        errors:[],
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
      const jeniskendaraan = await JenisKendaraanOperational.findBy("uuid", id)
      await jeniskendaraan?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil..!",
          data:{
            id:id
          }
        }
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan ",
          data:{}
        },
        errors:error
      })
    }
  }

  public async combo({}:HttpContextContract){
    const jeniskendaraan = await JenisKendaraanOperational.query().orderBy("id",'asc')

    const datas:{}[]=[]

    jeniskendaraan.forEach(element => {
      const row ={}
      row['value']= element.uuid
      row['text']= element.name
      datas.push(row)
    });

    return datas;
  }
}
