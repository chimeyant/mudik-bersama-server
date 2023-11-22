import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Komponen from 'App/Models/Komponen'

export default class KomponenSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Komponen.createMany([
      {name:'Lampu Belakang Kiri', status:true},
      {name:'Lampu Belakang Kanan', status:true},

    ])
  }
}
