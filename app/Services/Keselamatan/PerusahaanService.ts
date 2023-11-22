import Perusahaan from "App/Models/Perusahaan"

class PerusahaanService {
  protected Model = Perusahaan

  async fetch(){
    const model = await this.Model.query().orderBy('name','asc')

    const datas:{}[]=[]

    model.forEach(element => {
      datas.push(element.datadisplay)
    });

    return datas;
  }
}

export default new PerusahaanService
