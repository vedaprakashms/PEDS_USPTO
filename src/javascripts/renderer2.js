const path = require('path');
const { ipcRenderer, shell } = require('electron');
const btn_close = document.getElementById('close_tab');

var PopUpObj;


function popUp(url) {


    PopUpObj = shell.openExternal(url);


}

btn_close.addEventListener('click', e => {
    console.log('ping to close second window')
    ipcRenderer.send('close-second-window', 'ping to close second window')
});