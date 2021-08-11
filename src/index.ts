/* ***

   Game of Life.
   Xander Jones

   1. Any live cell with two or three live neighbours survives.
   1. Any dead cell with three live neighbours becomes a live cell.
   1. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

*** */

function headerBootstrap() {
    let header = document.createElement("h1");
    header.appendChild(document.createTextNode("Game of Life"));
    document.body.appendChild(header);
}

class GameOfLife {
    grid: boolean[][];
    generation: number;
    cellsAlive: number;

    constructor(sizex: number, sizey: number) {
        this.grid = 
            Array.from({ length: sizex }, () => (
                Array.from({ length: sizey }, () => (
                    Math.random() < 0.3
                ))
            ))
        this.generation = 0;
        this.gridBootstrap(sizex, sizey);
        this.pushGridToDOM();
    }

    gridBootstrap(sizex: number, sizey: number) {
        let table = document.createElement("table");
        table.id = "divGol";
        table.style.border = "1px solid red";
        table.style.fontFamily = "courier"

        for (var i = 0; i < sizex; i++) {
            let row = table.insertRow();
            for (var j = 0; j < sizey; j++) {
                let cell = row.insertCell();
                cell.id = `golCell_${i}_${j}`;
                cell.appendChild(document.createTextNode(((this.grid[i][j] === true) ? "X" : "-")))
            }
        }
    
        document.body.appendChild(table);
    }

    newGeneration() {
        console.log("new generation")
        this.grid.forEach((ielement, iindex) => {
            ielement.forEach((jelement, jindex) => {
                console.log(`calc if [${iindex},${jindex}] lives or dies`)
            });
        });
    }

    pushGridToDOM() {
        console.log("pushGridToDOM()")
        let divGol = document.getElementById("divGol");
    }
}

headerBootstrap();
let gol = new GameOfLife(4, 4);
console.log("gol", gol);
