import { Component, Renderer2} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'login-page');

  }
  ngOnDestroy() {
  this.renderer.removeClass(document.body, 'login-page');
}

}
