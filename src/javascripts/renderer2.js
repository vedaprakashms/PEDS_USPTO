const { ipcRenderer, shell } = require('electron');
const btn_close = document.getElementById('close_tab');
const btn_github_ved = document.getElementById('github_ved');
var check_obj = {}




function popUp(url) {

    shell.openExternal(url);


}

btn_close.addEventListener('click', e => {
    console.log('ping to close second window')
    ipcRenderer.send('close-second-window', 'ping to close second window')
});

btn_github_ved.addEventListener('click', e => {
    popUp('https://github.com/vedaprakashms')
})