import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pejabat from 'App/Models/Pejabat'
import PejabatValidator from 'App/Validators/MasterData/PejabatValidator';

export default class PejabatsController {
  public async index({}: HttpContextContract) {
    const pejabats = await Pejabat.query().orderBy('id','asc')

    const datas:{}[]=[]

    pejabats.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['nip']= element.nip
      row['gol']= element.gol
      row['pangkat']= element.pangkat
      row['nohp']= element.nohp
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, nip, gol, pangkat, nohp, wainfo, status} = request.all()

    await request.validate(PejabatValidator)

    try {
      const pejabat = new Pejabat
      pejabat.name = name
      pejabat.nip = nip
      pejabat.gol = gol
      pejabat.pangkat = pangkat
      pejabat.nohp = nohp
      pejabat.wainfo = wainfo
      pejabat.status = status
      await pejabat.save()

      return response.status(200).json({
        success: true,
        code:200,
        response:{
          message: "Proses tambah pejabat berhasil...!",
          data : pejabat.dataview
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{},
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const pejabat = await Pejabat.findBy('uuid', id)

    return pejabat?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, nip, gol, pangkat, nohp, wainfo, status}= request.all()

    await request.validate(PejabatValidator)

    try {
      const pejabat = await Pejabat.findBy("uuid", id)
      pejabat?.merge({name:name, nip:nip, gol:gol, pangkat:pangkat, nohp:nohp, wainfo:wainfo, status:status})
      await pejabat?.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses ubah data pejabat berhasil...!",
          data: pejabat?.dataview
        },
        error:[]

      })
    } catch (error) {
      return response.status(501).json({
        success:false,
        code:501,
        response:{},
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const pejabat = await Pejabat.findBy('uuid', id)
      await pejabat?.delete()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses hapus data berhasil...!",
          data:{
            id:id
          }
        },
        errors:[]
      })
    } catch (error) {
      return response.status(501).json({
        success:false,
        code:501,
        response:{},
        errors:error
      })
    }
  }
}
