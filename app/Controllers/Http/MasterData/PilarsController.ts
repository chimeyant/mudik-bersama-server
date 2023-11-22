import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pilar from 'App/Models/Pilar'
import PilarService from 'App/Services/PilarService';
import PilarValidator from 'App/Validators/MasterData/PilarValidator';

export default class PilarsController {
  public async index({}: HttpContextContract) {
    const pilars = await Pilar.query().orderBy("nourut",'asc')

    const datas:{}[]=[]

    pilars.forEach(element => {
      datas.push(element.dataview)
    });

    return datas;

  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, description,nourut}= request.all()

    await request.validate(PilarValidator)

    try {
      const pilar = new Pilar
      pilar.name = name
      pilar.description= description
      pilar.nourut= nourut
      await pilar.save()

      return response.json({
        success:true,
        response:{
          message:"Proses tambah pilar berhasil..!",
          data: pilar.dataview
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

    const pilar = await Pilar.findBy("uuid", id)

    return pilar?.record
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, description,nourut}= request.all()

    await request.validate(PilarValidator)

    try {
      const pilar = await Pilar.findBy("uuid",id)
      pilar?.merge({
        name:name,
        description:description,
        nourut:nourut
      })
      await pilar?.save()

      return response.json({
        success:true,
        response:{
          message:"Proses ubah data berhasil",
          data:pilar?.dataview
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
      const pilar = await Pilar.findBy("uuid",id)
      await pilar?.delete()

      return response.json({
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
    const service = new PilarService

    return service.combo();
  }
}
