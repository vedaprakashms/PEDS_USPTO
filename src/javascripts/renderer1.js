const { ipcRenderer, shell } = require('electron');
const path = require('path');
const btn_file = document.getElementById('open_filedg');
const btn_select = document.getElementById('select_check');
const btngithub = document.getElementById('ved_github');
const btntwitter = document.getElementById('ved_twitter');
const btnfb = document.getElementById('ved_fb');
const btnlinkdin = document.getElementById('ved_linkdin');
const btnlic = document.getElementById('ved_license');
const btnCR = document.getElementById('ved_copyright');
const btnshare = document.getElementById('ved_share');
const btnclsmain = document.getElementById('close_tab_main');
ved_share



function popUp(url) {


    shell.openExternal(url);


}

btngithub.addEventListener('click', e => {
    popUp('https://github.com/vedaprakashms')
})
btnshare.addEventListener('click', e => {
    popUp('https://github.com/vedaprakashms/PEDS_USPTO')
})
btntwitter.addEventListener('click', e => {
    popUp('https://twitter.com/vedms')
})
btnfb.addEventListener('click', e => {
    popUp('https://www.facebook.com/vedms/')
})
btnlinkdin.addEventListener('click', e => {
    popUp('https://www.linkedin.com/in/vedms')
})
btnCR.addEventListener('click', e => {
    popUp(path.join(path.dirname(__dirname), "license", 'SWlicense.txt'))
})
btnlic.addEventListener('click', e => {
    popUp(path.join(path.dirname(__dirname), "license", '3dpartylicense.txt'))
})

btn_file.addEventListener('click', e => {
    ipcRenderer.send('file-open-msg', 'ping for file')
})

btn_select.addEventListener('click', e => {
    console.log('ping to open second window')
    ipcRenderer.send('open-second-window', 'ping to open second window')
});

btnclsmain.addEventListener('click', e => {
    console.log('ping to close main window')
    ipcRenderer.send('Close-main-window', 'ping to open second window')
});

ipcRenderer.on('file-open-msg-reply', (event, arg) => {
    console.log(arg) // prints "pong"
    document.getElementById('file_path').innerHTML = arg
})

ipcRenderer.on('file-open-msg-reply', (event, arg) => {
    console.log(arg) // prints "pong"
    document.getElementById('file_path').innerHTML = arg
})