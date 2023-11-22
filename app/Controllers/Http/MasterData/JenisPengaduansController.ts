import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JenisPengaduan from 'App/Models/JenisPengaduan'
import JenisPengaduanValidator from 'App/Validators/MasterData/JenisPengaduanValidator';

export default class JenisPengaduansController {
  public async index({}: HttpContextContract) {
    const jenispengaduans = await JenisPengaduan.query().orderBy('id','asc')

    const datas:{}[]=[]
    jenispengaduans.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['description']= element.description
      row['status']= element.status ? {color:'green', text:'AKTIF'} : {color:"red", text:"TIDAK AKTIF"}
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const {kode, name, description, status}= request.all()
    await request.validate(JenisPengaduanValidator)
    try {
      const jenispengaduan = new JenisPengaduan()
      jenispengaduan.kode = kode
      jenispengaduan.name = name
      jenispengaduan.description = description
      jenispengaduan.status = status
      await jenispengaduan.save()
      return response.json({
        code :200,
        success:true,
        response:{
          message:"Proses tambah jenis pengaduan berhasil...",
          data: jenispengaduan.dataview
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:{
          message:error[0].message,
        }
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const jenispengaduan = await JenisPengaduan.findBy('uuid', id)

    return jenispengaduan?.datarecord;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params

    const {kode,name,description, status} = request.all()

    await request.validate(JenisPengaduanValidator)

    try {
      const jenispengaduan = await JenisPengaduan.findBy('uuid',id)
      jenispengaduan?.merge({kode:kode,name:name, description:description, status:status})
      await jenispengaduan?.save()

      return response.json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data berhasil...",
          data:jenispengaduan?.dataview
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:{
          messages:error[0].message
        }
      })
    }

  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const jenispengaduan = await JenisPengaduan.findBy('uuid',id)
      await jenispengaduan?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus jenis pengaduan berhasil...!",
          data: {id:id}
        }
      })
    } catch (error) {
      return response.status(501).json({
        code : 501,
        success:false,
        errors:{
          message:error[0].message
        }
      })
    }
  }

  public async combo({}: HttpContextContract){
    const data = await JenisPengaduan.query().knexQuery.select("name as text",'uuid as value')
    return data;
  }
}
