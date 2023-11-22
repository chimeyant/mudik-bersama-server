import { MSG_DELETE_SUCCESS, MSG_ERROR, MSG_STORE_SUCCESS, MSG_UPDATE_SUCCESS } from "App/Helpers/Lang"
import Ditributor from "App/Models/Ditributor"

export type DistributionType={
  name:string,
  description:string,
  address:string,
  province_code:string,
  regency_code:string,
  district_code:string,
  village_code:string,
  owner:string,
  contact_person:string,
  telp:string,
  lat:string,
  lng:string
}

class DistributorService {
  protected Model = Ditributor

  async fetch(){
    const model = await this.Model.query().orderBy("name", "asc")

    const datas:{}[]=[]

    model.forEach(element => {
      const row = {}
      Object.assign(row, element.datadisplay)
      datas.push(row)
    });

    return datas
  }

  async store(payload: DistributionType){
    try {
      const model = new this.Model
      model.name = payload.name
      model.description = payload.description
      model.address = payload.address
      model.provinceCode = payload.province_code
      model.regencyCode = payload.regency_code
      model.districtCode = payload.district_code
      model.villageCode = payload.village_code
      model.owner = payload.owner
      model.contactPerson = payload.contact_person
      model.telp = payload.telp
      model.lat = payload.lat
      model.lng = payload.lng
      await model.save()

      return{
        code:200,
        success:true,
        response:{
          message:MSG_STORE_SUCCESS,
          data: model.datadisplay
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

  async show(id:any){
    const model = await this.Model.findBy("uuid",id)

    return model?.datarecord
  }

  async update(payload:DistributionType, id:any){
    try {
      const model = await this.Model.findBy("uuid",id)

      model?.merge({
        name:payload.name,
        description: payload.description,
        address: payload.address,
        provinceCode: payload.province_code,
        regencyCode: payload.regency_code,
        districtCode: payload.district_code,
        villageCode: payload.village_code,
        owner: payload.owner,
        telp: payload.telp,
        lat: payload.lat,
        lng: payload.lng
      })

      await model?.save()

      return{
        code:200,
        success:true,
        response:{
          message:MSG_UPDATE_SUCCESS,
          data: model?.datadisplay
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

  async delete(id:any){
    try {
      const model = await this.Model.findBy("uuid",id)
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
    const model = await this.Model.query().orderBy('name','asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.combo)
    });

    return datas;
  }
}

export default new DistributorService()
