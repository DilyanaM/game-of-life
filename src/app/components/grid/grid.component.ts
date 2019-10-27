import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Output() isPlaying = new EventEmitter();

  rows: number = 20;
  cols: number = 50;
  currentGeneration: Array<number[]> = new Array(this.rows);
  nextGeneration: Array<number[]> = new Array(this.rows);

  playing: boolean = false;
  timer;
  reproductionTime: number = 100;

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

  countAliveNeighbours = (row: number, col: number) => {
    let count = 0;

    // check neighbour above current cell
    if (row - 1 >= 0 && this.currentGeneration[row - 1][col] === 1) {
      count++;
    }
    // check neighbour on top right of current cell
    if (row - 1 >= 0 && col + 1 < this.cols
      && this.currentGeneration[row - 1][col + 1] === 1) {
      count++;
    }
    // check neighbour on right of current cell
    if (col + 1 < this.cols && this.currentGeneration[row][col + 1] === 1) {
      count++;
    }
    // check neighbour on bottom right of current cell
    if (row + 1 < this.rows && col + 1 < this.cols
      && this.currentGeneration[row + 1][col + 1] === 1) {
      count++;
    }
    // check neighbour below current cell
    if (row + 1 < this.rows && this.currentGeneration[row + 1][col] === 1) {
      count++;
    }
    // check neighbour on bottom left of current cell
    if (row + 1 < this.rows && col - 1 >= 0
      && this.currentGeneration[row + 1][col - 1] === 1) {
      count++;
    }
    // check neighbour on left of current cell
    if (col - 1 >= 0 && this.currentGeneration[row][col - 1] === 1) {
      count++;
    }
    // check neighbour on top left of current cell
    if (row - 1 >= 0 && col - 1 >= 0
      && this.currentGeneration[row - 1][col - 1] === 1) {
      count++;
    }
    return count;
  }

  applyRules = (row: number, col: number) => {
    const aliveNeihgbours = this.countAliveNeighbours(row, col);
    const isAlive = this.currentGeneration[row][col] === 1;
    const isDead = this.currentGeneration[row][col] === 0;

    if (isAlive) {
      if (aliveNeihgbours < 2 || aliveNeihgbours > 3) {
        this.nextGeneration[row][col] = 0;
      } else if (aliveNeihgbours === 2 || aliveNeihgbours === 3) {
        this.nextGeneration[row][col] = 1;
      }
    } else if (isDead) {
      if (aliveNeihgbours === 3) {
        this.nextGeneration[row][col] = 1;
      }
    }
  }

  replaceGenerationAndResetGrid = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.currentGeneration[i][j] = this.nextGeneration[i][j];
        this.nextGeneration[i][j] = 0;
      }
    }
  }

  computeNextGeneration = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.applyRules(i, j);
      }
    }
    this.replaceGenerationAndResetGrid();
  }

  play = () => {
    this.playing = true;
    this.isPlaying.emit('Pause');
    this.computeNextGeneration();
    this.timer = setTimeout(this.play, this.reproductionTime);
  }

  pause = () => {
    this.playing = false;
    this.isPlaying.emit('Start');
    clearTimeout(this.timer);
  }

  toggleGame = () => {
    this.playing ? this.pause() : this.play();
  }

}
