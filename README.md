<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Gulpanjul/fe-sistem-approval-cuti">
    <img src="public/images/logo.png" alt="Logo" height="80">
  </a>

<h3 align="center">Frontend Sistem Approval Cuti</h3>

  <p align="center">
    Web frontend untuk mengajukan, meninjau, dan menyetujui cuti dengan sistem role-based approval.
    <br />
    <a href="https://github.com/Gulpanjul/fe-sistem-approval-cuti">View Demo</a>
    &middot;
    <a href="https://github.com/Gulpanjul/fe-sistem-approval-cuti/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Screenshot][product-screenshot]](https://example.com)

**fe-sistem-approval-cuti** adalah aplikasi frontend berbasis React/Next.js yang mendukung proses pengajuan cuti secara digital. Karyawan dapat mengajukan cuti, melihat status pengajuan, dan melakukan revisi. Head dan GM dapat meninjau, menyetujui, atau menolak permohonan cuti sesuai hak akses mereka. Sistem ini juga menampilkan riwayat aksi untuk transparansi dan audit.

Fitur utama:

- **Pengajuan Cuti**: Form untuk karyawan mengajukan cuti dengan tipe dan periode.
- **Edit Cuti**: Karyawan dapat mengubah cuti yang masih Draft atau Revisi.
- **Approval Role-Based**: Head dan GM bisa Approve, Reject, atau Request Revisi.
- **Riwayat Aksi**: Menampilkan semua aksi yang dilakukan pada pengajuan cuti.
- **Autentikasi**: Login berbasis role (Employee, Head, GM) dan token JWT.
- **Logout**: Menghapus sesi user dari localStorage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ![React](https://img.shields.io/badge/React-%2300D8FF?style=for-the-badge&logo=react&logoColor=white)
- ![React Router](https://img.shields.io/badge/React_Router-%23CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-%235A29E4?style=for-the-badge&logo=axios&logoColor=white)
- ![TanStack Query](https://img.shields.io/badge/TanStack_Query-%23FF6600?style=for-the-badge&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node.js dan npm/yarn/pnpm/bun
- Database PostgreSQL berjalan
- Backend API siap dijalankan

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Gulpanjul/fe-sistem-approval-cuti.git
   ```
2. Install dependencies
   ```sh
    npm install
    # or
    yarn install
   ```
3. Setup environment variables (.env.local):
   ```js
   VITE_API_URL=
   ```
4. Run development server
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Endpoint utama backend:

- **Dashboard**: Melihat daftar cuti dan statusnya
- **Ajukan Cuti**: /cuti/add — Form pengajuan cuti baru
- **Edit Cuti**: /cuti/edit/:id — Edit cuti yang belum disetujui
- **Detail Cuti**: /cuti/:id — Lihat detail, lampiran, dan riwayat aksi
- **Approval**: Head/GM dapat Approve, Reject, atau Request Revisi

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

Fitur yang sudah terimplementasi:

- [x] Login dan role-based access
- [x] Ajukan cuti dan edit cuti untuk karyawan
- [x] Approve/Reject/Request Revisi untuk Head dan GM
- [x] Tampilkan riwayat aksi

See the [open issues](https://github.com/Gulpanjul/fe-sistem-approval-cuti/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Andhika Chandra Gulpa - [@gulpanjul](https://www.instagram.com/gulpanjul) - gulpa.andhikac@gmail.com

Project Link: [https://github.com/Gulpanjul/fe-sistem-approval-cuti](https://github.com/Gulpanjul/fe-sistem-approval-cuti)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [React](https://reactjs.org/) - Library JavaScript untuk membangun user interface interaktif.
- [React Router](https://reactrouter.com/) - Routing untuk aplikasi React berbasis single-page.
- [Axios](https://axios-http.com/) - HTTP client untuk melakukan request ke backend.
- [TanStack Query](https://tanstack.com/query) - Mengelola state dan cache data asynchronous di React.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS untuk styling cepat dan responsif.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Gulpanjul/fe-sistem-approval-cuti.svg?style=for-the-badge
[contributors-url]: https://github.com/Gulpanjul/fe-sistem-approval-cuti/graphs/contributors
[license-shield]: https://img.shields.io/github/license/Gulpanjul/fe-sistem-approval-cuti.svg?style=for-the-badge
[license-url]: https://github.com/Gulpanjul/fe-sistem-approval-cuti/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/gulpa-andhikac
[product-screenshot]: /public/images/screenshot.png
