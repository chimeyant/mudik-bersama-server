import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pju from 'App/Models/Pju'

export default class PjusController {
  public async index({}: HttpContextContract) {
    const pjus = await Pju.query().orderBy("id",'asc')

    const datas:{}[]=[]

    pjus.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      row['kondisi']= element.kondisi ? {color:'green', text:"Menyala"}:{color:'red', text:"Mati"}
      datas.push(row)
    });

    return datas
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, description, address, lat,lng, kondisi}= request.all()
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
