import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

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
export class Dashboard2 implements OnInit, OnDestroy {
  private previousTheme: string | null = null;

  ngOnInit() {
    const root = document.documentElement;
    this.previousTheme = root.getAttribute('data-bs-theme');
    root.setAttribute('data-bs-theme', 'light');
    root.style.colorScheme = 'light';
  }

  ngOnDestroy() {
    const root = document.documentElement;
    if (this.previousTheme) {
      root.setAttribute('data-bs-theme', this.previousTheme);
      root.style.colorScheme = this.previousTheme;
    }
  }

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
