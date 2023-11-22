import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SekolahTingkat from 'App/Models/SekolahTingkat'

export default class SekolahTingkatSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await SekolahTingkat.createMany([
      {
        name:'TK/PAUD',
      },
      {
        name:'SEKOLAH DASAR (SD)',
      },
      {
        name:'Sekolah Menengah Pertama (SMP/SLTP',
      },
      {
        name:'SMA/SMK',
      },
      {
        name:'Universitas/Perguruan Tinggi',
      }
    ])
  }
}
