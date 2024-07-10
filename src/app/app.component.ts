import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-chatbot';
  saltoLinea = false;
  loadingText: string = 'Espere un momento...';

  constructor() {
    if (window.outerWidth < 500) {
      this.saltoLinea = true;
    }
  }
}
