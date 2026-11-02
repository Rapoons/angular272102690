import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

declare const Chart: any;

@Component({
  imports: [RouterModule, Header, Sidebar, Footer],
  selector: 'app-dashboard3',
  styleUrl: './dashboard3.css',
  templateUrl: './dashboard3.html',
})
export class Dashboard3 implements AfterViewInit, OnDestroy {
  private charts: any[] = [];

  ngAfterViewInit() {
    if (typeof Chart === 'undefined') return;

    const primary = '#0d6efd';
    const muted = '#adb5bd';

    this.charts.push(
      new Chart(document.getElementById('visitors-chart') as HTMLCanvasElement, {
        type: 'line',
        data: {
          labels: ['18th', '20th', '22nd', '24th', '26th', '28th', '30th'],
          datasets: [
            {
              label: 'This Week',
              data: [100, 120, 170, 167, 180, 177, 160],
              borderColor: primary,
              backgroundColor: primary,
              pointRadius: 0,
              tension: 0.3,
            },
            {
              label: 'Last Week',
              data: [60, 80, 70, 67, 80, 77, 100],
              borderColor: muted,
              backgroundColor: muted,
              borderDash: [5, 5],
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } } },
        },
      }),
      new Chart(document.getElementById('sales-chart') as HTMLCanvasElement, {
        type: 'bar',
        data: {
          labels: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            { label: 'This year', data: [1000, 2000, 3000, 2500, 2700, 2500, 3000], backgroundColor: primary },
            { label: 'Last year', data: [700, 1700, 2700, 2000, 1800, 1500, 2000], backgroundColor: muted },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } } },
        },
      }),
    );
  }

  ngOnDestroy() {
    this.charts.forEach((c) => c.destroy());
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
