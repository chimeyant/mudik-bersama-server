import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Province from 'App/Models/Province'

export default class ProvincesController {
  public async index({}: HttpContextContract) {
    const provinces = await Province.query().withCount("regencies",(query)=>
    query.as("jmlkab")).orderBy('id','asc')

    const datas:{}[]=[]

    provinces.forEach(rows => {
      const row ={}
      row['id']= rows.id
      row['uuid']= rows.uuid
      row['name']= rows.name
      row['jmlkab']=rows.$extras.jmlkab
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
