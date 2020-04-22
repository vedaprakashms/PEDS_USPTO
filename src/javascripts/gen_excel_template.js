const Excel = require('exceljs');
const path = require('path');
const { app, shell, Notification } = require('electron');
const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('ExampleSheet');

// add column headers
worksheet.columns = [
    { header: 'Application Number', key: 'package_name', width: 30 }
];

// Add row using key mapping to columns
worksheet.addRow({
    package_name: 123456789
});

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
//shell.openExternal(path.join(app.getPath('desktop'), 'PEDS_Generate_template.xlsx'))