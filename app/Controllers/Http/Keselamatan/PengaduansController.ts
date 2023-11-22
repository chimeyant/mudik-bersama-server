import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Pengaduan from 'App/Models/Pengaduan';
import PengaduanValidator from 'App/Validators/Keselamatan/PengaduanValidator';
import Whatsapp from 'App/Helpers/Whatsapp';
import { DateTime } from 'luxon';


export default class PengaduansController {
  public async index({auth}: HttpContextContract) {
    const user = await auth.user
    if(user?.authent== 'user'){
      const pengaduans = await Pengaduan.query().preload('user').where('user_id',user.id).orderBy('created_at','desc')

      const datas:{}[]= []

      pengaduans.forEach(async element => {
        const row ={}
        row['id']= element.uuid;
        row['content']= element.content
        row['lat']= element.lat
        row['lng']=element.lng
        row['status']= element.statusDisplay
        row['aksi']= {
          id: element.uuid,
          disabled: element.userId == user?.id ? false:true
        }
        row['waktu']= element.createdAt
        row['pelapor']= element.user.name
        datas.push(row)
      });

      return datas;
    }else{
      const pengaduans = await Pengaduan.query().preload('user').orderBy('created_at','desc')

      const datas:{}[]= []

      pengaduans.forEach( async element => {
        const row ={}

        row['id']= element.uuid;
        row['content']= element.content
        row['lat']= element.lat
        row['lng']=element.lng
        row['status']= element.statusDisplay
        row['aksi']= {
          id: element.uuid,
          disabled: element.userId == user?.id ? true:true
        }
        row['waktu']= DateTime.fromISO( element.createdAt).toFormat("dd/mm/yyyy H:M:s")
        row['pelapor']= element.user.name
        datas.push(row)
      });

      return datas;
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response, auth}: HttpContextContract) {
    const user = await auth.user

    const {jenis_pengaduan_uuid, title, content, lat,lng , foto_awal} = request.all()

    await request.validate(PengaduanValidator)

    try {
      const pengaduan = new Pengaduan()
      pengaduan.userId= user.id
      pengaduan.jenisPengaduanUuid = jenis_pengaduan_uuid
      pengaduan.title = "Laporan"
      pengaduan.content = content
      pengaduan.fotoAwal = foto_awal
      pengaduan.lat = lat
      pengaduan.lng = lng
      pengaduan.status="1"
      await pengaduan.save()

      /*
       //kirim pesan wa
       const phonenumber = '081280008580';
       const pesan="*SINIKMAT LANTAS* \r\n `Nikmati Layanan Nyaman Bersama DISHUB Kab. Tangerang` \r\n\r\nHalo... \r\nTelah masuk informasi dengan perihal *"+ content + "*\r\n\r\nSalam, \r\n\r\nSINIKMAT LANTAS \r\nKabupaten Tangerang"

       // send message
       await Whatsapp.sendMessage(phonenumber, pesan)
       await Whatsapp.sendMessage('082299762711', pesan)
       await Whatsapp.sendMessage('085214104360', pesan)

       */

      return response.json({
        code:200,
        success:true,
        response:{
          message:"Proses pengaduan berhasil dikirim",
          data: pengaduan.dataview
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:'501',
        success:false,
        response:{},
        errors:{
          message:error
        }
      })

    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const pengaduan = await Pengaduan.findBy("uuid",id)

    return pengaduan?.datarecord;
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const pengaduan = await Pengaduan.findBy("uuid", id)
      await pengaduan?.delete()
      return response.status(200).json({
        code:200,
        success: true,
        response:{
          message:"Proses hapus data berhasil..!",
          data: id
        }
      })
    } catch (error) {
      return response.status(501).json({
        status:501,
        success:false,
        response:{},
        errors:{
          message: error
        }
      })
    }
  }

  public async setstatus({request,response}){
    const {id,status}= request.all()
    try {
      const  pengaduan = await Pengaduan.findBy("uuid",id)
      pengaduan?.merge({status:status})
      await pengaduan?.save()
      return response.json({
        success:true,
        response:{
          message:"Proses ubah status berhasil"
        }
      })
    } catch (error) {
      return response.statu(500).json({
        success:false,
        errors:error
      })
    }
  }

  private  phoneFormat(phonenumber){
    let formatted:string =phonenumber.replace(/\D/g, "");
    // 2. Menghilangkan angka 0 di depan (prefix
    //    Kemudian diganti dengan 62
    if (formatted.startsWith("0")) {
      formatted = "62" + formatted.substr(1);
    }

    if (!formatted.endsWith("")) {
      formatted;
    }

    return formatted;
  }


}
