import Pilar from "App/Models/Pilar";

class PilarService {
  async combo(){
    try {
      const  model = await Pilar.query().orderBy('id','asc')

      const datas:{}[] =[]

      model.forEach(element => {
        const row ={}
        row['value']= element.uuid
        row['text']= element.name
        datas.push(row)
      });
      return datas;
    } catch (error) {
      return []
    }
  }
}

export default PilarService
