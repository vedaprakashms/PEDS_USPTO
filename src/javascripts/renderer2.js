const { ipcRenderer, shell } = require('electron');
const path = require('path');
const btn_close = document.getElementById('close_tab');
const btn_github_ved = document.getElementById('github_ved');
const btn_tweet_ved = document.getElementById('tweet_ved');
const btn_fb_ved = document.getElementById('fb_ved');
const btn_linkdn_ved = document.getElementById('linkdn_ved');
const btn_cr_ved = document.getElementById('cr_ved');
const btn_lic_ved = document.getElementById('lic_ved');
const btn_share_ved = document.getElementById('share_ved');


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
});

btn_tweet_ved.addEventListener('click', e => {
    popUp('https://twitter.com/vedms')
});

btn_fb_ved.addEventListener('click', e => {
    popUp('https://www.facebook.com/vedms/')
});
btn_linkdn_ved.addEventListener('click', e => {
    popUp('https://www.linkedin.com/in/vedms')
});
btn_cr_ved.addEventListener('click', e => {

    popUp(path.join(path.dirname(__dirname), "license", 'SWlicense.txt'))
});
btn_lic_ved.addEventListener('click', e => {
    popUp(path.join(path.dirname(__dirname), "license", '3dpartylicense.txt'))
});
btn_share_ved.addEventListener('click', e => {
    popUp('https://github.com/vedaprakashms/PEDS_USPTO')
});