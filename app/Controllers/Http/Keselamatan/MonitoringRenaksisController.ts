import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Renaksi from 'App/Models/Renaksi'
import Env from "@ioc:Adonis/Core/Env"
import RenaksiService from 'App/Services/RenaksiService'

export default class MonitoringRenaksisController {
  public async index({auth}: HttpContextContract) {
    const user = auth.user

    const datas:{}[]=[]

    if(user?.authent=='superadmin'){
      const renaksis = await Renaksi.query().preload('periode').preload('opd').preload('pilar').preload("program").preload('kegiatan').orderBy("id", 'asc')

      renaksis.forEach(element => {
        const row={}
        row['id']= element.uuid
        row['opd']= element.opd ? element.opd.name :'NA'
        row['periode']= element.periode ? element.periode.name :'NA'
        row['pilar']= element.pilar.name
        row['program']= element.program.name
        row['kegiatan']= element.kegiatan.name
        row['target']= element.tahun ? element.tahun.name :''
        row['persentasi']= element.persentasi < 99 ? {color:'red', value: element.persentasi} : element.persentasi > 100 ? { color: 'blue', value: 100}: { color: 'green', value: element.persentasi}
        datas.push(row)
      });
    }else{
      const renaksis = await Renaksi.query().preload('periode').preload('tahun').preload('opd').preload('pilar').preload("program").preload('kegiatan').orderBy("id", 'asc')

      renaksis.forEach(element => {
        const row={}
        row['id']= element.uuid
        row['opd']= element.opd ? element.opd.name :'NA'
        row['periode']= element.periode ? element.periode.name :'NA'
        row['pilar']= element.pilar.name
        row['program']= element.program.name
        row['kegiatan']= element.kegiatan.name
        row['target']= element.tahun ? element.tahun.name :''
        row['persentasi']= element.persentasi < 99 ? {color:'red', value: element.persentasi} : element.persentasi > 100 ? { color: 'blue', value: 100}: { color: 'green', value: element.persentasi}
        datas.push(row)
      });
    }

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const renaksi = await Renaksi.findBy("uuid",id)
      await renaksi?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil",
          data:{
            id:id
          }
        }
      })
    } catch (error) {
      return response.status(500).json({
        code:200,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan"
        },
        errors:error
      })
    }
  }

  public async print_report({params, view}:HttpContextContract){
    const service = new RenaksiService

    const datas = await service.reanaksipertahun(params.tahun_uuid, params.pilar_uuid)


    const url_style = Env.get('BASE_URL')+ "/styles/report/style.bundle.css"
    return view.render('reports/renaksi',{url_style:url_style, datas:datas?.datas, tahun: datas?.tahun})
  }
}
