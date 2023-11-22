import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sekolah from 'App/Models/Sekolah'
import SekolahValidator from 'App/Validators/MasterData/SekolahValidator';

export default class SekolahsController {
  public async index({}: HttpContextContract) {
    const sekolahs = await Sekolah.query().orderBy('name','asc')

    const datas:{}[]=[]

    sekolahs.forEach(element => {
      const row = {}
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      row['status']= element.status ? {color:'green', text:"Aktif"}:{color:'red', text:"Tidak Aktif"}
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, sekolah_tingkat_uuid, address, lat, lng, status} = request.all()

    await request.validate(SekolahValidator)

    try {
      const sekolah = new Sekolah
      sekolah.sekolahTingkatUuid = sekolah_tingkat_uuid
      sekolah.name = name
      sekolah.address = address
      sekolah.lat = lat
      sekolah.lng = lng
      sekolah.status = status
      await sekolah.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses tambah data sekolah berhasil",
          data:sekolah.dataview
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        code :500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan"
        }
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const sekolah = await Sekolah.findBy("uuid", id)

    return sekolah?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params

    const {name, sekolah_tingkat_uuid, address, lat,lng, status } = request.all()

    await request.validate(SekolahValidator)

    try {
      const sekolah = await Sekolah.findBy("uuid",id)
      sekolah?.merge({sekolahTingkatUuid:sekolah_tingkat_uuid, name:name, address:address, lat:lat, lng:lng, status:status})
      await sekolah?.save()

      return response.status(200).json({
        code:200,
        success: true,
        response:{
          message:"Proses ubah data berhasil..!",
          data: sekolah?.dataview
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        code:200,
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
      const sekolah = await Sekolah.findBy("uuid", id)
      await sekolah?.delete()

      return response.status(200).json({
        code:200,
        success: true,
        response:{
          message:"Proses hapus data berhasil",
          data:{
            id: id
          }
        },
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
