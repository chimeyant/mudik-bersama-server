import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PerusahaanService from 'App/Services/Keselamatan/PerusahaanService'

export default class PerusahaansController {
  protected Service = PerusahaanService

  public async index({}: HttpContextContract) {
    const result = await this.Service.fetch()

    return result
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({params}: HttpContextContract) {
    try {

    } catch (error) {

    }
  }
}
