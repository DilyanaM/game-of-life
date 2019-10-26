import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string = 'Game of Life';
  toggleButtonText: string = 'START';

  getGameStatus = (status) => {
    this.toggleButtonText = status;
  }

}
