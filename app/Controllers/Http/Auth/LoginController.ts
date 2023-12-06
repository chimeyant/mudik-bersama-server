 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/Utility/UserService'

export default class LoginController {
  protected Service = UserService

  public async login({ally, response}: HttpContextContract){

    try {
      const provide = ally.use("google").stateless()

      return response.send(await provide.redirectUrl())

    } catch (error) {
      return response.send("Invalid credential..!" + error)
    }
  }

  public async loginCallback({ally,auth, response}:HttpContextContract){
    try {
      const provide = ally.use("google").stateless()

      if(provide.hasError()){
        return response.status(500).send({
          code:500,
          success:false,
          message:  provide.getError()
        })
      }

      const {token}= await provide.accessToken()

      const provideUser = await provide.userFromToken(token)

      const usercheck = await UserService.checkUser(provideUser.email)

      if(usercheck){
        //login proses
        const result = await this.Service.getUser(provideUser.email)

        const oat = await auth.use('api').login(result.user, {expiresIn: '1days'})

        return {
          code:200,
          success:true,
          token: oat,
        }

      }else{
        //register proses
        const payload ={
          name: provideUser.name,
          email: provideUser.email,
          authent: "user",
          remember_token: provideUser.token,
          avatar: provideUser.avatarUrl,
          status:true,
        }

        const result= await this.Service.register(payload)

        const oat = await auth.use('api').login(result.user, {expiresIn: '1days'})

        return {
          code:200,
          success:true,
          token: oat,
        }
      }
    } catch (error) {

    }
  }


}
