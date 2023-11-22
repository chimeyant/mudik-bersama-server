import Regency from "App/Models/Regency"

class RegencyService {
  protected Model = Regency

  async combo(){
    const model = await this.Model.query().where("province_id",36).orderBy("name",'asc')




  }

}

export default new RegencyService
