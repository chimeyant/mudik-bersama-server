import Periode from "App/Models/Periode"



class PeriodeService {
  async combo(){
    const model = await Periode.query().orderBy('name', 'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      const row={}
      row['value']= element.uuid
      row['text']= element.name
      datas.push(row)
    });

    return datas;
  }
}

export default PeriodeService
