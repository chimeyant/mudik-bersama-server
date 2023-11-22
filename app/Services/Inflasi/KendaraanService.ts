import { MSG_DELETE_SUCCESS, MSG_ERROR, MSG_STORE_SUCCESS } from "App/Helpers/Lang"
import Kendaraan from "App/Models/Kendaraan"

export type KendaraanType={
  perusahaan_uuid:string,
  name: string,
  jenis:string,
  nomor:string,
  supir: string,
  telp: string,
  status: string
}

class KendaraanService {
  protected Model = Kendaraan

  async list(){
    const model = await this.Model.query().orderBy("nomor",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }

  async store(payload:KendaraanType){
    try {
      const model = new this.Model
      model.perusahaanUuid = payload.perusahaan_uuid
      model.name = payload.name
      model.jenis = payload.jenis
      model.nomor = payload.nomor,
      model.supir = payload.supir,
      model.telp = payload.telp,
      model.status = payload.status
      await model.save()

      return{
        code: 200,
        success:true,
        response:{
          message:MSG_STORE_SUCCESS,
          data: model.datadisplay
        }
      }
    } catch (error) {
      return{
        code:500,
        success: false,
        message:MSG_ERROR,
        error: error
      }
    }
  }

  async show(id: any){
    const model = await this.Model.findBy("uuid", id)

    return model?.datarecord
  }

  async update(payload: KendaraanType, id:any){
    try {
      const model = await this.Model.findBy("uuid", id)
      model?.merge({
        name: payload.name,
        jenis: payload.jenis,
        nomor: payload.nomor,
        supir: payload.supir,
        telp: payload.telp,
        status: payload.status
      })

      await model?.save()

      return{
        code: 200,
        success: true,
        response:{
          message:MSG_STORE_SUCCESS,
          data: model?.datadisplay
        }

      }
    } catch (error) {
      return{
        code : 500,
        success: false,
        message: MSG_ERROR,
        error: error
      }
    }
  }

  async delete(id:any){
    try {
      const model = await this.Model.findBy("uuid", id)
      await model?.delete()

      return{
        code: 200,
        success: true,
        response:{
          message:MSG_DELETE_SUCCESS,
          data: {
            id: id
          }
        }
      }
    } catch (error) {
      return{
        code: 500,
        success: false,
        message:MSG_ERROR,
        error: error

      }
    }
  }

  async combo(){
    const  model = await this.Model.query().orderBy("name",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.combo)
    });

    return datas

  }
}

export default new KendaraanService
