import Database from "@ioc:Adonis/Lucid/Database"
import { MSG_DELETE_SUCCESS, MSG_ERROR, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import Pasar from "App/Models/Pasar"

export type PasarType ={
  type:string,
  name:string,
  description:string,
  province_uuid:string,
  regency_uuid:string,
  district_uuid:string,
  village_uuid:string,
  address:string,
  lat:string,
  lng:string
  status:boolean,
}
class PasarService {
  protected DB = Database
  protected Model = Pasar

  async fetch(){
    const model = await this.Model.query().orderBy('name','asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  async store(payload:PasarType){


    try {
        const model = new this.Model
        model.type = payload.type,
        model.name = payload.name
        // model.provinceUuid = payload.province_uuid
        // model.regencyUuid = payload.regency_uuid
        model.districtUuid = payload.district_uuid
        // model.villageUuid  = payload.village_uuid
        model.address = payload.address
        model.lat = payload.lat
        model.lng = payload.lng
        model.status = payload.status
        await model.save()

        return{
          code:200,
          success:true,
          response:{
            message:MSG_STORE_SUCCESS,
            data:model.datadisplay
          }
        }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_ERROR,
        error:error
      }
    }
  }

  async show(id:string){
    const model = await this.Model.findBy("uuid",id)

    return model?.datarecord

  }

  async update(payload: PasarType,id:string){
    try {
        const model = await this.Model.findBy("uuid", id)
        model?.merge({
          type: payload.type,
          name:payload.name,
          description:payload.description,
          provinceUuid: payload.province_uuid,
          regencyUuid: payload.regency_uuid,
          districtUuid: payload.district_uuid,
          villageUuid: payload.village_uuid,
          address: payload.address,
          lat:payload.lat,
          lng:payload.lng,
          status: payload.status
        })

        await model?.save()

        return {
          code:200,
          success:true,
          response:{
            message:MSG_UPDATE_SUCCESS,
            data: model?.datadisplay
          }
        }
    } catch (error) {
      return {
        code:500,
        success:false,
        message:MSG_ERROR,
        error:error
      }
    }
  }

  async delete(id:string){
    try {
      const model = await this.Model.findBy("uuid", id)
      await model?.delete()

      return{
        code:200,
        success:true,
        response:{
          message:MSG_DELETE_SUCCESS,
          data:{
            id:id
          }
        }
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_ERROR,
        errors:error
      }
    }
  }

  async combo(){
    const model = await this.Model.query().orderBy("name",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.combo)
    });

    return datas;
  }


}

export default new PasarService
