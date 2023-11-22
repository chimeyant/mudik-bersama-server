import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Pengaduan from 'App/Models/Pengaduan';
import JenisPengaduan from 'App/Models/JenisPengaduan';
import PengaduanValidator from 'App/Validators/Keselamatan/PengaduanValidator';
import Whatsapp from 'App/Helpers/Whatsapp';
import { DateTime } from 'luxon';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class PengaduansController {
  public async index({}: HttpContextContract) {
    const pengaduans = await Pengaduan.query().preload('user').orderBy('created_at','desc')

      const datas:{}[]= []

      pengaduans.forEach( async  (element) => {
        const row ={}
        row['id']= element.uuid;
        row['content']= element.content
        row['lat']= element.lat
        row['lng']=element.lng
        row['status']= element.statusDisplay
        row['waktu']= DateTime.fromISO( element.createdAt).toFormat("dd/mm/yyyy H:M:s")
        row['pelapor']= element.user ? element.user.name :'NA'
        row['url_foto']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/laporans/" + element.fotoAwal)
        datas.push(row)
      });

      return datas;
  }

  public async indexUser({auth}:HttpContextContract){
    const user = auth.user

    const pengaduans = await Pengaduan.query().preload('user').where('user_id',user.id).orderBy('created_at','desc')

    const datas:{}[]= []

      pengaduans.forEach( async  (element) => {
        const row ={}
        row['id']= element.uuid;
        row['content']= element.content
        row['lat']= element.lat
        row['lng']=element.lng
        row['status']= element.statusDisplay
        row['waktu']= DateTime.fromISO( element.createdAt).toFormat("dd/mm/yyyy H:M:s")
        row['pelapor']= null
        row['url_foto']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/laporans/" + element.fotoAwal)
        datas.push(row)
      });

      return datas;
  }



  public async store({request, response, auth}: HttpContextContract) {
    const user =  auth.user

    const {kode_jenis, content, lat,lng , foto_awal} = request.all()

    const jenispengaduan = await JenisPengaduan.findBy("kode",kode_jenis)

    // await request.validate(PengaduanValidator)
    try {
      const pengaduan = new Pengaduan()
      pengaduan.userId= user.id
      pengaduan.jenisPengaduanUuid = jenispengaduan?.uuid
      pengaduan.title = "Laporan"
      pengaduan.content = content
      pengaduan.fotoAwal = foto_awal
      pengaduan.lat = lat
      pengaduan.lng = lng
      pengaduan.status="1"
      await pengaduan.save()


       //kirim pesan wa
       const phonenumber = '081280008580';
       const pesan="*SINIKMAT LANTAS* \r\n `Nikmati Layanan Nyaman Bersama DISHUB Kab. Tangerang` \r\n\r\nHalo... \r\nTelah masuk informasi dengan perihal *"+ content + "*\r\n\r\nSalam, \r\n\r\nSINIKMAT LANTAS \r\nKabupaten Tangerang"

       // send message
       await Whatsapp.sendMessage(phonenumber, pesan)
       await Whatsapp.sendMessage('082299762711', pesan)
       await Whatsapp.sendMessage('085214104360', pesan)



      return response.json({
        code:200,
        success:true,
        message:"Proses kirim laporan berhasil..!",
        error:[]
      })
    }catch(error){
      return response.json({
        code:500,
        success:false,
        message:"Opps..., terjadi kesalahan",
        error:error
      })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
