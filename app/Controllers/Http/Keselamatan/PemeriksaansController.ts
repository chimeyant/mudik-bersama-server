import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pemeriksaan from 'App/Models/Pemeriksaan'
import PemeriksaanUnsur from 'App/Models/PemeriksaanUnsur';
import Permohonan from 'App/Models/Permohonan';
import KendaraanService from 'App/Services/Inflasi/KendaraanService';
import PemeriksaanValidator from 'App/Validators/Keselamatan/PemeriksaanValidator';
import { DateTime } from 'luxon';

export default class PemeriksaansController {
  public async index({params}: HttpContextContract) {
    const {permohonan_uuid} = params

    const pemeriksaans = await Pemeriksaan.query().preload("permohonan").where('permohonan_uuid', permohonan_uuid).orderBy('id','asc');



    const datas:{}[]=[]

    pemeriksaans.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['hari']= element.hari.toUpperCase() + ", "+  DateTime.fromJSDate(element.tanggal).toFormat("dd/MM/yyyy")
      row['nomor_kendaraan']= element.nomorKendaraan
      row['nama_po']= element.namaPo
      row['nama_pengemudi']= element.namaPengemudi
      row['jsonlaik']= element.laikJalan
      const jsonlaik =element.laikJalan

      row['status']= jsonlaik ? jsonlaik.length > 0 ? {color:'green',text:"Laik Jalan"} : {color:'red', text:'Tidak Laik Jalan'}:{color:'red', text:'Tidak Laik Jalan'}
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({params, request, response}: HttpContextContract) {
    const {permohonan_uuid} = params

    const {tanggal, hari,nomor_kendaraan, lokasi,nama_lokasi, nama_pengemudi, umur,nama_po, jenis_kendaraan, nomor_stuk, jenis_angkutan, trayek_uuid,inflasi, jenis_mobil }= request.all()

    //komponen unsur administrasi
    const {kartu_uji_stuk_ijin, kartu_uji_stuk_tilang, kp_reguler_ijin, kp_reguler_tilang, kp_cadangan_ijin, kp_cadangan_tilang, sim_pengemudi_ijin, sim_pengemudi_tilang }= request.all()

    //komponen kesimpulan
    const {laik_jalan, tidak_laik_jalan, catatan}= request.all()

    await request.validate(PemeriksaanValidator)

    try {
      //buka data permohonan
      const permohonan = await Permohonan.findBy("uuid", permohonan_uuid)

      const pemeriksaan = new Pemeriksaan()
      pemeriksaan.permohonanUuid = permohonan_uuid
      pemeriksaan.tanggal = tanggal
      pemeriksaan.hari = hari
      pemeriksaan.nomorKendaraan= nomor_kendaraan
      pemeriksaan.lokasi = lokasi
      pemeriksaan.namaLokasi = nama_lokasi
      pemeriksaan.namaPengemudi = nama_pengemudi
      pemeriksaan.umur= umur
      pemeriksaan.namaPo = nama_po
      pemeriksaan.jenisKendaraan = jenis_kendaraan
      pemeriksaan.nomorStuk = nomor_stuk
      pemeriksaan.jenisAngkutan = jenis_angkutan
      pemeriksaan.trayekUuid = trayek_uuid

      //kesimpulan
      pemeriksaan.laikJalan = JSON.stringify(laik_jalan)
      pemeriksaan.tidakLaikJalan = JSON.stringify(tidak_laik_jalan)
      pemeriksaan.catatan = catatan
      pemeriksaan.status = '3'
      await pemeriksaan.save()

      //simpan hasil unsur pemeriksanaan administrasi
      const unsur = new PemeriksaanUnsur
      unsur.pemeriksaanUuid= pemeriksaan.uuid
      unsur.kartuUjiStukIjin = JSON.stringify(kartu_uji_stuk_ijin)
      unsur.kartuUjiStukTilang = JSON.stringify(kartu_uji_stuk_tilang)
      unsur.kpRegulerIjin= JSON.stringify(kp_reguler_ijin)
      unsur.kpRegulerTilang=JSON.stringify(kp_reguler_tilang)
      unsur.kpCadanganIjin = JSON.stringify(kp_cadangan_ijin)
      unsur.kpCadanganTilang = JSON.stringify(kp_cadangan_tilang)
      unsur.simPengemudiIjin= JSON.stringify(sim_pengemudi_ijin)
      unsur.simPengemudiTilang= JSON.stringify(sim_pengemudi_tilang)

      //simpan unsur teknis utama
      //komponen unsur teknis utama
      const {lampu_utama_dekat_ijin, lampu_utama_dekat_tilang, lampu_utama_jauh_ijin, lampu_utama_jauh_tilang,lampu_sien_depan_ijin, lampu_sien_depan_tilang, lampu_sien_belakang_ijin, lampu_sien_belakang_tilang, lampu_rem_ijin, lampu_rem_tilang, lampu_mundur_ijin, lampu_mundur_tilang,kondisi_rem_utama_ijin, kondisi_rem_utama_tilang, kondisi_rem_parkir_ijin, kondisi_rem_parkir_tilang, kondisi_kaca_depan_ijin, kondisi_kaca_depan_tilang, pintu_utama_ijin, pintu_utama_tilang,kondisi_ban_depan_ijin, kondisi_ban_depan_tilang, kondisi_ban_belakang_ijin, kondisi_ban_belakang_tilang, sabuk_pengaman_ijin,sabuk_pengaman_tilang,pengukur_kecepatan_ijin, pengukur_kecepatan_tilang, penghapus_kaca_ijin, penghapus_kaca_tilang, pintu_darurat_ijin, pintu_darurat_tilang, jendela_darurat_ijin, jendela_darurat_tilang,alat_pemecah_kaca_ijin, alat_pemecah_kaca_tilang} = request.all()

      unsur.lampuUtamaDekatIjin = JSON.stringify(lampu_utama_dekat_ijin)
      unsur.lampuUtamaDekatTilang = JSON.stringify(lampu_utama_dekat_tilang)
      unsur.lampuUtamaJauhIjin = JSON.stringify(lampu_utama_jauh_ijin)
      unsur.lampuUtamaJauhTilang = JSON.stringify(lampu_utama_jauh_tilang)
      unsur.lampuSienDepanIjin = JSON.stringify(lampu_sien_depan_ijin)
      unsur.lampuSienDepanTilang = JSON.stringify(lampu_sien_depan_tilang)
      unsur.lampuSienBelakangIjin = JSON.stringify(lampu_sien_belakang_ijin)
      unsur.lampuSienBelakangTilang = JSON.stringify(lampu_sien_belakang_tilang)
      unsur.lampuRemIjin = JSON.stringify(lampu_rem_ijin)
      unsur.lampuRemTilang = JSON.stringify(lampu_rem_tilang)
      unsur.lampuMundurIjin = JSON.stringify(lampu_mundur_ijin)
      unsur.lampuMundurTilang = JSON.stringify(lampu_mundur_tilang)
      unsur.kondisiRemUtamaIjin = JSON.stringify(kondisi_rem_utama_ijin);
      unsur.kondisiRemUtamaTilang = JSON.stringify(kondisi_rem_utama_tilang)
      unsur.kondisiRemParkirIjin = JSON.stringify(kondisi_rem_parkir_ijin)
      unsur.kondisiRemParkirTilang = JSON.stringify(kondisi_rem_parkir_tilang)
      unsur.kondisiKacaDepanIjin = JSON.stringify(kondisi_kaca_depan_ijin)
      unsur.kondisiKacaDepanTilang = JSON.stringify(kondisi_kaca_depan_tilang)
      unsur.pintuUtamaIjin = JSON.stringify(pintu_utama_ijin)
      unsur.pintuUtamaTilang = JSON.stringify(pintu_utama_tilang)
      unsur.kondisiBanDepanIjin = JSON.stringify(kondisi_ban_depan_ijin)
      unsur.kondisiBanDepanTilang = JSON.stringify(kondisi_ban_depan_tilang)
      unsur.kondisiBanBelakangIjin = JSON.stringify(kondisi_ban_belakang_ijin)
      unsur.kondisiBanBelakangTilang = JSON.stringify(kondisi_ban_belakang_tilang)
      unsur.sabukPengamanIjin = JSON.stringify(sabuk_pengaman_ijin)
      unsur.sabukPengamanTilang = JSON.stringify(sabuk_pengaman_tilang)
      unsur.pengukurKecepatanIjin = JSON.stringify(pengukur_kecepatan_ijin)
      unsur.pengukurKecepatanTilang = JSON.stringify(pengukur_kecepatan_tilang)
      unsur.penghapusKacaIjin = JSON.stringify(penghapus_kaca_ijin)
      unsur.penghapusKacaTilang = JSON.stringify(penghapus_kaca_tilang)
      unsur.pintuDaruratIjin = JSON.stringify(pintu_darurat_ijin)
      unsur.pintuDaruratTilang = JSON.stringify(pintu_darurat_tilang)
      unsur.jendelaDaruratIjin = JSON.stringify(jendela_darurat_ijin)
      unsur.jendelaDaruratTilang = JSON.stringify(jendela_darurat_tilang)
      unsur.alatPemecahKacaIjin = JSON.stringify(alat_pemecah_kaca_ijin)
      unsur.alatPemecahKacaTilang = JSON.stringify(alat_pemecah_kaca_tilang)

      /**
       * Unsur-unsur teknis penunjang
       */
      const {lampu_posisi_depan_ijin, lampu_posisi_depan_tilang, lampu_posisi_belakang_ijin, lampu_posisi_belakang_tilang,kaca_spion_ijin, kaca_spion_tilang, klakson_ijin, klakson_tilang, lantai_tangga_ijin, lantai_tangga_tilang,jlh_tempat_duduk_ijin, jlh_tempat_duduk_tilang, ban_cadangan_ijin, ban_cadangan_tilang, segitiga_pengaman_ijin, segitiga_pengaman_tilang, dongkrak_ijin, dongkrak_tilang,pembuka_roda_ijin, pembuka_roda_tilang, lampu_senter_ijin, lampu_senter_tilang }= request.all()

      unsur.lampuPosisiDepanIjin = JSON.stringify(lampu_posisi_depan_ijin)
      unsur.lampuPosisiDepanTilang = JSON.stringify(lampu_posisi_depan_tilang)
      unsur.lampuPosisiBelakangIjin = JSON.stringify(lampu_posisi_belakang_ijin)
      unsur.lampuPosisiBelakangTilang = JSON.stringify(lampu_posisi_belakang_tilang)
      unsur.kacaSpionIjin = JSON.stringify(kaca_spion_ijin)
      unsur.kacaSpionTilang = JSON.stringify(kaca_spion_tilang)
      unsur.klaksonIjin = JSON.stringify(klakson_ijin)
      unsur.klaksonTilang = JSON.stringify(klakson_tilang)
      unsur.lantaiTanggaIjin = JSON.stringify(lantai_tangga_ijin)
      unsur.lantaiTanggaTilang = JSON.stringify(lantai_tangga_tilang)
      unsur.jlhTempatDudukIjin = JSON.stringify(jlh_tempat_duduk_ijin)
      unsur.jlhTempatDudukTilang = JSON.stringify(jlh_tempat_duduk_tilang)
      unsur.banCadanganIjin = JSON.stringify(ban_cadangan_ijin)
      unsur.banCadanganTilang = JSON.stringify(ban_cadangan_tilang)
      unsur.segitigaPengamanIjin = JSON.stringify(segitiga_pengaman_ijin)
      unsur.segitigaPengamanTilang = JSON.stringify(segitiga_pengaman_tilang)
      unsur.dongkrakIjin = JSON.stringify(dongkrak_ijin)
      unsur.dongkrakTilang = JSON.stringify(dongkrak_tilang)
      unsur.pembukaRodaIjin = JSON.stringify(pembuka_roda_ijin)
      unsur.pembukaRodaTilang = JSON.stringify(pembuka_roda_tilang)
      unsur.lampuSenterIjin = JSON.stringify(lampu_senter_ijin)
      unsur.lampuSenterTilang = JSON.stringify(lampu_senter_tilang)

      await unsur.save()

      if(inflasi){
        //save ke dalam kendaraan service
        const kendaraanpayload = {
          perusahaan_uuid: permohonan?.perusahaanUuid,
          name: nomor_kendaraan + ' ('+ nama_po +")",
          jenis: jenis_mobil,
          nomor: nomor_kendaraan,
          supir: nama_pengemudi,
          status:true
        }

        await KendaraanService.store(kendaraanpayload)
      }


      return response.status(200).json({
        success:true,
        code:200,
        response: {
          message:"Proses simpan data berhasil..."
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{},
        errors:error
      })
    }

  }

  public async show({params}: HttpContextContract) {
    const {id} = params

    const pemeriksaan = await Pemeriksaan.findBy("uuid", id)

    const data={}
    data['id']= pemeriksaan?.uuid
    data['tanggal'] = DateTime.fromJSDate(pemeriksaan?.tanggal).toFormat("yyyy-MM-dd")
    data['hari']= pemeriksaan?.hari
    data['lokasi']= pemeriksaan?.lokasi
    data['nama_lokasi']=pemeriksaan?.namaLokasi
    data['nama_pengemudi']= pemeriksaan?.namaPengemudi
    data['umur']= pemeriksaan?.umur
    data['nama_po']= pemeriksaan?.namaPo
    data['nomor_kendaraan']= pemeriksaan?.nomorKendaraan
    data['jenis_kendaraan']= pemeriksaan?.jenisKendaraan
    data['nomor_stuk']= pemeriksaan?.nomorStuk
    data['jenis_angkutan']= pemeriksaan?.jenisAngkutan
    data['trayek_uuid']= pemeriksaan?.trayekUuid

    /**
     * Load data pemeriksaan
     */
    const unsur = await PemeriksaanUnsur.findBy("pemeriksaan_uuid", pemeriksaan?.uuid)

    /**
     * Data Unsur Administrasi
     */
    data['kartu_uji_stuk_ijin']= JSON.parse(unsur?.kartuUjiStukIjin)
    data['kartu_uji_stuk_tilang']= JSON.parse(unsur?.kartuUjiStukTilang)
    data['kp_reguler_ijin']= JSON.parse(unsur?.kpRegulerIjin)
    data['kp_reguler_tilang']= JSON.parse(unsur?.kpRegulerTilang)
    data['kp_cadangan_ijin']= JSON.parse(unsur?.kpCadanganIjin)
    data['kp_cadangan_tilang']= JSON.parse(unsur?.kpCadanganTilang)
    data['sim_pengemudi_ijin']= JSON.parse(unsur?.simPengemudiIjin)
    data['sim_pengemudi_tilang']= JSON.parse(unsur?.simPengemudiTilang)

    /**
     * Data Unsur Teknis Utama
     */
    data['lampu_utama_dekat_ijin']= JSON.parse(unsur?.lampuUtamaDekatIjin)
    data['lampu_utama_dekat_tilang']= JSON.parse(unsur?.lampuUtamaDekatTilang)
    data['lampu_utama_jauh_ijin']=JSON.parse(unsur?.lampuUtamaJauhIjin)
    data['lampu_utama_jauh_tilang']=JSON.parse(unsur?.lampuUtamaJauhTilang)
    data['lampu_sien_depan_ijin']=JSON.parse(unsur?.lampuSienDepanIjin)
    data['lampu_sien_depan_tilang']=JSON.parse(unsur?.lampuSienDepanTilang)
    data['lampu_sien_belakang_ijin']=JSON.parse(unsur?.lampuSienBelakangIjin)
    data['lampu_sien_belakang_tilang']=JSON.parse(unsur?.lampuSienBelakangTilang)
    data['lampu_rem_ijin']=JSON.parse(unsur?.lampuRemIjin)
    data['lampu_rem_tilang']=JSON.parse(unsur?.lampuRemTilang)
    data['lampu_mundur_ijin']=JSON.parse(unsur?.lampuMundurIjin)
    data['lampu_mundur_tilang']=JSON.parse(unsur?.lampuMundurTilang)
    data['kondisi_rem_utama_ijin']=JSON.parse(unsur?.kondisiRemUtamaIjin)
    data['kondisi_rem_utama_tilang']=JSON.parse(unsur?.kondisiRemUtamaTilang)
    data['kondisi_rem_parkir_ijin']=JSON.parse(unsur?.kondisiRemParkirIjin)
    data['kondisi_rem_parkir_tilang']=JSON.parse(unsur?.kondisiRemParkirTilang)
    data['kondisi_kaca_depan_ijin']=JSON.parse(unsur?.kondisiKacaDepanIjin)
    data['kondisi_kaca_depan_tilang']=JSON.parse(unsur?.kondisiKacaDepanTilang)
    data['pintu_utama_ijin']= JSON.parse(unsur?.pintuUtamaIjin)
    data['pintu_utama_tilang']=JSON.parse(unsur?.pintuUtamaTilang)
    data['kondisi_ban_depan_ijin']=JSON.parse(unsur?.kondisiBanDepanIjin)
    data['kondisi_ban_depan_tilang']= JSON.parse(unsur?.kondisiBanDepanTilang)
    data['kondisi_ban_belakang_ijin']=JSON.parse(unsur?.kondisiBanBelakangIjin)
    data["kondisi_ban_belakang_tilang"]=JSON.parse(unsur?.kondisiBanBelakangTilang)
    data['sabuk_pengaman_ijin']= JSON.parse(unsur?.sabukPengamanIjin)
    data['sabuk_pengaman_tilang']=JSON.parse(unsur?.sabukPengamanTilang)
    data['pengukur_kecepatan_ijin']=JSON.parse(unsur?.pengukurKecepatanIjin)
    data['pengukur_kecepatan_tilang']=JSON.parse(unsur?.pengukurKecepatanTilang)
    data['penghapus_kaca_ijin']=JSON.parse(unsur?.penghapusKacaIjin)
    data['penghapus_kaca_tilang']=JSON.parse(unsur?.penghapusKacaTilang)
    data['pintu_darurat_ijin']=JSON.parse(unsur?.pintuDaruratIjin)
    data['pintu_darurat_tilang']=JSON.parse(unsur?.pintuDaruratTilang)
    data['jendela_darurat_ijin']=JSON.parse(unsur?.jendelaDaruratIjin)
    data['jendela_darurat_tilang']=JSON.parse(unsur?.jendelaDaruratTilang)
    data['alat_pemecah_kaca_ijin']=JSON.parse(unsur?.alatPemecahKacaIjin)
    data['alat_pemecah_kaca_tilang']=JSON.parse(unsur?.alatPemecahKacaTilang)

    /**
     * Unsur Teknis Penunjang
     */
    data['lampu_posisi_depan_ijin']= JSON.parse(unsur?.lampuPosisiDepanIjin)
    data['lampu_posisi_depan_tilang']=JSON.parse(unsur?.lampuPosisiDepanTilang)
    data['lampu_posisi_belakang_ijin']=JSON.parse(unsur?.lampuPosisiBelakangIjin)
    data['lampu_posisi_belakang_tilang']=JSON.parse(unsur?.lampuPosisiBelakangTilang)
    data['kaca_spion_ijin']=JSON.parse(unsur?.kacaSpionIjin)
    data['kaca_spion_tilang']=JSON.parse(unsur?.kacaSpionTilang)
    data['klakson_ijin']=JSON.parse(unsur?.klaksonIjin)
    data['klakson_tilang']=JSON.parse(unsur?.kacaSpionTilang)
    data['lantai_tangga_ijin']=JSON.parse(unsur?.lantaiTanggaIjin)
    data['lantai_tangga_tilang']=JSON.parse(unsur?.lantaiTanggaTilang)
    data['jlh_tempat_duduk_ijin']=JSON.parse(unsur?.jlhTempatDudukIjin)
    data['jlh_tempat_duduk_tilang']=JSON.parse(unsur?.jlhTempatDudukTilang)
    data['ban_cadangan_ijin']=JSON.parse(unsur?.banCadanganIjin)
    data['ban_cadangan_tilang']=JSON.parse(unsur?.banCadanganTilang)
    data['segitiga_pengaman_ijin']=JSON.parse(unsur?.segitigaPengamanIjin)
    data['segitiga_pengaman_tilang']=JSON.parse(unsur?.segitigaPengamanTilang)
    data['dongkrak_ijin']= JSON.parse(unsur?.dongkrakIjin)
    data['dongkrak_tilang']= JSON.parse(unsur?.dongkrakTilang)
    data['pembuka_roda_ijin']=JSON.parse(unsur?.pembukaRodaIjin)
    data['pembuka_roda_tilang']=JSON.parse(unsur?.pembukaRodaTilang)
    data['lampu_senter_ijin']=JSON.parse(unsur?.lampuSenterIjin)
    data['lampu_senter_tilang']=JSON.parse(unsur?.lampuSenterTilang)

    /**
     * Kesimpulan
     */
    data['laik_jalan']= JSON.parse(pemeriksaan?.laikJalan)
    data['tidak_laik_jalan']=JSON.parse(pemeriksaan?.tidakLaikJalan)
    data['status']= pemeriksaan?.status
    data['catatan']= pemeriksaan?.catatan


    return data;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params

    const {tanggal, hari,nomor_kendaraan, lokasi,nama_lokasi, nama_pengemudi, umur,nama_po, jenis_kendaraan, nomor_stuk, jenis_angkutan, trayek_uuid, }= request.all()

    //komponen unsur administrasi
    const {kartu_uji_stuk_ijin, kartu_uji_stuk_tilang, kp_reguler_ijin, kp_reguler_tilang, kp_cadangan_ijin, kp_cadangan_tilang, sim_pengemudi_ijin, sim_pengemudi_tilang }= request.all()

    //komponen kesimpulan
    const {laik_jalan, tidak_laik_jalan, catatan}= request.all()

    await request.validate(PemeriksaanValidator)

    try {
      const pemeriksaan = await Pemeriksaan.findBy("uuid", id)
      pemeriksaan?.merge({
        tanggal:tanggal,
        hari:hari,
        nomorKendaraan:nomor_kendaraan,
        lokasi:lokasi,
        namaLokasi: nama_lokasi,
        namaPengemudi:nama_pengemudi,
        umur:umur,
        namaPo:nama_po,
        jenisKendaraan:jenis_kendaraan,
        nomorStuk:nomor_stuk,
        jenisAngkutan:jenis_angkutan,
        trayekUuid:trayek_uuid,
        laikJalan: JSON.stringify( laik_jalan),
        tidakLaikJalan: JSON.stringify( tidak_laik_jalan),
        catatan:catatan,
        status:"3"
      })

      await pemeriksaan?.save()

      //simpan hasil unsur pemeriksanaan administrasi
      const unsur = await PemeriksaanUnsur.findBy("pemeriksaan_uuid", pemeriksaan?.uuid)
      unsur?.merge({
        kartuUjiStukIjin: JSON.stringify(kartu_uji_stuk_ijin),
        kartuUjiStukTilang: JSON.stringify( kartu_uji_stuk_tilang),
        kpRegulerIjin: JSON.stringify( kp_reguler_ijin),
        kpRegulerTilang:JSON.stringify(kp_reguler_tilang),
        kpCadanganIjin: JSON.stringify(kp_cadangan_ijin),
        kpCadanganTilang:JSON.stringify(  kp_cadangan_tilang),
        simPengemudiIjin:JSON.stringify( sim_pengemudi_ijin),
        simPengemudiTilang: JSON.stringify( sim_pengemudi_tilang),
      })

      //simpan unsur teknis utama
      const {lampu_utama_dekat_ijin, lampu_utama_dekat_tilang, lampu_utama_jauh_ijin, lampu_utama_jauh_tilang,lampu_sien_depan_ijin, lampu_sien_depan_tilang, lampu_sien_belakang_ijin, lampu_sien_belakang_tilang, lampu_rem_ijin, lampu_rem_tilang, lampu_mundur_ijin, lampu_mundur_tilang,kondisi_rem_utama_ijin, kondisi_rem_utama_tilang, kondisi_rem_parkir_ijin, kondisi_rem_parkir_tilang, kondisi_kaca_depan_ijin, kondisi_kaca_depan_tilang, pintu_utama_ijin, pintu_utama_tilang,kondisi_ban_depan_ijin, kondisi_ban_depan_tilang, kondisi_ban_belakang_ijin, kondisi_ban_belakang_tilang, sabuk_pengaman_ijin,sabuk_pengaman_tilang,pengukur_kecepatan_ijin, pengukur_kecepatan_tilang, penghapus_kaca_ijin, penghapus_kaca_tilang, pintu_darurat_ijin, pintu_darurat_tilang, jendela_darurat_ijin, jendela_darurat_tilang,alat_pemecah_kaca_ijin, alat_pemecah_kaca_tilang} = request.all()

      unsur?.merge({
        lampuUtamaDekatIjin:JSON.stringify(lampu_utama_dekat_ijin),
        lampuUtamaDekatTilang: JSON.stringify(lampu_utama_dekat_tilang),
        lampuUtamaJauhIjin: JSON.stringify(lampu_utama_jauh_ijin),
        lampuUtamaJauhTilang: JSON.stringify(lampu_utama_jauh_tilang),
        lampuSienDepanIjin: JSON.stringify(lampu_sien_depan_ijin),
        lampuSienDepanTilang:JSON.stringify(lampu_sien_depan_tilang),
        lampuSienBelakangIjin:JSON.stringify(lampu_sien_belakang_ijin),
        lampuSienBelakangTilang: JSON.stringify(lampu_sien_belakang_tilang),
        lampuRemIjin: JSON.stringify(lampu_rem_ijin),
        lampuRemTilang: JSON.stringify(lampu_rem_tilang),
        lampuMundurIjin: JSON.stringify(lampu_mundur_ijin),
        lampuMundurTilang: JSON.stringify(lampu_mundur_tilang),
        kondisiRemUtamaIjin: JSON.stringify(kondisi_rem_utama_ijin),
        kondisiRemUtamaTilang: JSON.stringify(kondisi_rem_utama_tilang),
        kondisiRemParkirIjin: JSON.stringify(kondisi_rem_parkir_ijin),
        kondisiRemParkirTilang: JSON.stringify(kondisi_rem_parkir_tilang),
        kondisiKacaDepanIjin: JSON.stringify(kondisi_kaca_depan_ijin),
        kondisiKacaDepanTilang: JSON.stringify(kondisi_kaca_depan_tilang),
        pintuUtamaIjin: JSON.stringify(pintu_utama_ijin),
        pintuUtamaTilang: JSON.stringify(pintu_utama_tilang),
        kondisiBanDepanIjin: JSON.stringify(kondisi_ban_depan_ijin),
        kondisiBanDepanTilang: JSON.stringify(kondisi_ban_depan_tilang),
        kondisiBanBelakangIjin: JSON.stringify(kondisi_ban_belakang_ijin),
        kondisiBanBelakangTilang: JSON.stringify(kondisi_ban_belakang_tilang),
        sabukPengamanIjin: JSON.stringify(sabuk_pengaman_ijin),
        sabukPengamanTilang: JSON.stringify(sabuk_pengaman_tilang),
        pengukurKecepatanIjin: JSON.stringify(pengukur_kecepatan_ijin),
        pengukurKecepatanTilang:JSON.stringify(pengukur_kecepatan_tilang),
        penghapusKacaIjin: JSON.stringify(penghapus_kaca_ijin),
        penghapusKacaTilang: JSON.stringify(penghapus_kaca_tilang),
        pintuDaruratIjin: JSON.stringify(pintu_darurat_ijin),
        pintuDaruratTilang: JSON.stringify(pintu_darurat_tilang),
        jendelaDaruratIjin: JSON.stringify(jendela_darurat_ijin),
        jendelaDaruratTilang: JSON.stringify(jendela_darurat_tilang),
        alatPemecahKacaIjin: JSON.stringify(alat_pemecah_kaca_ijin),
        alatPemecahKacaTilang: JSON.stringify(alat_pemecah_kaca_tilang),
      })



      /**
       * Unsur-unsur teknis penunjang
       */
      const {lampu_posisi_depan_ijin, lampu_posisi_depan_tilang, lampu_posisi_belakang_ijin, lampu_posisi_belakang_tilang,kaca_spion_ijin, kaca_spion_tilang, klakson_ijin, klakson_tilang, lantai_tangga_ijin, lantai_tangga_tilang,jlh_tempat_duduk_ijin, jlh_tempat_duduk_tilang, ban_cadangan_ijin, ban_cadangan_tilang, segitiga_pengaman_ijin, segitiga_pengaman_tilang, dongkrak_ijin, dongkrak_tilang,pembuka_roda_ijin, pembuka_roda_tilang, lampu_senter_ijin, lampu_senter_tilang }= request.all()

      unsur?.merge({
        lampuPosisiDepanIjin: JSON.stringify(lampu_posisi_depan_ijin),
        lampuPosisiDepanTilang: JSON.stringify(lampu_posisi_depan_tilang),
        lampuPosisiBelakangIjin: JSON.stringify(lampu_posisi_belakang_ijin),
        lampuPosisiBelakangTilang: JSON.stringify(lampu_posisi_belakang_tilang),
        kacaSpionIjin: JSON.stringify(kaca_spion_ijin),
        kacaSpionTilang: JSON.stringify(kaca_spion_tilang),
        klaksonIjin: JSON.stringify(klakson_ijin),
        klaksonTilang: JSON.stringify(klakson_tilang),
        lantaiTanggaIjin: JSON.stringify(lantai_tangga_ijin),
        lantaiTanggaTilang: JSON.stringify(lantai_tangga_tilang),
        jlhTempatDudukIjin: JSON.stringify(jlh_tempat_duduk_ijin),
        jlhTempatDudukTilang: JSON.stringify(jlh_tempat_duduk_tilang),
        banCadanganIjin: JSON.stringify(ban_cadangan_ijin),
        banCadanganTilang:JSON.stringify(ban_cadangan_tilang),
        segitigaPengamanIjin: JSON.stringify(segitiga_pengaman_ijin),
        segitigaPengamanTilang: JSON.stringify(segitiga_pengaman_tilang),
        dongkrakIjin: JSON.stringify(dongkrak_ijin),
        dongkrakTilang: JSON.stringify(dongkrak_tilang),
        pembukaRodaIjin: JSON.stringify(pembuka_roda_ijin),
        pembukaRodaTilang: JSON.stringify(pembuka_roda_tilang),
        lampuSenterIjin: JSON.stringify(lampu_senter_ijin),
        lampuSenterTilang: JSON.stringify(lampu_senter_tilang)
      })

      await unsur?.save()

      return response.status(200).json({
        success:true,
        code:200,
        response: {
          message:"Proses ubah data berhasil..."
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{},
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const pemeriksaan = await Pemeriksaan.findBy("uuid", id)
      pemeriksaan?.delete()

      const unsur = await PemeriksaanUnsur.findBy('pemeriksaan_uuid', id)
      await unsur?.delete()

      return response.status(200).json({
        success:true,
        response:{
          message:"Proses hapus data berhasil",
          data:{
            id:id
          }
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        response:{
          message:"",
          data:[]
        },
        errors:error

      })
    }
  }
}
