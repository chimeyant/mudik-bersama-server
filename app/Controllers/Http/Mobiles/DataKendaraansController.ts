import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KendaraanOperational from 'App/Models/KendaraanOperational'

export default class DataKendaraansController {

  public async index({}: HttpContextContract) {
    const kendaraans = await KendaraanOperational.query().orderBy("id",'asc')


    const datas:{}[]=[]

    kendaraans.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['nopol']= element.nopol
      row['status']= element.kondisi == 'baik' ? {color:'green', text:'Baik'}:{color:'red',text:'Rusak'}
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
