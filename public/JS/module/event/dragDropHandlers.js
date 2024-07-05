// dragDropHandlers.js
import { updateCoinCount } from './coinHandlers.js';
import { sendDataToServer } from './serverCommunication.js';
import{lamps} from '../main.js'
import { activeLamp } from './lampHandlers.js';

export function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

export function dragOver(event) {
    event.preventDefault();
}

export function drop(event, lamps) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const coin = document.getElementById(id);
    if (coin) {
        const activeLampData = lamps.find(({ lamp }) => lamp === activeLamp);
        activeLampData.coinCount += 1;
        updateCoinCount(activeLampData.coinCount);
        sendDataToServer(id);
    }
}

export function setDropZoneEventListeners() {
    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', event => drop(event, lamps));
}
