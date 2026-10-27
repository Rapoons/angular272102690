import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  imports: [ RouterModule, Header, Footer, Sidebar ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  @HostListener('document:click', ['$event'])
  closeSidebarOnOutsideClick(event: MouseEvent) {
    if (!document.body.classList.contains('sidebar-open')) return;

    const target = event.target as Element;
    const isDashboardLink = target.closest('a[href="/dashboard"]');
    if (!isDashboardLink && target.closest('.app-sidebar, [data-lte-toggle="sidebar"]')) return;

    document.body.classList.remove('sidebar-open');
    document.body.classList.add('sidebar-collapse');
  }
}
