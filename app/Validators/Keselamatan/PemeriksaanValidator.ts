import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PemeriksaanValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    tanggal:schema.date(),
    hari: schema.string(),
    nama_pengemudi: schema.string(),
    nama_po: schema.string(),
    nomor_kendaraan: schema.string(),
    jenis_kendaraan: schema.string(),
    nomor_stuk: schema.string(),
    jenis_angkutan: schema.string(),
    trayek_uuid: schema.string(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'tanggal.required': "Tanggal tidak boleh kosong",
    'hari.required': "Hari tidak boleh kosong",
    'nama_pengemudi.required': "Nama pengemudi tidak boleh kosong",
    'nama_po.required': "Nama PO tidak boleh kosong",
    'nomor_kendaraan.required': "Nomor kendaraan tidak boleh kosong",
    'jenis_kendaraan.required': "Jenis kendaraan tidak boleh kosong",
    'nomor_stuk.required': "Nomor stuk tidak boleh kosong",
    'jenis_angkutan.required': "Jenis angkutan tidak boleh kosong",
    'trayek_uuid.required': "Trayek tidak boleh kosong",
  }
}
