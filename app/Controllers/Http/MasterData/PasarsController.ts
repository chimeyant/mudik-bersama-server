import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PasarService from 'App/Services/PasarService'
import PasarValidator from 'App/Validators/MasterData/PasarValidator'

export default class PasarsController {
  protected Service = PasarService

  public async index({}: HttpContextContract) {
    const result = await this.Service.fetch()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {type, name, description, province_uuid, regency_uuid, district_uuid, village_uuid, address, lat, lng, status}= request.all()



    await request.validate(PasarValidator)

    const payload={
      type: type,
      name: name,
      description: description,
      province_uuid: province_uuid,
      regency_uuid: regency_uuid,
      district_uuid: district_uuid,
      village_uuid: village_uuid,
      address:address,
      lat:lat,
      lng:lng,
      status:status
    }

    const result = await this.Service.store(payload)

    return response.status(result?.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await this.Service.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {type, name, description, province_uuid, regency_uuid, district_uuid, village_uuid, address, lat, lng, status}= request.all()

    await request.validate(PasarValidator)

    const payload={
      type: type,
      name: name,
      description: description,
      province_uuid: province_uuid,
      regency_uuid: regency_uuid,
      district_uuid: district_uuid,
      village_uuid: village_uuid,
      address:address,
      lat:lat,
      lng:lng,
      status:status
    }

    const result = await this.Service.update(payload, params.id)

    return response.status(result?.code).send(result)

  }

  public async destroy({params, response}: HttpContextContract) {
    const result = await this.Service.delete(params.id)

    return response.status(result.code).send(result)
  }

  public async combo({}:HttpContextContract){
    const result = await this.Service.combo()

    return result
  }
}
