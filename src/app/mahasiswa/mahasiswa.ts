import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  imports: [RouterModule, Header, Sidebar, Footer],
  selector: 'app-mahasiswa',
  styleUrl: './mahasiswa.css',
  templateUrl: './mahasiswa.html',
})
export class Mahasiswa {
  // Diisi pada slide 14 (kirim data ke API tambahMahasiswa.php)
  postRecord(): void {}
}
