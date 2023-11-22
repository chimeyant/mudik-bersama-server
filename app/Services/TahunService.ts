import Tahun from "App/Models/Tahun";

interface TahunInterface {
  name:string,
  description:string,
}

class TahunService {
    public async lists(periode_uuid:string){
    const model = await Tahun.query().preload("periode").where("periode_uuid", periode_uuid).orderBy("name",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['periode']= element.periode.name
      row['name']= element.name
      row['description']= element.description
      datas.push(row)
    });

    return datas;
  }

  public async store(payload:TahunInterface, periode_uuid:string){
    try {
      const model = new Tahun
      model.periodeUuid = periode_uuid
      model.name = payload.name
      model.description = payload.description
      await model.save()

      await model.preload("periode")

      return{
        code:200,
        success:true,
        response:{
          message: "Proses tambah tahun berhasil..!",
          data: model.datadisplay
        }
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan"
        },
        errors:error
      }
    }
  }

  public async show(id:string){
    try {
      const model = await Tahun.findBy("uuid", id)
      return model?.datarecord
    } catch (error) {

    }
  }

  public async update(payload:TahunInterface, id:string){
    try {
      const model = await Tahun.findBy("uuid",id)
      model?.merge({name:payload.name, description: payload.description})
      await model?.save()

      await model?.preload("periode")

      return{
        code:200,
        success:true,
        response:{
          message:"Proses ubah data berhasil..!",
          data: model?.datadisplay
        },
        errors:[]
      }
    } catch (error) {
      return{
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan"
        },
        errors:error
      }
    }
  }

  public async delete(id:string){
    try {
      const model = await Tahun.findBy("uuid",id)
      await model?.delete()

      return {
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil..!",
          data:{id:id}
        },
        errors:[]
      }
    } catch (error) {
      return {
        code:500,
        success:false,
        response:{
          message:"Opps..., terjadi kesalahan",
          data:{}
        },
        errors:error
      }
    }
  }

  public async combo(periode_uuid:string){
    const model = await Tahun.query().where("periode_uuid", periode_uuid)
    const datas:{}[]=[]

    model.forEach(element => {
      const row ={}
      row['value']= element.uuid
      row['text']= element.name
      datas.push(row)
    });

    return datas;
  }
}

export default TahunService
