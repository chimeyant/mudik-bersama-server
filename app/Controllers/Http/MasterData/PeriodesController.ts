import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Periode from 'App/Models/Periode'
import PeriodeService from 'App/Services/PeriodeService';
import PeriodeValidator from 'App/Validators/MasterData/PeriodeValidator';

export default class PeriodesController {
  public async index({}: HttpContextContract) {
    const periodes = await Periode.query().orderBy("name","desc")

    const datas:{}[]=[]

    periodes.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name'] = element.name
      row['description']= element.description
      row['status']= element.status ? {color:'green',text:"Aktif"}:{color:'red',text:"Tidak Aktif"}
      datas.push(row)
    });

    return datas
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, description, status} = request.all()

    await request.validate(PeriodeValidator)

    try {
      const periode = new Periode
      periode.name = name
      periode.description = description
      periode.status = status
      await periode.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses tambah periode berhasil..!",
          data:periode.dataview
        }
      })
    } catch (error) {
      return response.status(200).json({
        code:500,
        success: false,
        response:{
          message:"Opps..., terjadi kesalahan"
        },
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const periode = await Periode.findBy("uuid",id)


    return periode?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, description, status}= request.all()

    await request.validate(PeriodeValidator)

    try {
      const periode = await Periode.findBy("uuid",id)
      periode?.merge({name:name, description:description,status:status})
      await periode?.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data berhasil..!",
          data: periode?.dataview
        },
        errors:[],
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        response:{
          message:"Oppss.., terjadi kesalahan"
        },
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const periode = await Periode.findBy("uuid",id)
      await periode?.delete()

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
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan",
        },
        errors:error
      })
    }
  }

  public async combo({}:HttpContextContract){
    const service = new PeriodeService

    return await service.combo()
  }
}
