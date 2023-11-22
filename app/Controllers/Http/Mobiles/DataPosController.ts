import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Po from 'App/Models/Po'

export default class DataPosController {
  public async index({}: HttpContextContract) {
    const pos = await Po.query().orderBy("name",'asc')

    const datas:{}[]= []

    pos.forEach(element => {
      const row={}
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
