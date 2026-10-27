import { Component, HostListener } from '@angular/core';

import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, Header, Sidebar, Footer],
  selector: 'app-dashboard2',
  styleUrl: './dashboard2.css',
  templateUrl: './dashboard2.html',
})
export class Dashboard2 {
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
