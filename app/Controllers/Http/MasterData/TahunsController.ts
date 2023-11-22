import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TahunService from 'App/Services/TahunService'

export default class TahunsController {
  public async index({params}: HttpContextContract) {
    const service = new TahunService

    return service.lists(params.periode_uuid)
  }

  public async create({}: HttpContextContract) {}

  public async store({params, request}: HttpContextContract) {
    const service = new TahunService

    const payload = request.only(['name','description'])

    return service.store(payload, params.periode_uuid)

  }

  public async show({params}: HttpContextContract) {
    const service = new TahunService

    return service.show(params.id)
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request}: HttpContextContract) {
    const payload = request.only(['name','description'])

    const service = new TahunService

    service.update(payload, params.id)
  }

  public async destroy({params}: HttpContextContract) {
    const service = new TahunService
    return service.delete(params.id)
  }

  public async combo({params}:HttpContextContract){
    const service = new TahunService
    return service.combo(params.periode_uuid)
  }
}
