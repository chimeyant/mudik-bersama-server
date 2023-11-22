import Database from "@ioc:Adonis/Lucid/Database"
import { MSG_ERROR, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import DataJalan from "App/Models/DataJalan"

export type DataJalanType={
  name: string,
  type:string,
  polygon:string
}

class DataJalanService {
  protected DB = Database
  protected Model = DataJalan

  async fetch(){
    const model = await this.Model.query().orderBy("name",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas
  }

  async store(payload: DataJalanType){
    try {
      await this.DB.transaction(async (trx)=>{
        const model = new this.Model
        model.name = payload.name
        model.type = payload.type
        model.polygon = payload.polygon

        model.useTransaction(trx)

        await model.save()

        return {
          code:200,
          success:false,
          message:MSG_STORE_SUCCESS,
          data: model.datadisplay
        }
      })
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

  async update(payload:DataJalanType, id:string){
    try {
      const model = await this.Model.findBy("uuid", id)
      model?.merge({
        name:payload.name,
        type: payload.type,
        polygon: payload.polygon
      })
      await model?.save()

      return{
        code:200,
        success:true,
        message:MSG_UPDATE_SUCCESS,
        data:model?.datadisplay
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        message:MSG_ERROR,
        error:error
      }
    }
  }

  async delete(){}


}

export default new DataJalanService
