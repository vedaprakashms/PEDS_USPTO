const Excel = require('exceljs');
const path = require('path');
const { app } = require('electron');
const fs = require('fs');
var dir = path.join(app.getPath('desktop'), 'PEDS_Results');



module.exports.barexl = function() {

    var workbook = new Excel.Workbook();
    workbook.creator = 'PEDS_USPTO Application';
    workbook.lastModifiedBy = 'PEDS_USPTO Application';
    workbook.created = new Date();

    const AppldataSheet = workbook.addWorksheet('Application Data');
    const TransactionSheet = workbook.addWorksheet('Transaction History');
    const PTASheet = workbook.addWorksheet('Patent Term Extension');
    const Address_AttorneySheet = workbook.addWorksheet('Address_Attorney Information');
    const ParentContinuitySheet = workbook.addWorksheet('Parent Continuity Data');
    const ChildContinuitySheet = workbook.addWorksheet('Child Continuity Data');
    const ForeignPrioritySheet = workbook.addWorksheet('Foreign Priority');
    const AssignmentSheet = workbook.addWorksheet('Assignments');

    AppldataSheet.views = [
        { state: 'frozen', xSplit: 1, ySplit: 1, topLeftCell: 'B2', activeCell: 'A1' }
    ];
    TransactionSheet.views = [
        { state: 'frozen', xSplit: 1, ySplit: 1, topLeftCell: 'B2', activeCell: 'A1' }
    ];
    PTASheet.views = [
        { state: 'frozen', xSplit: 1, ySplit: 1, topLeftCell: 'B2', activeCell: 'A1' }
    ];
    Address_AttorneySheet.views = [
        { state: 'frozen', xSplit: 1, ySplit: 1, topLeftCell: 'B2', activeCell: 'A1' }
    ];
    ParentContinuitySheet.views = [
        { state: 'frozen', xSplit: 1, ySplit: 1, topLeftCell: 'B2', activeCell: 'A1' }
    ];
    ChildContinuitySheet.views = [
        { state: 'frozen', xSplit: 1, ySplit: 1, topLeftCell: 'B2', activeCell: 'A1' }
    ];
    ForeignPrioritySheet.views = [
        { state: 'frozen', xSplit: 1, ySplit: 1, topLeftCell: 'B2', activeCell: 'A1' }
    ];
    AssignmentSheet.views = [
        { state: 'frozen', xSplit: 1, ySplit: 1, topLeftCell: 'B2', activeCell: 'A1' }
    ];




    d = Date().toString()
    d = d.substring(0, 25)
    d = d.replace(/\s/g, '')
    d = d.replace(/:/g, '')
    console.log(d)
        // workbook.xlsx.writeFile(path.join(app.getPath('desktop'), 'PEDS_USPTO_Result.xlsx'), {
        //     filename: ""
        // });
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    workbook.xlsx.writeFile(path.join(app.getPath('desktop'), 'PEDS_Results', 'PEDS' + d + '.xlsx'))
    console.log("created bare excel file at: " + path.join(app.getPath('desktop'), 'PEDS_Results', 'PEDS' + d + '.xlsx'))
    return path.join(app.getPath('desktop'), 'PEDS_Results', 'PEDS' + d + '.xlsx')
}