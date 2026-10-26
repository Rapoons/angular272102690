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
}

