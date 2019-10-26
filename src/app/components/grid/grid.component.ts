import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  rows: number = 20;
  cols: number = 50;
  currentGeneration: Array<number[]> = new Array(this.rows);
  nextGeneration: Array<number[]> = new Array(this.rows);

  ngOnInit() {
    this.initializeGrid();
    this.setupCells();
  }

  initializeGrid = () => {
    for (let i = 0; i < this.rows; i++) {
      this.currentGeneration[i] = new Array(this.cols);
      this.nextGeneration[i] = new Array(this.cols);
    }
  }

  setupCells = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let isAlive = Math.round(Math.random());
        if (isAlive === 1) {
          this.currentGeneration[i][j] = 1;
        } else {
          this.currentGeneration[i][j] = 0;
        }
      }
    }
  }

}
