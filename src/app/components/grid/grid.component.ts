import { Component, OnInit, Output, EventEmitter, OnDestroy, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

import { GRID_BUTTONS, REPRODUCTION_TIME } from '../../models/grid/grid-settings';
import { GridSetupService } from '../../services/grid/grid-setup.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  imports: [
    NgClass,
  ],
  providers: [
    GridSetupService,
  ],
})
export class GridComponent implements OnInit, OnDestroy {
  @Output() isPlaying = new EventEmitter<string>();

  private readonly gridSetupService = inject(GridSetupService);

  protected currentGeneration: number[][] = [];
  protected nextGeneration: number[][] = [];

  private playing = false;
  private timer;

  private currentGenerationSubscription: Subscription | undefined;
  private nextGenerationSubscription: Subscription | undefined;

  ngOnInit() {
    this.gridSetupService.initializeGrid();
    this.gridSetupService.setupCells();

    this.currentGenerationSubscription = this.gridSetupService.currentGeneration$.subscribe((generation) => {
      this.currentGeneration = generation;
    });

    this.nextGenerationSubscription = this.gridSetupService.nextGeneration$.subscribe((generation) => {
      this.nextGeneration = generation;
    });
  }

  ngOnDestroy() {
    this.pause();
    this.currentGenerationSubscription?.unsubscribe();
    this.nextGenerationSubscription?.unsubscribe();
  }

  reset(): void {
    this.pause();
    this.gridSetupService.setupCells();
  }

  toggleGame(): void {
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  private play(): void {
    this.playing = true;
    this.isPlaying.emit(GRID_BUTTONS.pause);
    this.gridSetupService.computeNextGeneration();
    this.timer = setTimeout(() => this.play(), REPRODUCTION_TIME);
  }

  private pause(): void {
    this.playing = false;
    this.isPlaying.emit(GRID_BUTTONS.start);
    clearTimeout(this.timer);
  }
}
