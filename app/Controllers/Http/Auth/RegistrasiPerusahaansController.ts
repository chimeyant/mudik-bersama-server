import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perusahaan from 'App/Models/Perusahaan'
import User from 'App/Models/User'
import RegisterPerusahaanValidator from 'App/Validators/Auth/RegisterPerusahaanValidator'
import Whatsapp from 'App/Helpers/Whatsapp'

export default class RegistrasiPerusahaansController {

  public async registrasi({request,response}: HttpContextContract){
    const {name, email, password, phone}= request.all()

    await request.validate(RegisterPerusahaanValidator)

    try {
      //tambah perusahaan baru
      const perusahaan = new Perusahaan
      perusahaan.name = name
      perusahaan.phone = phone
      await perusahaan.save()

      const user = new User
      user.name = name
      user.email = email
      user.password = password
      user.authent = 'perusahaan'
      user.perusahaanUuid = perusahaan.uuid
      user.phone = phone
      await user.save()

      //kirim pesan wa
      const pesan= "*SINIKMAT LANTAS* \r\n `Nikmati Layanan Nyaman Bersama DISHUB Kab. Tangerang` \r\n\r\nHalo... \r\n"+ user.name.toUpperCase() + "\r\n\r\nSelamat Anda telah terdaftar sebagai akun perusahaan pada sistem kami dengan data akun sebagai berikut :"+ "\r\nNama pengguna :  "+ email + "\r\nKata Sandi :  "+password+" \r\n\r\nSelanjutnya, untuk melengkapi  data profil perusahaan anda dan lainnya silahkan masuk di sistem kami \r\n\r\nSalam, \r\n\r\nSINIKMAT LANTAS \r\nKabupaten Tangerang"

      //send message whatsapp
      await Whatsapp.sendMessage(user.phone,pesan )



      return response.status(200).json({
        code :200,
        success:true,
        message:"Proses registrasi berhasil..."
      })

    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:[
          {
            message: "Opps..., terjadi kesalahan "+ error,
          }
        ]
      })
    }
  }

}
