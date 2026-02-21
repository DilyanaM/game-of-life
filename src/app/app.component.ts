import { Component } from '@angular/core';
import { HeaderComponent } from './components/layout/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent, 
    RouterOutlet, 
    FooterComponent,
  ]
})
export class AppComponent {
  // TODO: title should be protected but is currently used in tests
  title = 'Game of Life';
}
