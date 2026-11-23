import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

declare const Tabulator: any;
declare const bootstrap: any;

@Component({
  imports: [RouterModule, Header, Sidebar, Footer],
  selector: 'app-mahasiswa',
  styleUrl: './mahasiswa.css',
  templateUrl: './mahasiswa.html',
})
export class Mahasiswa implements AfterViewInit {
  table1: any;
  mahasiswa: any;

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-collapse');

    this.bindMahasiswa();
  }

  bindMahasiswa(): void {
    this.http
      .get('https://stmikpontianak.cloud/011100862/tampilMahasiswa.php')
      .subscribe((data: any) => {
        this.mahasiswa = data;

        // Tabel sudah ada: cukup ganti datanya
        if (this.table1) {
          this.table1.setData(data);
          return;
        }

        this.table1 = new Tabulator('#tabel-mahasiswa', {
          data: data,
          layout: 'fitColumns',
          // Di layar kecil kolom yang tidak muat disembunyikan, dan dapat dibuka lewat tombol ▶
          responsiveLayout: 'collapse',
          responsiveLayoutCollapseStartOpen: false,
          pagination: true,
          paginationSize: 10,
          paginationSizeSelector: [10, 25, 50, 100],
          placeholder: 'No data available',
          columns: [
            {
              formatter: 'responsiveCollapse',
              width: 40,
              minWidth: 40,
              hozAlign: 'center',
              headerSort: false,
              resizable: false,
            },
            { title: 'NIM', field: 'NIM', responsive: 0, minWidth: 110 },
            { title: 'Nama', field: 'Nama', responsive: 1, minWidth: 150 },
            {
              title: 'Jenis Kelamin',
              field: 'JenisKelamin',
              responsive: 2,
              minWidth: 130,
              formatter: (cell: any) => {
                const jk = String(cell.getValue() ?? '');
                return jk.toLowerCase() === 'perempuan'
                  ? `Perempuan <i class='bi bi-gender-female text-danger'></i>`
                  : `Laki-laki <i class='bi bi-gender-male text-primary'></i>`;
              },
            },
            {
              title: 'Tempat, Tanggal Lahir',
              field: 'TempatLahir',
              responsive: 3,
              minWidth: 170,
              formatter: (cell: any) => {
                const d = cell.getRow().getData();
                return `${d.TempatLahir}, ${d.TanggalLahir}`;
              },
            },
            { title: 'JP', field: 'JP', responsive: 4, minWidth: 80 },
            { title: 'Alamat', field: 'Alamat', responsive: 5, minWidth: 150 },
            { title: 'Status', field: 'StatusNikah', responsive: 6, minWidth: 130 },
            { title: 'Tahun Masuk', field: 'TahunMasuk', responsive: 7, minWidth: 110 },
          ],
        });
      });
  }

  // Kotak pencarian: mencari di semua kolom
  search(event: Event): void {
    const keyword = (event.target as HTMLInputElement).value.toLowerCase().trim();
    if (!this.table1) return;

    if (!keyword) {
      this.table1.clearFilter();
      return;
    }

    this.table1.setFilter((row: any) =>
      Object.values(row).some((v) => String(v ?? '').toLowerCase().includes(keyword)),
    );
  }

  private val(id: string): string {
    return (document.getElementById(id) as HTMLInputElement | null)?.value.trim() ?? '';
  }

  postRecord(): void {
    const alamat = this.val('alamatText');
    const jenisKelamin = this.val('jenisKelaminSelect');
    const jp = this.val('jpSelect');
    const nama = this.val('namaText');
    const nim = this.val('nimText');
    const statusNikah = this.val('statusNikahSelect');
    const tahunMasuk = this.val('tahunMasukText');
    const tanggalLahir = this.val('tanggalLahirText');
    const tempatLahir = this.val('tempatLahirText');

    // VALIDASI
    if (!nim || !nama || !tempatLahir || !tanggalLahir || !alamat || !tahunMasuk) {
      alert('Semua data wajib diisi!');
      return;
    }

    // URL BENAR
    const url =
      'https://stmikpontianak.cloud/011100862/tambahMahasiswa.php?' +
      'alamat=' + encodeURIComponent(alamat) +
      '&jenisKelamin=' + encodeURIComponent(jenisKelamin) +
      '&jp=' + encodeURIComponent(jp) +
      '&nama=' + encodeURIComponent(nama) +
      '&nim=' + encodeURIComponent(nim) +
      '&statusPernikahan=' + encodeURIComponent(statusNikah) +
      '&tahunMasuk=' + encodeURIComponent(tahunMasuk) +
      '&tanggalLahir=' + encodeURIComponent(tanggalLahir) +
      '&tempatLahir=' + encodeURIComponent(tempatLahir);

    console.log('URL DIKIRIM:', url); // Debug

    this.http.get(url).subscribe((data: any) => {
      alert(data.status + ' --> ' + data.message);

      this.bindMahasiswa();

      // Tutup modal (Bootstrap 5)
      const modalEl = document.getElementById('tambahModal');
      if (modalEl) {
        bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      }
    });
  }
}
