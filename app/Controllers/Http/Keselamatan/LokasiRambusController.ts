import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LokasiRambu from 'App/Models/LokasiRambu'
import Village from 'App/Models/Village';
import LokasiRambuValidator from 'App/Validators/Keselamatan/LokasiRambuValidator';

export default class LokasiRambusController {
  public async index({}: HttpContextContract) {
    const lokasirambu = await LokasiRambu.query().preload("rambu").preload("village").orderBy('id','desc')

    const datas:{}[]=[]

    lokasirambu.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.rambu.name
      row['desa']= element.village.name
      row['address']= element.address
      row['status']= element.status =='baik' ? {color: 'green', text:'BAIK'}: {color:'red', text:"RUSAK"}
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {rambu_uuid, district_uuid, village_uuid, lat, lng,address, status}= request.all()

    await request.validate(LokasiRambuValidator)

    try {
      const lokasirambu = new LokasiRambu()
      lokasirambu.rambuUuid = rambu_uuid
      lokasirambu.districtUuid = district_uuid
      lokasirambu.villageUuid = village_uuid
      lokasirambu.lat = lat
      lokasirambu.lng = lng
      lokasirambu.address= address
      lokasirambu.status = status
      await lokasirambu.save()

      const lokrambu = await LokasiRambu.query().where('uuid', lokasirambu.uuid).preload('rambu').preload('village').first()

      return response.json({
        code:200,
        success:true,
        response:{
          message:"Proses simpan data rambu berhasil",
          data: {
            id: lokrambu?.uuid,
            name:lokrambu?.rambu.name,
            desa: lokrambu?.village.name,
            address: lokrambu?.address,
            status: lokrambu?.status === 'baik' ? {color:'green', text:'BAIK'}: {color:'red', text:"RUSAK"}
          }
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        response:{},
        errors:[
          {
            message: "Opps..., terjadi kesalahan "+ error
          }
        ]
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const lokasirambu = await LokasiRambu.findBy('uuid', id)

    const data={}
    data['id'] = lokasirambu?.uuid
    data['rambu_uuid'] = lokasirambu?.rambuUuid
    data['district_uuid']= lokasirambu?.districtUuid
    data['village_uuid']= lokasirambu?.villageUuid
    data['lat']= lokasirambu?.lat
    data['lng']= lokasirambu?.lng
    data['address']= lokasirambu?.address
    data['status']= lokasirambu?.status

    return data
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {rambu_uuid, district_uuid, village_uuid, lat, lng,address, status}= request.all()

    await request.validate(LokasiRambuValidator)

    try {
      const lokasirambu = await LokasiRambu.findBy("uuid",id)
      lokasirambu?.merge({rambuUuid:rambu_uuid, districtUuid:district_uuid,villageUuid:village_uuid, lat:lat,lng:lng,address:address,status:status})
      await lokasirambu?.save()


      const lokrambu = await LokasiRambu.query().where('uuid',id).preload("rambu").preload('village').first()

      return response.json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data rambu berhasil",
          data: {
            id: lokrambu?.uuid,
            name:lokrambu?.rambu.name,
            desa: lokrambu?.village.name,
            address: lokrambu?.address,
            status: lokrambu?.status == 'baik' ? {color:'green', text:'BAIK'}: {color:'red', text:"RUSAK"}
          }
        }
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        errors:error.response
      })
    }

  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const lokasirambu = await LokasiRambu.findBy("uuid",id)
      await lokasirambu?.delete()
      return response.json({
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
        errors:error
      })
    }
  }
}
