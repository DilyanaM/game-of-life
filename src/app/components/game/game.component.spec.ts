import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { GridComponent } from '../grid/grid.component';
import { GRID_BUTTONS } from '../../models/grid/grid-settings';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let startButton: HTMLButtonElement | null;
  let resetButton: HTMLButtonElement | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GameComponent,
        GridComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    startButton = fixture.nativeElement.querySelector('.start-btn');
    resetButton = fixture.nativeElement.querySelector('.reset-btn');

    fixture.detectChanges();
  });

  it('it should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should render the start/pause and reset buttons', () => {
    expect(startButton).toBeTruthy();
    expect(resetButton).toBeTruthy();
  });

  describe('When the game is not running', () => {
    describe('and the start/pause button is clicked', () => {
      beforeEach(() => {
        startButton?.click();
        fixture.detectChanges();
      });

      it('it should change the start/pause button text to "pause"', () => {
        expect(startButton?.innerText).toEqual(GRID_BUTTONS.pause);
      });

      describe('and then the reset button is clicked', () => {
        beforeEach(() => {
          resetButton?.click();
          fixture.detectChanges();
        });

        it('it should restore the start/pause button text to "Start"', () => {
          expect(startButton?.innerText).toEqual(GRID_BUTTONS.start);
        });
      });
    });
  });

  describe('When the game is running', () => {
    describe('and the start/pause button is clicked', () => {
      beforeEach(() => {
        startButton?.click(); // Start the game
        startButton?.click();
        fixture.detectChanges();
      });

      it('it should change the start/pause button text to "Start"', () => {
        expect(startButton?.innerText).toEqual(GRID_BUTTONS.start);
      });

      describe('and then the reset button is clicked', () => {
        beforeEach(() => {
          resetButton?.click();
          fixture.detectChanges();
        });

        it('it should keep the start/pause button text as "Start"', () => {
          expect(startButton?.innerText).toEqual(GRID_BUTTONS.start);
        });
      });
    });
  });
});
