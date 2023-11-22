/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return "API SERVICE SERVER SINIMAT LANTAS"
})


Route.get("sliders", "HalamanDepan/SlidersController.publish")
Route.get("berita-kabupaten","HalamanDepan/BeritasController.index")
Route.get("show-latest-video","HalamanDepan/VideosController.showLatestVideo")
Route.get("show-video","HalamanDepan/VideosController.showVideos")

Route.group(()=>{
  Route.group(()=>{
    Route.post("token","Auth/LoginController.login")
    Route.post('registrasi-perusahaan',"Auth/RegistrasiPerusahaansController.registrasi")
    Route.post('registrasi-user', "Auth/RegisterUsersController.registrasi")
  }).prefix("auth")

  Route.get("info","AppsController.index")

  Route.get("menus","AppsController.menus").middleware('auth')
  Route.get("user-info","Utility/UsersController.userInfo").middleware(['auth'])

  //Route public images

  //route media
  Route.post("media", "MediaController.store").middleware(["auth"]);
  Route.get("dashboard","DashboardController.index").middleware(['auth'])



  //route superadmin
  Route.group(()=>{
    Route.group(()=>{
      Route.resource("app-info","MasterData/AppInfosController")
      Route.resource('provinces',"MasterData/ProvincesController")
      Route.resource('regencies/:province_id',"MasterData/RegenciesController")
      Route.resource('jenis-rambu',"MasterData/JenisRambusController")
      Route.resource("rambu/:jenis_rambu_uuid", "MasterData/RambusController")
      Route.resource('jenis-pengaduan',"MasterData/JenisPengaduansController")
      Route.resource('pejabat',"MasterData/PejabatsController")
      Route.resource('document',"MasterData/DocumentsController")
      Route.resource('trayek',"MasterData/TrayeksController")
      Route.resource("opd", "MasterData/OpdsController")
      Route.resource("pilar","MasterData/PilarsController")
      Route.resource("program/:pilar_uuid","MasterData/ProgramsController")
      Route.resource("kegiatan/:program_uuid","MasterData/KegiatansController")
      Route.resource("pos","MasterData/PosController")
      Route.resource("sekolah", "MasterData/SekolahsController")
      Route.resource("perlintasan-kereta-api","MasterData/PerlintasanKeretaApisController")
      Route.resource("jenis-kendaraan-operational",'MasterData/JenisKendaraanOperationalsController')
      Route.resource("kendaraan-operasional",'MasterData/KendaraanOperationalsController')
      Route.resource("periode","MasterData/PeriodesController")
      Route.resource("tahun/:periode_uuid","MasterData/TahunsController")
      Route.resource("pasar","MasterData/PasarsController")
      Route.resource("komponen","MasterData/KomponensController")
    }).prefix("master-data").middleware(['auth'])
  }).prefix("superadmin")

  //route data combo
  Route.group(()=>{
    //combo wilayah
    Route.get('kecamatan',"MasterData/DistrictsController.combo")
    Route.get("desa/:district_uuid","MasterData/VillagesController.combo")
    Route.get('rambu',"MasterData/RambusController.combo")
    Route.get('jenis-pengaduan',"MasterData/JenisPengaduansController.combo")
    Route.get('trayek', "MasterData/TrayeksController.combo")
    Route.get("komponen","MasterData/KomponensController.combo")
    Route.get("opd","MasterData/OpdsController.combo")
    Route.get("pilar","MasterData/PilarsController.combo")
    Route.get('program/:pilar_uuid',"MasterData/ProgramsController.combo")
    Route.get('kegiatan/:program_uuid',"MasterData/KegiatansController.combo")
    Route.get("tingkat-sekolah","MasterData/SekolahTingkatsController.combo")
    Route.get("jenis-kendaraan","MasterData/JenisKendaraanOperationalsController.combo")
    Route.get("periode","MasterData/PeriodesController.combo")
    Route.get("tahun/:periode_uuid","MasterData/TahunsController.combo")
    Route.get("kendaraan","Inflasi/KendaraansController.combo")
    Route.get("distributor", "Inflasi/DistributorsController.combo")
    Route.get("pasar","MasterData/PasarsController.combo")
  }).prefix('combo').middleware('auth')

  //Route bidang keselamatan
  Route.group(()=>{
    Route.resource('lokasi-rambu',"Keselamatan/LokasiRambusController")
    Route.resource('laporan-keselamatan',"Keselamatan/PengaduansController")
    Route.post("laporan-keselamatan-set-status","Keselamatan/PengaduansController.setstatus")
    Route.resource('permohonan-ramcheck',"Keselamatan/PermohonansController")
    Route.resource("permohonan-tindak-lanjut/:uuid","Keselamatan/TindakLanjutsController" )
    Route.post('download-permohonan', "Keselamatan/TindakLanjutsController.downloadPermohonan")
    Route.resource("pemeriksaan/:permohonan_uuid", "Keselamatan/PemeriksaansController")
    Route.resource('pemeriksaan-document/:pemeriksaan_uuid', "Keselamatan/PemeriksaanDocumentsController")
    Route.post("permohonan-set-status/:id", "Keselamatan/PermohonansController.setstatus")
    Route.resource("renaksi","Keselamatan/RenaksisController")
    Route.resource('monitoring-renaksi',"Keselamatan/MonitoringRenaksisController")
    Route.get("renaksi-report-per-tahun/:tahun_uuid/:pilar_uuid","Keselamatan/MonitoringRenaksisController.print_report")
    Route.resource("data-perusahaan","Keselamatan/PerusahaansController")
  }).prefix("keselamatan").middleware(['auth'])

  //test

  //route utility
  Route.group(()=>{
    //Route manajemen pengguna
    Route.resource("users","Utility/UsersController")
    Route.post("update-profil","Utility/UsersController.updateProfil")
    Route.post("change-pwd","Utility/UsersController.changePwd")

    //Route manajemen fitur administrator
    Route.resource("fiturs","Utility/FitursController")
    Route.post("fiturs-set-progress","Utility/FitursController.setprogress")
    Route.post("fiturs-set-selesai","Utility/FitursController.setselesai")

    //Route manajemen fitur userr
    Route.resource("manajemen-fiturs","Utility/FiturUsersController")

    //Route Update History
    Route.resource("updates","Utility/UpdateHistoriesController")

  }).prefix('utility').middleware(['auth'])

  Route.group(()=>{
    Route.resource("sliders","HalamanDepan/SlidersController")
    Route.resource('videos',"HalamanDepan/VideosController")
  }).prefix("halaman-depan").middleware(['auth'])

  //Route Group Perusahaan
  Route.group(()=>{
    Route.resource("profil","Perusahaan/ProfilsController")
    Route.resource("permohonan","Perusahaan/PermohonansController")
    Route.post('kirim-permohonan',"Perusahaan/PermohonansController.kirimpermohonan")
    Route.post("kirim-pembatalan","Perusahaan/PermohonansController.batalkanpermohonan")
  }).prefix('perusahaan').middleware(['auth','perusahaan'])

  //Route Pengendalian
  Route.group(()=>{
    Route.resource("distributor","Inflasi/DistributorsController")
    Route.resource("kendaraan","Inflasi/KendaraansController")
    Route.resource("pengiriman","Inflasi/PengirimenController")
    Route.get("monit","Inflasi/MonitoringsController.index")
  }).prefix('inflasi').middleware(['auth'])


  //service sinikmatlantas mobile
  Route.group(()=>{
    Route.get("laporan-pengaduan","Mobiles/PengaduansController.index")
    Route.get('laporan-pengaduan-user',"Mobiles/PengaduansController.indexUser")
    Route.post("laporan-pengaduan","Mobiles/PengaduansController.store")
    Route.get("data-sekolah","Mobiles/DataSekolahsController.index")
    Route.get("data-perlintasan","Mobiles/DataPerlintasansController.index")
    Route.get("data-rambu","Mobiles/DataRambusController.index")
    Route.get("data-pos","Mobiles/DataPosController.index")
    Route.get("data-kendaraan","Mobiles/DataKendaraansController.index")
    Route.get("sliders","Mobiles/SlidersController.index")
  }).prefix("mobile").middleware(['auth'])


}).prefix("api")

