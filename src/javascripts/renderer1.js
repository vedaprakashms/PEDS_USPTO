const fs = require('fs');
const xlarray = require('../javascripts/exceltoarray');
const create_bare_Excelsheet = require('../javascripts/create_bare_Excelsheet');
const { clipboard, ipcRenderer, shell } = require('electron');
const toastr = require('toastr');
const path = require('path');



//declaration of all the buttons in index.html
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
const btn_open_tmplt = document.getElementById('open_tmplt');
const btn_execute_file = document.getElementById('execute_file');



// to popup the external sites/files
function popUp(url) {
    shell.openExternal(url);
}
//author buttons activation
btngithub.addEventListener('click', e => {
    popUp('https://github.com/vedaprakashms')
});
btnshare.addEventListener('click', e => {
    popUp('https://github.com/vedaprakashms/PEDS_USPTO')
});
btntwitter.addEventListener('click', e => {
    popUp('https://twitter.com/vedms')
});
btnfb.addEventListener('click', e => {
    popUp('https://www.facebook.com/vedms/')
});
btnlinkdin.addEventListener('click', e => {
    popUp('https://www.linkedin.com/in/vedms')
});
btnCR.addEventListener('click', e => {
    popUp(path.join(path.dirname(__dirname), "license", 'SWlicense.txt'))
});
btnlic.addEventListener('click', e => {
    popUp(path.join(path.dirname(__dirname), "license", '3dpartylicense.txt'))
});



// to execute the program
btn_execute_file.addEventListener('click', e => {

    ipcRenderer.send('Start_work', 'ping to Start work');
    // code to make a template file needs to be placed here.
    // dialog.showMessageBoxSync({
    //     title: "Place holder for execution",
    //     message: "Place holder to start execution of program\nWork in progress, the functionality will bee added soon!!!"
    // })

    //console.log(dialog)


});

//to execute the template 
btn_open_tmplt.addEventListener('click', e => {
    console.log('trying too open excel')
        // code to make a template file needs to be placed here.
    ipcRenderer.send('gen_template', 'ping to generate template')

});

//to execute the file explorer to select the file
btn_file.addEventListener('click', e => {
    ipcRenderer.send('file-open-msg', 'ping for file')
});

//to execute the selection window
btn_select.addEventListener('click', e => {
    console.log('ping to open second window')
    ipcRenderer.send('open-second-window', 'ping to open second window')
});
//closing main window
btnclsmain.addEventListener('click', e => {
    console.log('ping to close main window')
    ipcRenderer.send('Close-main-window', 'ping to open second window')
});
//updating the index.html file for file path.
ipcRenderer.on('file-open-msg-reply', (event, arg) => {
    //console.log(arg) // prints "pong"
    document.getElementById('file_path').innerHTML = arg
});


ipcRenderer.on('download-start', async(event, arg) => {
    var one
    await xlarray.excel2arr(path.join(document.getElementById('file_path').innerHTML))
        .then((res) => {
            //console.log(res)
            var dummy = res;
        }).then(() => {
            //console.log('clicked');

            //console.log(dummy)
            xlarray.data2json(dummy).then(e => {
                console.log(e);
                console.log(arg);
                one = e;
                console.log(one);
                console.log('this is first msg!!')

            }).then(() => {
                console.log("this should be secons msg!!");
                create_bare_Excelsheet.writexldata(one, arg)
            })

        });

    //create_bare_Excelsheet.writexldata(one, arg)
});



// notification for generating the notification
ipcRenderer.on('tmplt-notification', (event, arg) => {
    console.log(arg) // prints "pong"
    document.getElementById('file_path').innerHTML = arg


    noty = new Notification('Template Generated', {

        title: 'Template Generated',
        body: arg + "\n Path Copied",
        icon: path.join('../', 'img', 'excel.png')
    })

    noty.onclick = function() {
        console.log('Trying to open the generated file')
        shell.openExternal(arg)
            // clipboard.writeText('Example String', 'selection')
            // console.log(clipboard.readText('selection'))
    }

    noty.onshow = () => {
        clipboard.writeText(arg, 'selection')
        console.log(clipboard.readText('selection'))
    }



});