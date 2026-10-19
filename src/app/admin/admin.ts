import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Content } from '../content/content';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  imports: [ Header, Sidebar, Content, Footer ],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {}
