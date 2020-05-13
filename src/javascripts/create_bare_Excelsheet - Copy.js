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

    workbook.eachSheet(function(worksheet, sheetId) {
        // ...
        //console.log(worksheet.name + " - sheet id " + sheetId)
        worksheet.views = [
            { state: 'frozen', xSplit: 1, ySplit: 1, topLeftCell: 'B2', activeCell: 'A1' }
        ];
    });

    //defining the sheets column headers

    AppldataSheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30 },
        { header: 'Title of Invention', key: 'Title', width: 30 },
        { header: 'Legal Status', key: 'Legal_status', width: 30 },
        { header: 'Filing Date', key: 'Filing_date', width: 20 },
        { header: 'Legal Status Date', key: 'Legal_status', width: 20 },
        { header: 'Publication No', key: 'Pub_no', width: 20 },
        { header: 'Publication Date', key: 'Pub_date', width: 20 },
        { header: 'Patent Number', key: 'Pat_no', width: 30 },
        { header: 'Patented Date', key: 'Pat_date', width: 20 },
        { header: 'Inventors', key: 'Inventors', width: 30 },
        { header: 'Entity Status', key: 'Entity_status', width: 30 },
        { header: 'AIA ', key: 'AIA', width: 20 },
        { header: 'Application Type ', key: 'Application_type', width: 20 },
        { header: 'Examiner Name', key: 'Examiner_name', width: 20 },
        { header: 'Group Art Unit', key: 'Group_art', width: 20 },
        { header: 'Class', key: 'Class', width: 20 },
        { header: 'Subclass', key: 'SubClass', width: 20 },
    ];

    TransactionSheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30 },
        { header: 'Data', key: 'data', width: 20 }
    ];
    PTASheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30 },
        { header: 'Total PTA Adjustments:', key: 'PTA', width: 20 }
    ];
    Address_AttorneySheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30 },
        { header: 'Name', key: 'Name', width: 20 },
        { header: 'Address', key: 'Address', width: 20 },
        { header: 'Customer Number', key: 'Customer_Number', width: 20 },
        { header: 'ATTORNEY/AGENT INFORMATION', key: 'ATTORNEY_INFORMATION', width: 20 },
    ];
    ParentContinuitySheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30 },
        { header: 'Parent1', key: 'Parent1', width: 20 },
        { header: 'Parent2', key: 'Parent2', width: 20 },
        { header: 'Parent3', key: 'Parent3', width: 20 },
        { header: 'Parent4', key: 'Parent4', width: 20 },
        { header: 'Parent5', key: 'Parent5', width: 20 },
        { header: 'Parent6', key: 'Parent6', width: 20 },
        { header: 'Parent7', key: 'Parent7', width: 20 },


    ];
    ChildContinuitySheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30 },
        { header: 'Child1', key: 'Child1', width: 20 },
        { header: 'Child2', key: 'Child2', width: 20 },
        { header: 'Child3', key: 'Child3', width: 20 },
        { header: 'Child4', key: 'Child4', width: 20 },
        { header: 'Child5', key: 'Child5', width: 20 },
        { header: 'Child6', key: 'Child6', width: 20 },
        { header: 'Child7', key: 'Child7', width: 20 },

    ];
    AssignmentSheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30 },
        { header: 'Assignment1', key: 'Assignment1', width: 20 },
        { header: 'Assignment2', key: 'Assignment2', width: 20 },
        { header: 'Assignment3', key: 'Assignment3', width: 20 },
        { header: 'Assignment4', key: 'Assignment4', width: 20 },
        { header: 'Assignment5', key: 'Assignment5', width: 20 },
        { header: 'Assignment6', key: 'Assignment6', width: 20 },
        { header: 'Assignment7', key: 'Assignment7', width: 20 },
        { header: 'Assignment8', key: 'Assignment8', width: 20 },
        { header: 'Assignment9', key: 'Assignment9', width: 20 },
        { header: 'Assignment10', key: 'Assignment10', width: 20 },
        { header: 'Assignment11', key: 'Assignment11', width: 20 },
        { header: 'Assignment12', key: 'Assignment12', width: 20 },
        { header: 'Assignment13', key: 'Assignment13', width: 20 },
        { header: 'Assignment14', key: 'Assignment14', width: 20 },
        { header: 'Assignment15', key: 'Assignment15', width: 20 },
        { header: 'Assignment16', key: 'Assignment16', width: 20 },
        { header: 'Assignment17', key: 'Assignment17', width: 20 },
        { header: 'Assignment18', key: 'Assignment18', width: 20 },
        { header: 'Assignment19', key: 'Assignment19', width: 20 },
        { header: 'Assignment20', key: 'Assignment20', width: 20 },
        { header: 'Assignment', key: 'Assignment21', width: 20 },

    ];
    ForeignPrioritySheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30 },
        { header: 'Data', key: 'data', width: 20 }

    ];



    workbook.eachSheet(function(worksheet, sheetId) {
        // ...
        worksheet.getRow(1).eachCell(function(cell, colNumber) {
            //console.log('Cell ' + colNumber + ' = ' + cell.value);
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'cccccc' }
            };
            worksheet.autoFilter = {
                from: {
                    row: 1,
                    column: 1
                },
                to: {
                    row: 1,
                    column: colNumber
                }
            }


        });

    });


    d = Date().toString();
    d = d.substring(4, 25);
    d = d.replace(/\s/g, '');
    d = d.replace(/:/g, '');
    //console.log(d)
    // workbook.xlsx.writeFile(path.join(app.getPath('desktop'), 'PEDS_USPTO_Result.xlsx'), {
    //     filename: ""
    // });
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    workbook.xlsx.writeFile(path.join(app.getPath('desktop'), 'PEDS_Results', 'PEDS_' + d + '.xlsx'));
    //console.log("created bare excel file at: " + path.join(app.getPath('desktop'), 'PEDS_Results', 'PEDS_' + d + '.xlsx'))
    return path.join(app.getPath('desktop'), 'PEDS_Results', 'PEDS_' + d + '.xlsx');
}