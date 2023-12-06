import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AppInfo from 'App/Models/AppInfo'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"


export default class AppsController {
  async index({}:HttpContextContract){
    const appinfo = await AppInfo.query().first()

    const logourl = await Drive.getSignedUrl("images/apps/"+ appinfo?.app_logo)

   const data = {
    app_name: appinfo?.app_name,
    app_ver: appinfo?.app_ver,
    app_desc: appinfo?.app_desc,
    app_logo: appinfo?.app_logo == 'logo.png'? Env.get("BASE_URL")+  "/images/apps/"+ appinfo?.app_logo :Env.get("BASE_URL")+ logourl  ,
    app_theme: {
      mode:appinfo?.app_theme,
      color:appinfo?.app_color
    },
    app_background: Env.get("BASE_URL")+ "/images/apps/"+   appinfo?.app_background,
    app_nav : Env.get("BASE_URL")+ "/images/apps/"+   appinfo?.app_nav,
    app_url: appinfo?.app_url,
    app_company: 'Dinas Perubungan Provinsi Banten',//appinfo?.app_company,
    app_slogan: appinfo?.app_slogan,
    app_address: appinfo?.app_address,
    app_wa: appinfo?.app_wa
   }

   return data;
  }

  async menus({auth}: HttpContextContract){
    const user = await auth.user

    const authent = await user?.authent

    let menus :{} = [];

    if(authent == 'superadmin'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },

        { title: "APLIKASI", type: "divisi", route: "/" , icon:'mdi-desktop-mac-dashboard'},
        { title: "Data Master", type: "subMenu", route: "/", submenus:[
          {
            title: "Informasi Aplikasi",
            icon: "mdi-desktop-mac-dashboard",
            route: "/backend/master-app-info",
            type: "item",
          },
          {
            title: "Wilayah",
            icon: "mdi-map",
            route: "/backend/master-province",
            type: "item",
          },
          {
            title: "Perlengkapan Jalan",
            icon: "mdi-triforce",
            route: "/backend/master-jenis-rambu",
            type: "item",
          },
          {
            title: "Jenis Pengaduan",
            icon: "mdi-comment-processing-outline",
            route: "/backend/master-jenis-pengaduan",
            type: "item",
          },
          {
            title: "Pejabat",
            icon: "mdi-account-tie",
            route: "/backend/master-pejabat",
            type: "item",
          },
          {
            title: "Dokumen",
            icon: "mdi-folder",
            route: "/backend/master-document",
            type: "item",
          },
          {
            title: "Trayek",
            icon: "mdi-sign-direction",
            route: "/backend/master-trayek",
            type: "item",
          },
          {
            title: "Instansi",
            icon: "mdi-office-building-outline",
            route: "/backend/master-opd",
            type: "item",
          },
          {
            title: "Renaksi",
            icon: "mdi-floor-plan",
            route: "/backend/master-pilar",
            type: "item",
          },
          {
            title: "Periode",
            icon: "mdi-calendar",
            route: "/backend/master-periode",
            type: "item",
          },
          {
            title: "Jenis Kendaraan",
            icon: "mdi-car-cog",
            route: "/backend/master-jenis-kendaraan-operational",
            type: "item",
          },
          {
            title: "Komponen",
            icon: "mdi-image-filter-vintage",
            route: "/backend/master-komponen",
            type: "item",
          },

        ] },
        { title: "Halaman Depan", type: "subMenu", route: "/", submenus:[
          {
            title: "Slider",
            icon: "image",
            route: "/backend/halaman-depan-slider",
            type: "item",
          },
          {
            title: "Video",
            icon: "mdi-video",
            route: "/backend/halaman-depan-video",
            type: "item",
          },
        ] },

        { title: "KESELAMATAN", type: "divisi", route: "/" , icon:'mdi-ambulance'},

        {
          title: "Realisasi Renaksi",
          icon: "mdi-floor-plan",
          route: "/backend/keselamatan-renaksi",
          type: "item",
        },
        {
          title: "Monitoring Renaksi",
          icon: "mdi-book-search",
          route: "/backend/keselamatan-monitoring-renaksi",
          type: "item",
        },
        {
          title: "Data Perusahaan",
          icon: "mdi-office-building-outline",
          route: "/backend/keselamatan-data-perusahaan",
          type: "item",
        },
        {
          title: "Permohonan Ramchek",
          icon: "mdi-clipboard-list",
          route: "/backend/keselamatan-permohonan-ramcheck",
          type: "item",
        },

        { title: "LAlU LINTAS", type: "divisi", route: "/" , icon:'mdi-car-connected'},
        {
          title: "Lokasi Perlengkapan Jalan",
          icon: "mdi-map-legend",
          route: "/backend/keselamatan-lokasi-rambu",
          type: "item",
        },
        {
          title: "Lap Prl. Jalan dan Laka",
          icon: "mdi-bullhorn",
          route: "/backend/keselamatan-laporan",
          type: "item",
        },
        {
          title: "POS Pantau",
          icon: "mdi-home",
          route: "/backend/master-pos",
          type: "item",
        },
        {
          title: "Data Sekolah",
          icon: "mdi-school",
          route: "/backend/master-sekolah",
          type: "item",
        },
        {
          title: "Data Perlintasan KAI",
          icon: "mdi-train",
          route: "/backend/master-perlintasan",
          type: "item",
        },
        {
          title: "Kendaraan Operational",
          icon: "mdi-car",
          route: "/backend/master-kendaraan-operational",
          type: "item",
        },
        { title: "PENGENDALIAN INFLASI", type: "divisi", route: "/" , icon:'mdi-currency-usd-circle-outline'},
        {
          title: "Lokasi Pengiriman",
          icon: "mdi-storefront",
          route: "/backend/inflasi-data-pasar",
          type: "item",
        },
        {
          title: "Data Distributor",
          icon: "mdi-home-city-outline",
          route: "/backend/inflasi-data-distributor",
          type: "item",
        },
        {
          title: "Data Kendaraan",
          icon: "mdi-truck-outline",
          route: "/backend/inflasi-data-kendaraan",
          type: "item",
        },
        {
          title: "Pengiriman",
          icon: "mdi-cube-send",
          route: "/backend/inflasi-data-pengiriman",
          type: "item",
        },
        {
          title: "Monitoring Distribusi",
          icon: "mdi-truck-fast-outline",
          route: "/backend/inflasi-monitoring",
          type: "item",
        },

        { title: "DATA LAPORAN", type: "divisi", route: "/" , icon:'mdi-chart-box'},
        { title: "Laporan", type: "subMenu", route: "/", submenus:[
          {
            title: "Renaksi",
            icon: "mdi-file-document-multiple",
            route: "#",
            type: "item",
          },
          {
            title: "Pengaduan Masyarakat",
            icon: "mdi-file-document-multiple",
            route: "#",
            type: "item",
          },
          {
            title: "Ramcheck",
            icon: "mdi-file-document-multiple",
            route: "#",
            type: "item",
          },
        ] },

        { title: "Utility", type: "subMenu", route: "/", submenus:[
          {
            title: "Akun Aplikasi",
            icon: "engineering",
            route: "/backend/user",
            type: "item",
          },
          {
            title: "Profil Pengguna",
            icon: "accessibility",
            route: "/backend/profil-akun",
            type: "item",
          },
          {
            title: "Ganti Kata Sandi",
            icon: "vpn_key",
            route: "/backend/chngpwd",
            type: "item",
          },
        ] },
      ];
      return menus;
    }

    if(authent == 'administrator'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },

        { title: "APLIKASI", type: "divisi", route: "/" , icon:'mdi-desktop-mac-dashboard'},
        { title: "Data Master", type: "subMenu", route: "/", submenus:[
          {
            title: "Informasi Aplikasi",
            icon: "mdi-desktop-mac-dashboard",
            route: "/backend/master-app-info",
            type: "item",
          },
          {
            title: "Wilayah",
            icon: "mdi-map",
            route: "/backend/master-province",
            type: "item",
          },
          {
            title: "Perlengkapan Jalan",
            icon: "mdi-triforce",
            route: "/backend/master-jenis-rambu",
            type: "item",
          },
          {
            title: "Jenis Pengaduan",
            icon: "mdi-comment-processing-outline",
            route: "/backend/master-jenis-pengaduan",
            type: "item",
          },
          {
            title: "Pejabat",
            icon: "mdi-account-tie",
            route: "/backend/master-pejabat",
            type: "item",
          },
          {
            title: "Dokumen",
            icon: "mdi-folder",
            route: "/backend/master-document",
            type: "item",
          },
          {
            title: "Trayek",
            icon: "mdi-sign-direction",
            route: "/backend/master-trayek",
            type: "item",
          },
          {
            title: "Instansi",
            icon: "mdi-office-building-outline",
            route: "/backend/master-opd",
            type: "item",
          },
          {
            title: "Renaksi",
            icon: "mdi-floor-plan",
            route: "/backend/master-pilar",
            type: "item",
          },
          {
            title: "Periode",
            icon: "mdi-calendar",
            route: "/backend/master-periode",
            type: "item",
          },
          {
            title: "Jenis Kendaraan",
            icon: "mdi-car-cog",
            route: "/backend/master-jenis-kendaraan-operational",
            type: "item",
          },
          {
            title: "Komponen",
            icon: "mdi-image-filter-vintage",
            route: "/backend/master-komponen",
            type: "item",
          },

        ] },
        { title: "Halaman Depan", type: "subMenu", route: "/", submenus:[
          {
            title: "Slider",
            icon: "image",
            route: "/backend/halaman-depan-slider",
            type: "item",
          },
          {
            title: "Video",
            icon: "mdi-video",
            route: "/backend/halaman-depan-video",
            type: "item",
          },
        ] },

        { title: "KESELAMATAN", type: "divisi", route: "/" , icon:'mdi-ambulance'},
        {
          title: "Realisasi Renaksi",
          icon: "mdi-floor-plan",
          route: "/backend/keselamatan-renaksi",
          type: "item",
        },
        {
          title: "Monitoring Renaksi",
          icon: "mdi-book-search",
          route: "/backend/keselamatan-monitoring-renaksi",
          type: "item",
        },
        {
          title: "Permohonan Ramchek",
          icon: "mdi-clipboard-list",
          route: "/backend/keselamatan-permohonan-ramcheck",
          type: "item",
        },
        {
          title: "Data Perusahaan",
          icon: "mdi-office-building-outline",
          route: "/backend/keselamatan-data-perusahaan",
          type: "item",
        },

        { title: "BID. LAlU LINTAS", type: "divisi", route: "/" , icon:'mdi-car-connected'},
        {
          title: "Lokasi Perlengkapan Jalan",
          icon: "mdi-map-legend",
          route: "/backend/keselamatan-lokasi-rambu",
          type: "item",
        },
        {
          title: "Lap Prl. Jalan dan Laka",
          icon: "mdi-bullhorn",
          route: "/backend/keselamatan-laporan",
          type: "item",
        },
        {
          title: "POS Pantau",
          icon: "mdi-home",
          route: "/backend/master-pos",
          type: "item",
        },
        {
          title: "Data Sekolah",
          icon: "mdi-school",
          route: "/backend/master-sekolah",
          type: "item",
        },
        {
          title: "Data Perlintasan KAI",
          icon: "mdi-train",
          route: "/backend/master-perlintasan",
          type: "item",
        },
        {
          title: "Kendaraan Operational",
          icon: "mdi-car",
          route: "/backend/master-kendaraan-operational",
          type: "item",
        },
        {
          title: "Data Perusahaan",
          icon: "mdi-car",
          route: "/backend/master-kendaraan-operational",
          type: "item",
        },

        { title: "Utility", type: "subheader", route: "/" },

        {
          title: "Akun Aplikasi",
          icon: "engineering",
          route: "/backend/user",
          type: "item",
        },
        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/backend/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/backend/chngpwd",
          type: "item",
        },

        {
          title: "Update History",
          icon: "mdi-update",
          route: "/backend/utility-update-history",
          type: "item",
        },
      ];
      return menus;
    }




    /**
     * Menu User
     */
     if(authent == 'user'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },
        {
          title: "Formulir Pendaftaran ",
          icon: "mdi-bullhorn",
          route: "/backend/user-pelaporan",
          type: "item",
        },


        { title: "Utility", type: "subheader", route: "/" },
        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/backend/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/backend/chngpwd",
          type: "item",
        },


      ];
      return menus;
    }


  }
}
