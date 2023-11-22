import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ditributor from 'App/Models/Ditributor';
import Kendaraan from 'App/Models/Kendaraan';
import Pasar from 'App/Models/Pasar'

export default class MonitoringsController {
  async index({}:HttpContextContract){
    const pasar = await Pasar.query().orderBy("id",'asc')

    const datapasars:{}[]=[]

    pasar.forEach(element => {
      const row ={}
      row['id']= element.id
      row['position']= {lat: element.lat, lng: element.lng}
      row['tooltip']= "<h4>" + element.name + "</h4><div>"+ element.address +"</div>",
      row['icon']= "/images/pasar.png"
      row['draggable']= false
      row['visible']= true
      row['size']= [32,32]

      datapasars.push(row)
    });

    const distributor = await Ditributor.query().orderBy("id",'asc')

    distributor.forEach(element => {
      const row ={}
      row['id']= element.id
      row['position']= {lat: element.lat, lng: element.lng}
      row['tooltip']= "<h4>" + element.name + "</h4><div>"+ element.address +"</div>",
      row['icon']= "/images/distributor.png"
      row['draggable']= false
      row['visible']= true
      row['size']= [32,32]

      datapasars.push(row)
    });

    //jumlah pasar
    const jmlpasar = await Pasar.query().getCount()

    //jumlah distrobutor
    const jmldistributor = await Ditributor.query().getCount()

    //jumlah kendaraan
    const jmlkendaraan  = await Kendaraan.query().getCount()

    return{
      pasars: datapasars,
      jmlpasar: jmlpasar,
      jmldistributor: jmldistributor,
      jmlkendaraan: jmlkendaraan
    }
  }
}
