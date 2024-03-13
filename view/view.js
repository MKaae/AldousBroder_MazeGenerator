"use strict"

import { getMaze } from "../controller/controller.js";

addEventListeners();

function addEventListeners(){
    const button = document.getElementById('generate-btn');
    button.addEventListener('click', () => sendInput())
}

function sendInput(){
    const rows = document.getElementById('rows-cols').value;
    const cols = document.getElementById('rows-cols').value;
    const start = document.getElementById('start').value;
    const goal = document.getElementById('end').value;
    const mazeObject = {
        rows: rows,
        cols: cols,
        start: start,
        goal: goal
    }
    const model = getMaze(mazeObject);

    document.getElementById('rows-cols').classList.add('hidden');
    document.getElementById('start').classList.add('hidden');
    document.getElementById('end').classList.add('hidden');
    document.getElementById('start-text').classList.add('hidden');
    document.getElementById('end-text').classList.add('hidden');
    document.getElementById('generate-btn').classList.add('hidden');
    document.getElementById('json-text').classList.remove('hidden');

    const textArea = document.getElementById('json-text');
    textArea.textContent = JSON.stringify(model);
}
