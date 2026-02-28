import { TestBed } from '@angular/core/testing';

import { GridSetupService } from './grid-setup.service';

describe('GridSetupService', () => {
  let service: GridSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridSetupService],
    });
    service = TestBed.inject(GridSetupService);
  });

  it('it should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When initializing', () => {
    const rows = 5;
    const columns = 5;

    beforeEach(() => {
      service.initializeGrid(rows, columns);
    });

    it('it should initialize the grid with the provided dimensions', () => {
      service.currentGeneration$.subscribe((grid) => {
        expect(grid.length).toBe(rows);
        expect(grid[0].length).toBe(columns);
        expect(grid[1].length).toBe(columns);
        expect(grid[2].length).toBe(columns);
        expect(grid[3].length).toBe(columns);
        expect(grid[4].length).toBe(columns);
      });
    });

    it('it should initialize the next generationgrid with the provided dimensions', () => {
      service.nextGeneration$.subscribe((grid) => {
        expect(grid.length).toBe(rows);
        expect(grid[0].length).toBe(columns);
        expect(grid[1].length).toBe(columns);
        expect(grid[2].length).toBe(columns);
        expect(grid[3].length).toBe(columns);
        expect(grid[4].length).toBe(columns);
      });
    });
  });
});
