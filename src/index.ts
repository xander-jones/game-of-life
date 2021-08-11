/* ***

   Game of Life.
   Xander Jones

   1. Any live cell with two or three live neighbours survives.
   1. Any dead cell with three live neighbours becomes a live cell.
   1. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

*** */
import packageInfo from '../package.json'
import Bugsnag from '@bugsnag/js'

Bugsnag.start({ 
    apiKey: '97ef27a04c69ae72307ba2a3b7168b5b',
    appVersion: packageInfo.version
})

var autoRunTimeout: ReturnType<typeof setTimeout>;

function pageBootstrap(): void {
    let header = document.createElement("h1");
    header.appendChild(document.createTextNode("Game of Life"));

    let nextGenerationBtn = document.createElement("button");
    nextGenerationBtn.textContent = "Next Generation";
    nextGenerationBtn.onclick = function() {
        gol.nextGeneration();
    }

    let automaticRunCheck = document.createElement("input");
    automaticRunCheck.setAttribute("type", "checkbox");
    automaticRunCheck.textContent = "Run automatically";
    automaticRunCheck.onchange = function() {
        if (automaticRunCheck.checked) {
            gol.nextGeneration(true);
        } else {
            clearTimeout(autoRunTimeout);
        }
    }

    document.body.appendChild(header);
    document.body.appendChild(nextGenerationBtn);
    document.body.appendChild(automaticRunCheck);
}

class GameOfLife {
    grid: boolean[][];
    generation: number;
    cellsAlive: number;
    sizex: number;
    sizey: number;

    constructor(sizex: number, sizey: number) {
        this.sizex = sizex;
        this.sizey = sizey;
        this.generation = 0;
        this.cellsAlive = 0;
        this.grid = 
            Array.from({ length: sizex }, () => (
                Array.from({ length: sizey }, () => (
                    Math.random() < 0.1
                ))
            ))
        this.pushGridToDOM();
    }

    nextGeneration(autoRun: boolean = false): void {
        var newGrid: boolean[][] = this.grid.slice();
        this.grid.forEach((xel, x) => {
            xel.forEach((yel, y) => {
                newGrid[x][y] = this.calcLiveOrDie(this.grid[x][y], this.getNeighbourStates(x, y))
            });
        });
        this.grid = newGrid;
        this.pushGridToDOM();
        if (autoRun) {
            autoRunTimeout = setTimeout(function() { gol.nextGeneration(true) }, 10)
        }
    }

    calcLiveOrDie(cell: boolean, neighbours: boolean[]): boolean {
        let liveNeighbours: number = 0;
        neighbours.forEach((neighbour: boolean) => {
            liveNeighbours += (neighbour) ? 1 : 0;
        })

        if (cell) { 
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

    getNeighbourStates(x: number, y: number): boolean[] {
        let neighbours: boolean[] = [];
        let directions: number[][] = [
            [0,-1], // N
            [1,-1], // NE
            [1,0], // E
            [1,1], // SE
            [0,1], // S
            [-1,1], // SW
            [-1,0], // W
            [-1,-1], // NW
        ]
        directions.forEach((direction) => {
            let newX = x+direction[0]
            let newY = y+direction[1]
            if (newX < 0 ||
                newY < 0 ||
                newX > this.sizex-1 ||
                newY > this.sizey-1) {
                neighbours.push(false);
            } else {
                neighbours.push(this.grid[newX][newY]);
            }
        });
        return neighbours;
    }

    pushGridToDOM(): void {
        let newTable = document.createElement("table");
        newTable.id = "tableGol";
        newTable.style.border = "1px solid red";
        newTable.style.fontFamily = "courier"

        for (var y = 0; y < this.sizey; y++) {
            let row = newTable.insertRow();
            for (var x = 0; x < this.sizex; x++) {
                let cell = row.insertCell();
                cell.appendChild(document.createTextNode(((this.grid[x][y] === true) ? "■" : "​ ​​​​")))
            }
        }
        let table = document.getElementById("tableGol")
        if (table == null) {
            document.body.appendChild(newTable);
        } else {
            table.replaceWith(newTable);
        }
    }
}

pageBootstrap();
let gol = new GameOfLife(50, 40);
