"use strict";

let model;

export function generateModel(mazeObject) {
    const rows = mazeObject.rows;
    const cols = mazeObject.cols;
    let start;
    let goal;
    console.log(mazeObject);
    if (mazeObject.start == "Top-left") start = { row: 0, col: 0 };
    if (mazeObject.start == "Top-right") start = { row: 0, col: cols - 1 };
    if (mazeObject.start == "Bottom-left") start = { row: rows - 1, col: 0 };
    if (mazeObject.start == "Bottom-right") start = { row: rows - 1, col: cols - 1 };

    if (mazeObject.goal == "Top-left") goal = { row: 0, col: 0 };
    if (mazeObject.goal == "Top-right") goal = { row: 0, col: cols - 1 };
    if (mazeObject.goal == "Bottom-left") goal = { row: rows - 1, col: 0 };
    if (mazeObject.goal == "Bottom-right") goal = { row: rows - 1, col: cols - 1 };

    const maze = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const cell = {
                row: i,
                col: j,
                north: true,
                east: true,
                west: true,
                south: true,
                visited: false
            };
            row.push(cell);
        }
        maze.push(row);
    }

    model = {
        rows: rows,
        cols: cols,
        start: start,
        goal: goal,
        maze: maze
    };

    generateModelAldousBroder(start);
    return model;
}

function generateModelAldousBroder(start) {
    let cellsVisited = 1;
    const totalCells = model.rows * model.cols;
    let currentCell = model.maze[start.row][start.col];
    currentCell.visited = true;

    while (cellsVisited < totalCells) {
        let neighbors = getUnvisitedNeighbors(currentCell);
        if (neighbors.length > 0) {
            let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

            if (randomNeighbor.row === currentCell.row) {
                if (randomNeighbor.col > currentCell.col) {
                    currentCell.east = false;
                    model.maze[currentCell.row][currentCell.col + 1].west = false;
                } else {
                    currentCell.west = false;
                    model.maze[currentCell.row][currentCell.col - 1].east = false;
                }
            } else {
                if (randomNeighbor.row > currentCell.row) {
                    currentCell.south = false;
                    model.maze[currentCell.row + 1][currentCell.col].north = false;
                } else {
                    currentCell.north = false;
                    model.maze[currentCell.row - 1][currentCell.col].south = false;
                }
            }

            currentCell = model.maze[randomNeighbor.row][randomNeighbor.col];
            currentCell.visited = true;
            cellsVisited++;
        } else {
            let randomRow = Math.floor(Math.random() * model.rows);
            let randomCol = Math.floor(Math.random() * model.cols);
            currentCell = model.maze[randomRow][randomCol];
        }
    }
}

function getUnvisitedNeighbors(cell) {
    const neighbors = [];
    const { row, col } = cell;
    if (row > 0 && !model.maze[row - 1][col].visited) neighbors.push({ row: row - 1, col: col });
    if (row < model.rows - 1 && !model.maze[row + 1][col].visited) neighbors.push({ row: row + 1, col: col });
    if (col > 0 && !model.maze[row][col - 1].visited) neighbors.push({ row: row, col: col - 1 });
    if (col < model.cols - 1 && !model.maze[row][col + 1].visited) neighbors.push({ row: row, col: col + 1 });
    return neighbors;
}
