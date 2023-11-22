import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PerlintasanKeretaApi from 'App/Models/PerlintasanKeretaApi'

export default class PerlintasanKeretaApisController {
  public async index({}: HttpContextContract) {
    const perlintasans = await PerlintasanKeretaApi.query().orderBy("id",'desc')

    const datas:{}[]=[]

    perlintasans.forEach(element => {
      const row ={}
      row['id'] = element.uuid
      row['name']= element.name
      row['address']= element.address
      row['doorstop']= element.doorstop ? {color:'green',text:"Tersedia"} : {color:'red', text:"Tidak Tersedia"}
      datas.push(row)
    });

    return datas
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, address, district_uuid, village_uuid, lat, lng, doorstop} = request.all()

    try {
      const perlintasan = new PerlintasanKeretaApi
      perlintasan.name = name
      perlintasan.districtUuid = district_uuid
      perlintasan.villageUuid = village_uuid
      perlintasan.address = address
      perlintasan.doorstop = doorstop
      perlintasan.lat = lat
      perlintasan.lng = lng
      await perlintasan.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses tambah data perlintasan berhasil..!",
          data: perlintasan.dataview
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

  public async show({params}: HttpContextContract) {
    const {id}= params

    const perlintasan = await PerlintasanKeretaApi.findBy("uuid",id)

    return perlintasan?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name,address, district_uuid, village_uuid, doorstop, lat,lng} = request.all()

    try {
      const perlintasan = await PerlintasanKeretaApi.findBy("uuid",id)
      perlintasan?.merge({
        name:name,
        address:address,
        districtUuid:district_uuid,
        villageUuid:village_uuid,
        doorstop:doorstop,
        lat:lat,
        lng:lng
      })
      await perlintasan?.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data perlintasan berhasil..!",
          data:perlintasan?.dataview
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan..!"
        },
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const perlintasan  = await PerlintasanKeretaApi.findBy("uuid",id)
      await perlintasan?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil...!",
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
          message:"Opps..., terjadi kesalahan "
        },
        erors:error

      })
    }
  }
}
