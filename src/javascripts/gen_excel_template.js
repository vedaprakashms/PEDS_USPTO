const Excel = require('exceljs');
const path = require('path');
const { app } = require('electron');
module.exports.xl_tmplate = function() {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('ExampleSheet');

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

    // save workbook to disk
    workbook
        .xlsx
        .writeFile(path.join(app.getPath('desktop'), 'PEDS_Generate_template.xlsx'))
        .then(() => {
            console.log("saved");
        })
        .catch((err) => {
            console.log("err", err);
        });
}