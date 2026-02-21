import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { GRID_BUTTONS, GRID_DIMENSIONS, REPRODUCTION_TIME } from '../../models/grid/grid-settings';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  imports: [
    NgClass,
  ],
})
export class GridComponent implements OnInit, OnDestroy {
  @Output() isPlaying = new EventEmitter<string>();

  protected currentGeneration = new Array<number[]>(GRID_DIMENSIONS.rows);
  protected nextGeneration = new Array<number[]>(GRID_DIMENSIONS.rows);

  private playing = false;
  private timer;

  ngOnInit() {
    this.initializeGrid();
    this.setupCells();
  }

  ngOnDestroy() {
    this.pause();
  }

  reset(): void {
    this.pause();
    this.setupCells();
  }

  toggleGame(): void {
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  private initializeGrid(): void {
    for (let i = 0; i < GRID_DIMENSIONS.rows; i++) {
      this.currentGeneration[i] = new Array(GRID_DIMENSIONS.cols);
      this.nextGeneration[i] = new Array(GRID_DIMENSIONS.cols);
    }
  }

  private setupCells(): void {
    for (let i = 0; i < GRID_DIMENSIONS.rows; i++) {
      for (let j = 0; j < GRID_DIMENSIONS.cols; j++) {
        const isAlive = Math.round(Math.random());
        if (isAlive === 1) {
          this.currentGeneration[i][j] = 1;
        } else {
          this.currentGeneration[i][j] = 0;
        }
      }
    }
  }

  private countAliveNeighbours(row: number, col: number): number {
    let count = 0;

    // check neighbour above current cell
    if (row - 1 >= 0 && this.currentGeneration[row - 1][col] === 1) {
      count++;
    }
    // check neighbour on top right of current cell
    if (row - 1 >= 0 && col + 1 < GRID_DIMENSIONS.cols
      && this.currentGeneration[row - 1][col + 1] === 1) {
      count++;
    }
    // check neighbour on right of current cell
    if (col + 1 < GRID_DIMENSIONS.cols && this.currentGeneration[row][col + 1] === 1) {
      count++;
    }
    // check neighbour on bottom right of current cell
    if (row + 1 < GRID_DIMENSIONS.rows && col + 1 < GRID_DIMENSIONS.cols
      && this.currentGeneration[row + 1][col + 1] === 1) {
      count++;
    }
    // check neighbour below current cell
    if (row + 1 < GRID_DIMENSIONS.rows && this.currentGeneration[row + 1][col] === 1) {
      count++;
    }
    // check neighbour on bottom left of current cell
    if (row + 1 < GRID_DIMENSIONS.rows && col - 1 >= 0
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

  private applyRules(row: number, col: number): void {
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

  private replaceGenerationAndResetGrid(): void {
    for (let i = 0; i < GRID_DIMENSIONS.rows; i++) {
      for (let j = 0; j < GRID_DIMENSIONS.cols; j++) {
        this.currentGeneration[i][j] = this.nextGeneration[i][j];
        this.nextGeneration[i][j] = 0;
      }
    }
  }

  private computeNextGeneration(): void {
    for (let i = 0; i < GRID_DIMENSIONS.rows; i++) {
      for (let j = 0; j < GRID_DIMENSIONS.cols; j++) {
        this.applyRules(i, j);
      }
    }
    this.replaceGenerationAndResetGrid();
  }

  private play(): void {
    this.playing = true;
    this.isPlaying.emit(GRID_BUTTONS.pause);
    this.computeNextGeneration();
    this.timer = setTimeout(() => this.play(), REPRODUCTION_TIME);
  }

  private pause(): void {
    this.playing = false;
    this.isPlaying.emit(GRID_BUTTONS.start);
    clearTimeout(this.timer);
  }
}
