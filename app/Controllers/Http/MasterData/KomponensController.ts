import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KomponenService from 'App/Services/MasterData/KomponenService';


export default class KomponensController {
  protected Service = KomponenService

  public async index({}: HttpContextContract) {
    const result = await KomponenService.fetch()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
      const payload = request.only(['name','status'])

      const result = await KomponenService.store(payload)

      return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await this.Service.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['name','status'])

    const result = await this.Service.update(payload, params.id)

    return response.status(result.code).send(result)
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
