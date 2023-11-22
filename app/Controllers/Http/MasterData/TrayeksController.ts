import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Trayek from 'App/Models/Trayek'
import TrayekValidator from 'App/Validators/MasterData/TrayekValidator'

export default class TrayeksController {
  public async index({}: HttpContextContract) {
    const trayeks = await Trayek.query().orderBy("id", 'asc')

    const datas:{}[] =[];

    trayeks.forEach(element => {
      datas.push(element.dataview)
    });

    return datas;

  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, status} = request.all()

    await request.validate(TrayekValidator)

    try {
      const trayek = new Trayek
      trayek.name = name
      trayek.status = status
      await trayek.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses tambah data berhasil...!",
          data: trayek.dataview
        },
        errors:[],
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        code:500,
        response:{},
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const trayek = await Trayek.findBy("uuid", id)
    return trayek?.record
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, status}= request.all()

    await request.validate(TrayekValidator)

    try {
      const trayek = await Trayek.findBy("uuid", id)
      trayek?.merge({name:name, status:status})
      await trayek?.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses ubah data berhasil...!",
          data: trayek?.dataview
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{
          message:"Opps terjadi kesalahan"
        },
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const trayek = await Trayek.findBy("uuid", id)
      await trayek?.delete()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses hapus data berhasil",
          data:{
            id: id
          }
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{

        },
        errors:error
      })
    }
  }

  public async combo({}:HttpContextContract){
    const trayek = await Trayek.query().knexQuery.select('name as text','uuid as value').orderBy('name','asc')

    return trayek;
  }
}
