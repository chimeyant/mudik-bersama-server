import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Pilar from 'App/Models/Pilar'

export default class PilarSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Pilar.createMany([
      {
        name:'I. SISTEM YANG BERKESELAMATAN',
        description:"",
        nourut:1,
      },
      {
        name:'II. JALAN YANG BERKESELAMATAN',
        description:"",
        nourut:2,
      },
      {
        name:'III. KENDARAAN YANG BERKESELAMATAN',
        description:"",
        nourut:3,
      },
      {
        name:'IV. PENGGUNA JALAN YANG BERKESELAMATAN',
        description:"",
        nourut:4,
      },
      {
        name:'V. PENANGANAN KORBAN KECELAKAAN',
        description:"",
        nourut:5,
      }
    ])
  }
}
