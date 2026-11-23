import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [ RouterModule ],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  @Input() moduleName: string="";

  get isDashboard(): boolean {
    return ['dashboard', 'dashboard2', 'dashboard3'].includes(this.moduleName);
  }
}

