import Renaksi from "App/Models/Renaksi";
import Tahun from "App/Models/Tahun";

class RenaksiService {
  async reanaksipertahun(tahun_uuid, pilar_uuid){
    try {
      const model = await Renaksi.query().preload('pilar').preload('program').preload('kegiatan').preload('opd').preload("tahun").where('tahun_uuid', tahun_uuid).where('pilar_uuid',pilar_uuid).orderBy("id",'asc')

      const tahun = await Tahun.findBy("uuid",tahun_uuid)

      const datas:{}[]=[]


      model.forEach(element => {
        const row={}
        row['id']= element.uuid
        row['pilar']= element.pilar.name
        row['program']= element.program.name
        row['kegiatan']= element.kegiatan.name
        row['indikator']= element.indikator ? element.indikator :''
        row['satuan']= element.satuan ?element.satuan :''
        row['anggaran']= element.anggaran ? element.anggaran :''
        row['realisasi']= element.realisasi ? element.realisasi :''
        row['sumber']= element.sumber ? element.sumber : ''
        row['capaian']= element.persentasi ? element.persentasi : '0'
        row['opd']= element.opd.name ? element.opd.name : ''
        datas.push(row)
      });

      return {
        datas:datas,
        tahun:tahun?.name,
      }

    } catch (error) {

    }
  }
}

export default RenaksiService
