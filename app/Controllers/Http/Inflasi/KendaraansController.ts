import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KendaraanService from 'App/Services/Inflasi/KendaraanService'
import KendaraanValidator from 'App/Validators/Inlfasi/KendaraanValidator';

export default class KendaraansController {
  protected Service = KendaraanService

  public async index({}: HttpContextContract) {
    const result = await this.Service.list()

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const payload = request.only(['name', 'jenis', 'nomor','supir','telp','status'])

    await request.validate(KendaraanValidator)

    const result = await this.Service.store(payload)

    return response.status(result.code).send(result)
  }

  public async show({params}: HttpContextContract) {
    const result = await this.Service.show(params.id)

    return result
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const payload = request.only(['name', 'jenis', 'nomor','supir','telp','status'])

    await request.validate(KendaraanValidator)

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
