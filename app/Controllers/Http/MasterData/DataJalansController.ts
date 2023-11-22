import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DataJalanService from 'App/Services/DataJalanService'

export default class DataJalansController {
  protected Service = DataJalanService

  public async index({}: HttpContextContract) {
    const result = await this.Service.fetch()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['name','type','polygon'])

    const result = await this.Service.store(payload)

    return response.status(result?.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await this.Service.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['name','type','polygon'])

    const result = await this.Service.update(payload, params.id)

    return response.status(result.code).send(result)
  }

  public async destroy({}: HttpContextContract) {}
}
