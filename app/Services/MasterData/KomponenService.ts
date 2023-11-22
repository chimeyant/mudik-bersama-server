import { MSG_DELETE_SUCCESS, MSG_ERROR, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import Komponen from "App/Models/Komponen"

export type KompenenType={
  name:string,
  status:boolean
}

class KomponenService {
  protected Model = Komponen

  async fetch(){
    const results = await this.Model.query().orderBy("name",'asc')

    const datas:{}[]=[]

    results.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas
  }

  async store(payload: KompenenType) {
    try {
      const model = new this.Model
      model.name = payload.name
      model.status  = payload.status
      await model.save()

      return {
        code:200,
        success:true,
        response:{
          message: MSG_STORE_SUCCESS,
          data: model.datadisplay
        }
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        response:{
          message:MSG_ERROR,
          data: {}
        },
        errors: error
      }
    }
  }

  async show(id:any){
    const model = await this.Model.findBy("uuid", id)

    return model?.datarecord
  }

  async update(payload: KompenenType, id:any){
    try {
      const model = await this.Model.findBy("uuid",id)
      model?.merge({
        name: payload.name,
        status: payload.status
      })
      await model?.save()

      return {
        code:200,
        success:require,
        response:{
          message:MSG_UPDATE_SUCCESS,
          data: model?.datarecord
        }
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        response:{
          message:MSG_ERROR,
          data:{}
        },
        errors:error
      }
    }
  }

  async delete(id:any){
    try {
      const model = await this.Model.findBy("uuid",id)
      await model?.delete()

      return {
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
      return {
        code:500,
        success:false,
        response:{
          message:MSG_ERROR,
        },
        errors:error
      }
    }
  }

  async combo(){
    const model = await this.Model.query().orderBy('name','asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.combo)
    });

    return datas;
  }

}

export default new KomponenService
