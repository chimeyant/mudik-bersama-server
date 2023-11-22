import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sekolah from 'App/Models/Sekolah'

export default class DataSekolahsController {
  public async index({}: HttpContextContract) {
    const sekolahs = await Sekolah.query().orderBy('name','asc')

    const datas:{}[]=[]

    sekolahs.forEach(element => {
      const row = {}
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
