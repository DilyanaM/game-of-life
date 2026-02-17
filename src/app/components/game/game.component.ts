import { Component } from '@angular/core';
import { GridComponent } from '../grid/grid.component';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    imports: [
      GridComponent
    ]
})
export class GameComponent {

  toggleButtonText: string = 'Start';

  getGameStatus = (status: string) => {
    this.toggleButtonText = status;
  }

}
