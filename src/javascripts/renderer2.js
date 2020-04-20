const { ipcRenderer } = require('electron');
const btn_close = document.getElementById('close_tab');
var check_obj = {}

btn_close.addEventListener('click', e => {
    console.log('ping to close second window')
    ipcRenderer.send('close-second-window', 'ping to close second window')
});