import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Po from 'App/Models/Po'
import PoValidator from 'App/Validators/MasterData/PoValidator';

export default class PosController {
  public async index({}: HttpContextContract) {
    const pos = await Po.query().orderBy("id",'asc')

    const datas:{}[]=[]

    pos.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      row['status']= element.status ? { color:'green', text:"Aktif"}: {color:'red', text:"Tidak Aktif"}
      datas.push(row)
    });

    return datas
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, address, lat,lng,status} = request.all()

    await request.validate(PoValidator)

    try {
      const po = new Po
      po.name = name
      po.address = address
      po.lat = lat
      po.lng = lng
      po.status = status
      await po.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses POS Pantau berhasil",
          data: po.dataview
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success: false,
        response:{
          message:"Opps..., terjadi kesalahan",
        },
        errors:error
      })
    }

  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const po = await Po.findBy("uuid", id)

    return po?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, address, lat,lng,status} = request.all()

    await request.validate(PoValidator)

    try {
      const po = await Po.findBy("uuid",id)
      po?.merge({name:name, address:address, lat:lat, lng:lng, status:status})
      await po?.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data berhasil..!",
          data:po?.dataview
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan",
          data:{}
        },
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const po = await Po.findBy("uuid",id)
      await po?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil..!",
          data:{
            id:id
          }
        },
        errors:[]

      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan",
          data:{}
        },
        errors:error
      })
    }
  }
}
