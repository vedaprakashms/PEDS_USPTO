const Excel = require('exceljs');
const path = require('path');
const { app } = require('electron');
const fs = require('fs');
var dir = path.join(app.getPath('desktop'), 'PEDS_Templates');
module.exports.xl_tmplate = function() {
    const workbook = new Excel.Workbook();
    workbook.creator = 'PEDS_USPTO Application';
    workbook.lastModifiedBy = 'PEDS_USPTO Application';
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet('Application num');

    // add column headers
    worksheet.columns = [
        { header: 'Application Number', key: 'package_name', width: 30 }
    ];



    worksheet.getCell('A1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0FFF0000' }
    };
    worksheet.getColumn('A').border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
    }

    // Add rows as Array values

    d = Date().toString()
    d = d.substring(4, 25)
    d = d.replace(/\s/g, '')
    d = d.replace(/:/g, '')

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // save workbook to disk
    workbook
        .xlsx
        .writeFile(path.join(dir, 'PEDS_tmplt_' + d + '.xlsx'))
        .then(() => {
            console.log("saved");
        })
        .catch((err) => {
            console.log("err", err);
        });

    return path.join(dir, 'PEDS_tmplt_' + d + '.xlsx')
}