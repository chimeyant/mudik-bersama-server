import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import JenisRambu from 'App/Models/JenisRambu'

export default class JenisRambuSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await JenisRambu.createMany([
      {name:'Rambu Peringatan'},
      {name:'Rambu Larangan'},
      {name:'Rambu Perintah'},
      {name:'Rambu Petunjuk'},
      {name:'Rambu Tambah'},
      {name:'Rambu Route Jalan'},
    ])
  }
}
