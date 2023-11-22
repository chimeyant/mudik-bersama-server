import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LokasiRambu from 'App/Models/LokasiRambu'

export default class DataRambusController {
  public async index({}: HttpContextContract) {
    const rambus = await LokasiRambu.query().preload('rambu').orderBy("id",'asc')

    const datas:{}[]=[]

    rambus.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.rambu.name
      row['address']= element.address
      row['status']= element.status == 'baik' ? {color:'green',text:'Baik'} : {color:'red',text:'Rusak'}
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
