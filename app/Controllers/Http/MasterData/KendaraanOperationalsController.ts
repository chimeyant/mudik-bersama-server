import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KendaraanOperational from 'App/Models/KendaraanOperational'

export default class KendaraanOperationalsController {
  public async index({}: HttpContextContract) {
    const kendaraans = await KendaraanOperational.query().orderBy("id",'desc')

    const datas:{}[]=[]

    kendaraans.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['nopol']= element.nopol
      row['kondisi']= element.kondisi =='baik' ? {color:'green', text:'Baik'}:{color:'red',text:"Rusak"}
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {jenis_kendaraan_operational_uuid, name,nopol, kondisi} = request.all()

    try {
      const kendaraan = new KendaraanOperational
      kendaraan.jenisKendaraanOperationalUuid = jenis_kendaraan_operational_uuid
      kendaraan.name = name
      kendaraan.nopol = nopol
      kendaraan.kondisi = kondisi
      await kendaraan.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses tambah kendaraan operasional berhasil",
          data: kendaraan.dataview
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

  public async show({params}: HttpContextContract) {
    const {id}= params

    const kendaraan = await KendaraanOperational.findBy("uuid",id)

    return kendaraan?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {jenis_kendaraan_operational_uuid, name, nopol, kondisi} = request.all()

    try {
      const kendaraan = await KendaraanOperational.findBy("uuid", id)
      kendaraan?.merge({
        jenisKendaraanOperationalUuid: jenis_kendaraan_operational_uuid,
        name:name,
        nopol:nopol,
        kondisi:kondisi
      })

      await kendaraan?.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data berhasil",
          data:kendaraan?.dataview
        }
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

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const kendaraan = await KendaraanOperational.findBy("uuid",id)
      await kendaraan?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil",
          data:{
            id:id
          }
        },

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
}
