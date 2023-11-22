import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JenisRambu from 'App/Models/JenisRambu'
import Rambu from 'App/Models/Rambu'
import RambuValidator from 'App/Validators/MasterData/RambuValidator'

export default class RambusController {
  public async index({params}: HttpContextContract) {
    const {jenis_rambu_uuid} = params
    const jenisrambu = await JenisRambu.findBy('uuid', jenis_rambu_uuid)
    const rambus = await Rambu.query().where("jenis_rambu_id", jenisrambu.id)
    return rambus;
  }

  public async create({}: HttpContextContract) {}

  public async store({params, request, response}: HttpContextContract) {
    const {jenis_rambu_uuid}= params

    const {name, description, icon}= request.all()

    const jenisrambu = await JenisRambu.findBy('uuid', jenis_rambu_uuid)

    await request.validate(RambuValidator)

    try {
        const rambu = new Rambu()
        rambu.jenisRambuId = jenisrambu.id
        rambu.name = name
        rambu.description = description
        rambu.icon = icon
        await rambu.save()

        return response.status(200).json({
          success:true,
          code :200,
          response:{
            message:"Proses tambah rambu berhasil..!",
            data: rambu
          },
          errors:[]
        })
    } catch (error) {
      return response.status(501).json({
        success:false,
        code :501,
        response:{},
        errors:error
      })
    }
  }

  public async show({params,}: HttpContextContract) {
    const {id}= params
    const rambu = await Rambu.findBy("uuid", id)

    return rambu?.dataview
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id} = params
    const {name, description, icon}=  request.all()

    await request.validate(RambuValidator)

    try {
      const rambu = await Rambu.findBy("uuid", id)
      rambu?.merge({name:name, description:description, icon:icon})
      await rambu?.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses ubah data berhasil",
          data: rambu,
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:error
      });
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const rambu = await Rambu.findBy('uuid',id)
      await rambu?.delete()
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
      return response.status(501).json({
        code:501,
        success:false,
        response:{},
        errors:error
      })
    }
  }

  public async combo(){
    const rambu = await Rambu.query().knexQuery.select('name as text','uuid as value')

    return rambu;
  }
}
