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
//check boxes monitoring
const app_data = document.getElementById('app_data');
const Trans_history = document.getElementById('Trans_history');
const PTA_data = document.getElementById('PTA_data');
const Addr_attr = document.getElementById('Addr_attr');
const Contunity_data = document.getElementById('Contunity_data');
const foreign_priority = document.getElementById('foreign_priority');
const assiginment_data = document.getElementById('assiginment_data');


var check_obj = {
    app_data: 1,
    Trans_history: 0,
    PTA_data: 1,
    Addr_attr: 0,
    Contunity_data: 1,
    foreign_priority: 0,
    assiginment_data: 0
};



app_data.onchange = () => {
    console.log(app_data.checked)
    if (app_data.checked) {
        check_obj['app_data'] = 1
    } else {
        check_obj['app_data'] = 0
    }
    console.log(check_obj)
}

Trans_history.onchange = () => {
    console.log(Trans_history.checked)
    if (Trans_history.checked) {
        check_obj['Trans_history'] = 1
    } else {
        check_obj['Trans_history'] = 0
    }
    console.log(check_obj)
}

PTA_data.onchange = () => {
    console.log(PTA_data.checked)
    if (PTA_data.checked) {
        check_obj['PTA_data'] = 1
    } else {
        check_obj['PTA_data'] = 0
    }
    console.log(check_obj)
}

Addr_attr.onchange = () => {
    console.log(Addr_attr.checked)
    if (Addr_attr.checked) {
        check_obj['Addr_attr'] = 1
    } else {
        check_obj['Addr_attr'] = 0
    }
    console.log(check_obj)
}

Contunity_data.onchange = () => {
    console.log(Contunity_data.checked)
    if (Contunity_data.checked) {
        check_obj['Contunity_data'] = 1
    } else {
        check_obj['Contunity_data'] = 0
    }
    console.log(check_obj)
}

foreign_priority.onchange = () => {
    console.log(foreign_priority.checked)
    if (foreign_priority.checked) {
        check_obj['foreign_priority'] = 1
    } else {
        check_obj['foreign_priority'] = 0
    }
    console.log(check_obj)
}

assiginment_data.onchange = () => {
    console.log(assiginment_data.checked)
    if (assiginment_data.checked) {
        check_obj['assiginment_data'] = 1
    } else {
        check_obj['assiginment_data'] = 0
    }
    console.log(check_obj)
}


function popUp(url) {

    shell.openExternal(url);
}

btn_close.addEventListener('click', e => {
    console.log('ping to close second window')
    ipcRenderer.send('close-second-window', check_obj)
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