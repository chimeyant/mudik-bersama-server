import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SekolahTingkat from 'App/Models/SekolahTingkat'

export default class SekolahTingkatsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async combo({}:HttpContextContract){
    const tingkat = await SekolahTingkat.query().orderBy("id",'asc')

    const datas:{}[]=[]

    tingkat.forEach(element => {
      const row ={}
      row['value']= element.uuid
      row['text']= element.name
      datas.push(row)
    });

    return datas
  }
}
