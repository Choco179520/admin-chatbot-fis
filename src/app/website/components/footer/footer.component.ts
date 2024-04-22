import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  verTerminosYCondiciones(): void {
    window.open('https://la29.29deoctubre.fin.ec/Video29/Tutorial_Rapidazo.mp4', '_blank');
  }
}
