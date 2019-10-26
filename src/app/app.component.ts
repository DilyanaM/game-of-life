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

  // rows: number = 20;
  // cols: number = 50;

  // playing: boolean = false;

  // currentGeneration: Array<number[]> = new Array(this.rows);
  // nextGeneration: Array<number[]> = new Array(this.rows);

  // timer;
  // reproductionTime: number = 100;

  // initializeGrid = () => {
  //   for (let i = 0; i < this.rows; i++) {
  //     this.currentGeneration[i] = new Array(this.cols);
  //     this.nextGeneration[i] = new Array(this.cols);
  //   }
  // }

  // countNeighbors = (row: number, col: number) => {
  //   let count = 0;
  //   if (row - 1 >= 0) {
  //     if (this.currentGeneration[row - 1][col] === 1) count++;
  //   }
  //   if (row - 1 >= 0 && col - 1 >= 0) {
  //     if (this.currentGeneration[row - 1][col - 1] === 1) count++;
  //   }
  //   if (row - 1 >= 0 && col + 1 < this.cols) {
  //     if (this.currentGeneration[row - 1][col + 1] === 1) count++;
  //   }
  //   if (col - 1 >= 0) {
  //     if (this.currentGeneration[row][col - 1] === 1) count++;
  //   }
  //   if (col + 1 < this.cols) {
  //     if (this.currentGeneration[row][col + 1] === 1) count++;
  //   }
  //   if (row + 1 < this.rows) {
  //     if (this.currentGeneration[row + 1][col] === 1) count++;
  //   }
  //   if (row + 1 < this.rows && col - 1 >= 0) {
  //     if (this.currentGeneration[row + 1][col - 1] === 1) count++;
  //   }
  //   if (row + 1 < this.rows && col +1  < this.cols) {
  //     if (this.currentGeneration[row + 1][col + 1] === 1) count++;
  //   }
  //   return count;
  // }

  // applyRules = (row: number, col: number) => {
  //   let numNeighbors = this.countNeighbors(row, col);
  //   if (this.currentGeneration[row][col] === 1) {
  //     if (numNeighbors < 2) {
  //       this.nextGeneration[row][col] = 0;
  //     } else if (numNeighbors === 2 || numNeighbors === 3) {
  //       this.nextGeneration[row][col] = 1;
  //     } else if (numNeighbors > 3) {
  //       this.nextGeneration[row][col] = 0;
  //     }
  //   } else if (this.currentGeneration[row][col] === 0) {
  //     if (numNeighbors === 3) {
  //       this.nextGeneration[row][col] = 1;
  //     }
  //   }
  // }

  // copyAndResetGrid = () => {
  //   for (let i = 0; i < this.rows; i++) {
  //     for (let j = 0; j < this.cols; j++) {
  //       this.currentGeneration[i][j] = this.nextGeneration[i][j];
  //       this.nextGeneration[i][j] = 0;
  //     }
  //   }
  // }

  // play = () => {
  //   // this.computeNextGen();
  //   if (this.playing) {
  //     this.timer = setTimeout(this.play, this.reproductionTime);
  //   }
  // }

  // computeNextGen = () => {
  //   for (let i = 0; i < this.rows; i++) {
  //     for (let j = 0; j < this.cols; j++) {
  //       this.applyRules(i, j);
  //     }
  //   }
  //   this.copyAndResetGrid();
  // }

  // initialize = () => {
  //   // this.initializeGrid();
  //   this.playing = true;
  //   this.play();
  //   // for (let i = 0; i < this.rows; i++) {
  //   //   for (let j = 0; j < this.cols; j++) {
  //   //     let isLive = Math.round(Math.random());
  //   //     if (isLive === 1) {
  //   //       this.currentGeneration[i][j] = 1;
  //   //     } else {
  //   //       this.currentGeneration[i][j] = 0;
  //   //     }
  //   //   }
  //   // }
  // }
}
