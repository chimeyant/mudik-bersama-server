import User from "App/Models/User"
import {string} from "@ioc:Adonis/Core/Helpers"

export type UserType ={
  name: string,
  email:string,
  authent:string,
  remember_token:string,
  phone?:string,
  status:boolean,
  reset?:boolean,
  avatar:  string,
}

class UserService {
  protected Model = User

  async checkUser(email:any){
    const model = await this.Model.findBy("email", email)

    if(model){
      return true
    }else{
      return false
    }
  }

  async getUser(email:any){
    try {
      const model = await this.Model.findBy("email", email)

      return{
        success:true,
        user: model
      }
    } catch (error) {
      return{
        success:false,
        user:null,
      }
    }
  }

  async register(payload: UserType){
    try {
      const password  = string.generateRandom(8)
      const model = new this.Model

      model.name = payload.name
      model.email  = payload.email
      model.authent = payload.authent
      model.password = password
      model.rememberMeToken= payload.remember_token
      model.avatar = payload.avatar,
      model.status = payload.status
      await model.save()

      return {
        success:true,
        user: model
      }
    } catch (error) {
      return {
        success:false,
        user: null
      }
    }
  }
}

export default new UserService
