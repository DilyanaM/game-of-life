import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { GRID_DIMENSIONS } from '../../models/grid/grid-settings';

@Injectable()
export class GridSetupService {
  currentGeneration$: Observable<number[][]>;
  nextGeneration$: Observable<number[][]>;

  private currentGenerationSubject = new BehaviorSubject<number[][]>([]);
  private nextGenerationSubject = new BehaviorSubject<number[][]>([]);
  private currentGeneration = new Array<number[]>();
  private nextGeneration = new Array<number[]>();

  constructor() {
    this.currentGeneration$ = this.currentGenerationSubject.asObservable();
    this.nextGeneration$ = this.nextGenerationSubject.asObservable();
  }

  initializeGrid(columns = GRID_DIMENSIONS.cols, rows = GRID_DIMENSIONS.rows): void {
    for (let i = 0; i < rows; i++) {
      this.currentGeneration[i] = new Array(columns);
      this.nextGeneration[i] = new Array(columns);
    }
    this.currentGenerationSubject.next(this.currentGeneration);
    this.nextGenerationSubject.next(this.nextGeneration);
  }

  setupCells(columns = GRID_DIMENSIONS.cols, rows = GRID_DIMENSIONS.rows): void {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const isAlive = Math.round(Math.random());
        if (isAlive === 1) {
          this.currentGeneration[i][j] = 1;
        } else {
          this.currentGeneration[i][j] = 0;
        }
      }
    }
    this.currentGenerationSubject.next(this.currentGeneration);
  }

  computeNextGeneration(columns = GRID_DIMENSIONS.cols, rows = GRID_DIMENSIONS.rows): void {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        this.applyRules(i, j);
      }
    }
    this.replaceGenerationAndResetGrid();
  }

  private countAliveNeighbours(
    row: number,
    column: number,
    rows = GRID_DIMENSIONS.rows,
    columns = GRID_DIMENSIONS.cols
  ): number {
    let count = 0;

    // check neighbour above current cell
    if (row - 1 >= 0 && this.currentGeneration[row - 1][column] === 1) {
      count++;
    }
    // check neighbour on top right of current cell
    if (row - 1 >= 0 && column + 1 < columns
      && this.currentGeneration[row - 1][column + 1] === 1) {
      count++;
    }
    // check neighbour on right of current cell
    if (column + 1 < columns && this.currentGeneration[row][column + 1] === 1) {
      count++;
    }
    // check neighbour on bottom right of current cell
    if (row + 1 < rows && column + 1 < columns &&  this.currentGeneration[row + 1][column + 1] === 1) {
      count++;
    }
    // check neighbour below current cell
    if (row + 1 < rows && this.currentGeneration[row + 1][column] === 1) {
      count++;
    }
    // check neighbour on bottom left of current cell
    if (row + 1 < rows && column - 1 >= 0 && this.currentGeneration[row + 1][column - 1] === 1) {
      count++;
    }
    // check neighbour on left of current cell
    if (column - 1 >= 0 && this.currentGeneration[row][column - 1] === 1) {
      count++;
    }
    // check neighbour on top left of current cell
    if (row - 1 >= 0 && column - 1 >= 0 && this.currentGeneration[row - 1][column - 1] === 1) {
      count++;
    }

    return count;
  }

  private applyRules(row: number, column: number): void {
    const aliveNeighbours = this.countAliveNeighbours(row, column);
    const isAlive = this.currentGeneration[row][column] === 1;
    const isDead = this.currentGeneration[row][column] === 0;

    if (isAlive) {
      if (aliveNeighbours < 2 || aliveNeighbours > 3) {
        this.nextGeneration[row][column] = 0;
      } else if (aliveNeighbours === 2 || aliveNeighbours === 3) {
        this.nextGeneration[row][column] = 1;
      }
    } else if (isDead) {
      if (aliveNeighbours === 3) {
        this.nextGeneration[row][column] = 1;
      }
    }
    this.nextGenerationSubject.next(this.nextGeneration);
  }

  private replaceGenerationAndResetGrid(columns = GRID_DIMENSIONS.cols, rows = GRID_DIMENSIONS.rows): void {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        this.currentGeneration[i][j] = this.nextGeneration[i][j];
        this.nextGeneration[i][j] = 0;
      }
    }
    this.currentGenerationSubject.next(this.currentGeneration);
    this.nextGenerationSubject.next(this.nextGeneration);
  }
}
