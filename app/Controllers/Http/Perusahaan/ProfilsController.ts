import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perusahaan from 'App/Models/Perusahaan';
import ProfilValidator from 'App/Validators/Perusahan/ProfilValidator';

export default class ProfilsController {
  public async index({auth}: HttpContextContract) {
    const user = await auth.user

    const perusahaan = await Perusahaan.findBy("uuid", user?.perusahaanUuid)

    return perusahaan;

  }

  public async create({}: HttpContextContract) {}

  public async store({request, response, auth}: HttpContextContract) {
    //fetching data user
    const user = await auth.user

    const {name, direktur, npwp, nib, district_uuid, village_uuid, phone, alamat, lat, lng }= request.all()

    await request.validate(ProfilValidator)

    try {
      const profil = await Perusahaan.findBy("uuid", user?.perusahaanUuid)
      profil?.merge({
        name:name,
        direktur:direktur,
        npwp:npwp,
        nib:nib,
        districtUuid:district_uuid,
        villageUuid:village_uuid,
        phone:phone,
        alamat:alamat,
        lat:lat,
        lng:lng
      })

      await profil?.save()

      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses simpan profil berhasil",
        errors:[]
      })

    } catch (error) {

      return response.status(501).json({
        success:false,
        code :501,
        message:"Opps..., terjadi kesalahan "+ error,
        error:error
      })

    }


  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
