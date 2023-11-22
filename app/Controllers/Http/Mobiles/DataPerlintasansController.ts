import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PerlintasanKeretaApi from 'App/Models/PerlintasanKeretaApi'

export default class DataPerlintasansController {
  public async index({}: HttpContextContract) {
    const perlintasans = await PerlintasanKeretaApi.query().orderBy("id",'asc')

    const datas:{}[]= []

    perlintasans.forEach(element => {
      const row = {}
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      row['doorstop']= element.doorstop ? {color:'green', text:"Ada Palang Pintu"} :{color:'red',text:"Tidak Ada Palang Pintu"}
      datas.push(row)
    });

    //kirim data perlintasan
    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
