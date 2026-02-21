import { Component } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { GRID_BUTTONS } from '../grid/grid-settings';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    imports: [
      GridComponent
    ]
})
export class GameComponent {
  protected startPauseButtonText = GRID_BUTTONS.start;
  protected resetButtonText = GRID_BUTTONS.reset;

  protected setGameStatus(status: GRID_BUTTONS): void {
    this.startPauseButtonText = status;
  }
}
