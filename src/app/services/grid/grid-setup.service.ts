import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GRID_DIMENSIONS } from '../../models/grid/grid-settings';

@Injectable()
export class GridSetupService {
  currentGeneration$: Observable<number[][]>;
  nextGeneration$: Observable<number[][]>;

  private currentGenerationSubject = new BehaviorSubject<number[][]>([]);
  private nextGenerationSubject = new BehaviorSubject<number[][]>([]);
  private currentGeneration = new Array<number[]>(GRID_DIMENSIONS.rows);
  private nextGeneration = new Array<number[]>(GRID_DIMENSIONS.rows);

  constructor() {
    this.currentGeneration$ = this.currentGenerationSubject.asObservable();
    this.nextGeneration$ = this.nextGenerationSubject.asObservable();
  }

  initializeGrid(): void {
    for (let i = 0; i < GRID_DIMENSIONS.rows; i++) {
      this.currentGeneration[i] = new Array(GRID_DIMENSIONS.cols);
      this.nextGeneration[i] = new Array(GRID_DIMENSIONS.cols);
    }
    this.currentGenerationSubject.next(this.currentGeneration);
    this.nextGenerationSubject.next(this.nextGeneration);
  }

  setupCells(): void {
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
    this.currentGenerationSubject.next(this.currentGeneration);
  }

  computeNextGeneration(): void {
    for (let i = 0; i < GRID_DIMENSIONS.rows; i++) {
      for (let j = 0; j < GRID_DIMENSIONS.cols; j++) {
        this.applyRules(i, j);
      }
    }
    this.replaceGenerationAndResetGrid();
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
    if (row + 1 < GRID_DIMENSIONS.rows && col + 1 < GRID_DIMENSIONS.cols &&  this.currentGeneration[row + 1][col + 1] === 1) {
      count++;
    }
    // check neighbour below current cell
    if (row + 1 < GRID_DIMENSIONS.rows && this.currentGeneration[row + 1][col] === 1) {
      count++;
    }
    // check neighbour on bottom left of current cell
    if (row + 1 < GRID_DIMENSIONS.rows && col - 1 >= 0 && this.currentGeneration[row + 1][col - 1] === 1) {
      count++;
    }
    // check neighbour on left of current cell
    if (col - 1 >= 0 && this.currentGeneration[row][col - 1] === 1) {
      count++;
    }
    // check neighbour on top left of current cell
    if (row - 1 >= 0 && col - 1 >= 0 && this.currentGeneration[row - 1][col - 1] === 1) {
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
    this.nextGenerationSubject.next(this.nextGeneration);
  }

  private replaceGenerationAndResetGrid(): void {
    for (let i = 0; i < GRID_DIMENSIONS.rows; i++) {
      for (let j = 0; j < GRID_DIMENSIONS.cols; j++) {
        this.currentGeneration[i][j] = this.nextGeneration[i][j];
        this.nextGeneration[i][j] = 0;
      }
    }
    this.currentGenerationSubject.next(this.currentGeneration);
    this.nextGenerationSubject.next(this.nextGeneration);
  }
}
