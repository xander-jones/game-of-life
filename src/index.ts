/* ***

   Game of Life.
   Xander Jones

   1. Any live cell with two or three live neighbours survives.
   1. Any dead cell with three live neighbours becomes a live cell.
   1. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

*** */
import packageInfo from '../package.json'
import patterns from './patterns'
import Bugsnag from '@bugsnag/js'


Bugsnag.start({ 
    apiKey: '97ef27a04c69ae72307ba2a3b7168b5b',
    appVersion: packageInfo.version
})

var autoRunTimeout: ReturnType<typeof setTimeout>;
const mapSizeDefault = {
    rows: 40,
    columns: 50
}

function pageBootstrap(): void {
    document.getElementById("version").innerText = `v${packageInfo.version}`;

    let patternSelector = document.getElementById("patternSelector") as HTMLInputElement;
    Object.keys(patterns).forEach(key => {
        let option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        patternSelector.appendChild(option);
    });

    let nextGenerationBtn = document.getElementById("nextGenerationBtn") as HTMLInputElement;
    nextGenerationBtn.onclick = function() {
        gol.nextGeneration();
    }
    document.getElementById("resetBtn").onclick = function() {
        gol = new GameOfLife(mapSizeDefault.rows, mapSizeDefault.columns, patterns[patternSelector.value]);
    }

    let autoNextGeneration = document.getElementById("autoNextGeneration") as HTMLInputElement;
    autoNextGeneration.onchange = function() {
        if (autoNextGeneration.checked) {
            nextGenerationBtn.disabled = true;
            gol.nextGeneration(true);
        } else {
            nextGenerationBtn.disabled = false;
            clearTimeout(autoRunTimeout);
        }
    }
}

class GameOfLife {
    grid: boolean[][];
    generation: number;
    cellsAlive: number;
    rows: number;
    columns: number;

    constructor(rows: number, columns: number, pattern: number[][] = null) {
        this.rows = rows;
        this.columns = columns;
        this.generation = 0;
        this.cellsAlive = 0;
        
        if (!pattern) {
            this.grid = 
                Array.from({ length: rows }, () => (
                    Array.from({ length: columns }, () => (
                        Math.random() < 0.1
                    ))
            ))
        } else {
            this.grid = Array.from({ length: rows }, () => 
                Array.from({ length: columns }, () => false)
            );
            pattern.forEach((el) => {
                this.grid[el[0]][el[1]] = true;
            });
        }
        this.pushGridToDOM();
    }

    debugObj = {
        start_Live: false,
        start_Neighbours: -1,
        end___Live: false,
    }

    nextGeneration(autoRun: boolean = false): void {
        var newGrid: boolean[][] = Array.from({ length: this.rows }, () => 
            Array.from({ length: this.columns }, () => false)
        );
        this.grid.forEach((row, row_index) => {
            row.forEach((_, col_index) => {
                newGrid[row_index][col_index] = this.calcLiveOrDie(row_index, col_index)
                this.debugObj.start_Live = this.grid[row_index][col_index];
                this.debugObj.end___Live = newGrid[row_index][col_index];
            });
        });
        this.grid = newGrid;
        this.generation += 1;
        this.pushGridToDOM();
        if (autoRun) {
            autoRunTimeout = setTimeout(function() { gol.nextGeneration(true) }, 10)
        }
    }

    calcLiveOrDie(row: number, column: number): boolean {
        let neighbours: boolean[] = this.getNeighbourStates(row, column);
        let liveNeighbours: number = 0;
        neighbours.forEach((neighbour: boolean) => {
            liveNeighbours += (neighbour) ? 1 : 0;
        })
        this.debugObj.start_Neighbours = liveNeighbours;

        if (this.grid[row][column]) { 
            // cell is alive
            if (liveNeighbours >= 2 && liveNeighbours <= 3) {
                return true;
            } else {
                return false;
            }
        } else {
            // cell is dead
            if (liveNeighbours == 3) {
                return true;
            } else {
                return false;
            }
        }
    }

    getNeighbourStates(row: number, column: number): boolean[] {
        let neighbours: boolean[] = [];
        let directions: number[][] = [
            [-1,0], // N
            [-1,1], // NE
            [0,1], // E
            [1,1], // SE
            [1,0], // S
            [1,-1], // SW
            [0,-1], // W
            [-1,-1] // NW
        ]
        directions.forEach((direction) => {
            let new_row = row+direction[0]
            let new_column = column+direction[1]
            if (new_row < 0 ||
                new_column < 0 ||
                new_row > this.rows-1 ||
                new_column > this.columns-1) {
                neighbours.push(false);
            } else {
                neighbours.push(this.grid[new_row][new_column]);
            }
        });
        return neighbours;
    }

    pushGridToDOM(): void {
        let newTable = document.createElement("table");
        newTable.id = "tableGol";
        this.cellsAlive = 0;

        for (var row = 0; row < this.rows; row++) {
            let tr = newTable.insertRow();
            for (var column = 0; column < this.columns; column++) {
                let cell = tr.insertCell();
                if (this.grid[row][column] === true) {
                    cell.appendChild(document.createTextNode("■"));
                    this.cellsAlive += 1;
                } else {
                    cell.appendChild(document.createTextNode("_"));
                }
            }
        }
        let table = document.getElementById("tableGol");
        if (table == null) {
            document.getElementById("golDiv").appendChild(newTable);
        } else {
            table.replaceWith(newTable);
        }
        document.getElementById("cellsAliveCount").innerText = String(this.cellsAlive);
        document.getElementById("generationCount").innerText = String(this.generation);
    }
}

pageBootstrap();
let gol = new GameOfLife(mapSizeDefault.rows, mapSizeDefault.columns);
