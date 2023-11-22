import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Program from 'App/Models/Program'
import ProgramValidator from 'App/Validators/MasterData/ProgramValidator'

export default class ProgramsController {
  public async index({params}: HttpContextContract) {
    const {pilar_uuid}= params
    const programs = await Program.query().where("pilar_uuid", pilar_uuid).orderBy('nourut','asc')

    const datas:{}[]=[]
    programs.forEach(element => {
      datas.push(element.dataview)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({params, request,response}: HttpContextContract) {
    const {pilar_uuid}= params
    const {name, nourut}= request.all()

    await request.validate(ProgramValidator)

    try {
      const program = new Program
      program.pilarUuid = pilar_uuid
      program.name = name
      program.nourut = nourut
      await program.save()

      return response.json({
        success:true,
        response:{
          message:"Proses tambah program berhasil",
          data:program.dataview
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        response:{
          message:""
        },
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params
    const program = await Program.findBy("uuid",id)

    return program?.record
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response}: HttpContextContract) {
    const {id}=params
    const {name,nourut}= request.all()

    await request.validate(ProgramValidator)

    try {
      const program = await Program.findBy("uuid",id)
      program?.merge({
        name:name,
        nourut:nourut
      })
      await program?.save()

      return response.json({
        success:true,
        response:{
          message:"Proses ubah data berhasil",
          data:program?.dataview
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        errors:error
      })
    }
  }

  public async destroy({params,response}: HttpContextContract) {
    const {id}= params

    try {
      const program = await Program.findBy("uuid",id)
      await program?.delete()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses hapus data berhasil",
          data:{
            id:id
          }
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        errors:error
      })
    }
  }

  public async combo({params}:HttpContextContract){
    const {pilar_uuid}= params
    const programs = await Program.query().where('pilar_uuid',pilar_uuid ).orderBy("nourut",'asc')

    const datas:{}[]=[]
    programs.forEach(element => {
      const row ={}
      row['value']= element.uuid
      row['text']= element.nourut + ". "+ element.name
      datas.push(row)
    });

    return datas

  }
}
