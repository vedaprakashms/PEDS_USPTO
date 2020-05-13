const app = require('electron').remote.app;
const {ipcRenderer} = require('electron');
const Excel = require('exceljs');
const path = require('path');
const fs = require('fs');
const performance = require('perf_hooks').performance;


var dir = path.join(app.getPath('desktop'), 'PEDS_Results');



module.exports.writexldata = async(jsonFP, jsonobj) => {
    //JsonFP = database of all the information downloded form internet via other program
    //jsonobj = the selection from the second window.
    jsonfile = fs.readFileSync(jsonFP);
    //console.log(jsonfile);
    var obj = JSON.parse(jsonfile);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    
    var t0 = performance.now()

    //console.log(obj)
    d = Date().toString();
    d = d.substring(4, 25);
    d = d.replace(/\s/g, '');
    d = d.replace(/:/g, '');


    const options = {
        filename: path.join(app.getPath('desktop'), 'PEDS_Results', 'PEDS_' + d + '.xlsx'),
        useStyles: true,
        useSharedStrings: true
    };

    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    workbook.creator = 'PEDS_USPTO Application';
    workbook.lastModifiedBy = 'PEDS_USPTO Application';
    workbook.created = new Date();

    const AppldataSheet = workbook.addWorksheet('Application Data');
    const TransactionSheet = workbook.addWorksheet('Transaction History');
    const PTASheet = workbook.addWorksheet('Patent Term Extension');
    const Address_AttorneySheet = workbook.addWorksheet('Address_Attorney Information');
    const ContinuitySheet = workbook.addWorksheet('Continuity Data');
    const ForeignPrioritySheet = workbook.addWorksheet('Foreign Priority');
    const AssignmentSheet = workbook.addWorksheet('Assignments');
    fil = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'cccccc' }
    }
    const styl = {

            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            },
            alignment: {
                wrapText: true,
                indent: 1
            }
        }
        //defining the sheets column headers

    AppldataSheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30, style: styl },
        { header: 'Title of Invention', key: 'Title', width: 30, style: styl },
        { header: 'Legal Status', key: 'Legal_status', width: 30, style: styl },
        { header: 'Filing Date', key: 'Filing_date', width: 20, style: styl },
        { header: 'Legal Status Date', key: 'Legal_status_date', width: 20, style: styl },
        { header: 'Publication No', key: 'Pub_no', width: 20, style: styl },
        { header: 'Publication Date', key: 'Pub_date', width: 20, style: styl },
        { header: 'Patent Number', key: 'Pat_no', width: 30, style: styl },
        { header: 'Patented Date', key: 'Pat_date', width: 20, style: styl },
        { header: 'Inventors', key: 'Inventors', width: 30, style: styl },
        { header: 'Entity Status', key: 'Entity_status', width: 30, style: styl },
        { header: 'AIA ', key: 'AIA', width: 20, style: styl },
        { header: 'Application Type ', key: 'Application_type', width: 20, style: styl },
        { header: 'Examiner Name', key: 'Examiner_name', width: 20, style: styl },
        { header: 'Group Art Unit', key: 'Group_art', width: 20, style: styl },
        { header: 'Class', key: 'Class', width: 20, style: styl },
        { header: 'Subclass', key: 'SubClass', width: 20, style: styl },
    ];
    AppldataSheet.autoFilter = 'A1:Q1';
    AppldataSheet.getRow(1).fill = fil;
    AppldataSheet.properties.defaultRowHeight = 75;

    TransactionSheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30, style: styl },
        { header: 'Transaction History', key: 'Trans_data', width: 100, style: styl }
    ];
    TransactionSheet.autoFilter = 'A1:B1';
    TransactionSheet.getRow(1).fill = fil;
    TransactionSheet.properties.defaultRowHeight = 75;

    PTASheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30, style: styl },
        { header: 'Total PTA Adjustments:', key: 'PTA', width: 20, style: styl }
    ];
    PTASheet.autoFilter = 'A1:B1';
    PTASheet.getRow(1).fill = fil;
    PTASheet.properties.defaultRowHeight = 75;

    Address_AttorneySheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30, style: styl },
        { header: 'Name', key: 'Name', width: 20, style: styl },
        { header: 'Address', key: 'Attr_Address', width: 20, style: styl },
        { header: 'Customer Number', key: 'Customer_Number', width: 20, style: styl },
        { header: 'ATTORNEY/AGENT INFORMATION', key: 'attrny_info', width: 20, style: styl },
    ];
    Address_AttorneySheet.autoFilter = 'A1:E1';
    Address_AttorneySheet.getRow(1).fill = fil;
    Address_AttorneySheet.properties.defaultRowHeight = 75;

    ContinuitySheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30, style: styl },
        { header: 'Parent', key: 'Parent', width: 70, style: styl },
        { header: 'Child', key: 'Child', width: 70, style: styl },
    ];
    ContinuitySheet.autoFilter = "A1:C1";
    ContinuitySheet.getRow(1).fill = fil;
    ContinuitySheet.properties.defaultRowHeight = 75;

    ForeignPrioritySheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30, style: styl },
        { header: 'Data', key: 'data', width: 20, style: styl }

    ];
    ForeignPrioritySheet.autoFilter = "A1:B1";
    ForeignPrioritySheet.getRow(1).fill = fil;
    ForeignPrioritySheet.properties.defaultRowHeight = 75;


    AssignmentSheet.columns = [
        { header: 'Application Number', key: 'Appl_no', width: 30, style: styl },
        { header: 'Number of Assignment', key: 'NoA', width: 20, style: styl },
        { header: 'Assignment1', key: 'Assignment1', width: 20, style: styl },
        { header: 'Assignment2', key: 'Assignment2', width: 20, style: styl },
        { header: 'Assignment3', key: 'Assignment3', width: 20, style: styl },
        { header: 'Assignment4', key: 'Assignment4', width: 20, style: styl },
        { header: 'Assignment5', key: 'Assignment5', width: 20, style: styl },
        { header: 'Assignment6', key: 'Assignment6', width: 20, style: styl },
        { header: 'Assignment7', key: 'Assignment7', width: 20, style: styl },
        { header: 'Assignment8', key: 'Assignment8', width: 20, style: styl },
        { header: 'Assignment9', key: 'Assignment9', width: 20, style: styl },
        { header: 'Assignment10', key: 'Assignment10', width: 20, style: styl },
        { header: 'Assignment11', key: 'Assignment11', width: 20, style: styl },
        { header: 'Assignment12', key: 'Assignment12', width: 20, style: styl },
        { header: 'Assignment13', key: 'Assignment13', width: 20, style: styl },
        { header: 'Assignment14', key: 'Assignment14', width: 20, style: styl },
        { header: 'Assignment15', key: 'Assignment15', width: 20, style: styl },
        { header: 'Assignment16', key: 'Assignment16', width: 20, style: styl },
        { header: 'Assignment17', key: 'Assignment17', width: 20, style: styl },
        { header: 'Assignment18', key: 'Assignment18', width: 20, style: styl },
        { header: 'Assignment19', key: 'Assignment19', width: 20, style: styl },
        { header: 'Assignment20', key: 'Assignment20', width: 20, style: styl },
        { header: 'Assignment', key: 'Assignment21', width: 20, style: styl },

    ];
    AssignmentSheet.autoFilter = "A1:W1";
    AssignmentSheet.getRow(1).fill = fil;
    AssignmentSheet.properties.defaultRowHeight = 75;



    for (var k in obj) {
        console.log( "Starting work on" +obj[k]['applId'])

        //application data entering
        if (jsonobj['app_data'] == 1) {
            
            AppldataSheet.addRow({
                Appl_no: obj[k]['applId'],
                Title: obj[k]['patentTitle'],
                Legal_status: obj[k]['appStatus'],
                Filing_date: obj[k]['appFilingDate'],
                Legal_status_date: obj[k]['appStatusDate'],
                Pub_no: obj[k]['appEarlyPubNumber'],
                Pub_date: obj[k]['appEarlyPubDate'],
                Pat_no: obj[k]['patentNumber'],
                Pat_date: obj[k]['patentIssueDate'],
                Inventors: inventors_export(obj[k]['inventors']),
                Entity_status: obj[k]['appEntityStatus'],
                AIA: obj[k]['firstInventorFile'],
                Application_type: obj[k]['appType'],
                Examiner_name: obj[k]['appExamName'],
                Group_art: obj[k]['appGrpArtNumber'],
                Class: obj[k]['appCls'],
                SubClass: obj[k]['appSubCls']
            }).commit();
        };

        // trasnaction history
        if (jsonobj['Trans_history'] == 1) {
            //console.log(obj[k]['transactions'])
            TransactionSheet.addRow({
                Appl_no: obj[k]['applId'],
                Trans_data: Trans_history_fn(obj[k]['transactions'])
            }).commit();
        };
        //PTA_data
        if (jsonobj['PTA_data'] == 1) {
            //console.log(obj[k]['transactions'])
            PTASheet.addRow({
                Appl_no: obj[k]['applId'],
                PTA: obj[k]['totalPtoDays']
            }).commit();
        };

        //Attorney Agent info
        if (jsonobj['Addr_attr'] == 1) {
            //console.log(obj[k]['attrnyAddr'])
            Address_AttorneySheet.addRow({
                Appl_no: obj[k]['applId'],
                Name: obj[k]['corrAddrNameLineOne'],
                Attr_Address: obj[k]['corrAddrNameLineTwo'] + ", " + obj[k]['corrAddrStreetLineOne'] + ", " + obj[k]['corrAddrStreetLineTwo'] + ", " + obj[k]['corrAddrCity'] + ", " + obj[k]['corrAddrGeoRegionCode'],
                Customer_Number: obj[k]['corrAddrCustNo'],
                attrny_info: attr_info(obj[k]['attrnyAddr'])
            }).commit();
        };

        //Parent COntinuty
        if (jsonobj['Contunity_data'] == 1) {
            //console.log(obj[k]['attrnyAddr'])
            ContinuitySheet.addRow({
                Appl_no: obj[k]['applId'],
                Parent: parent_con(obj[k]['parentContinuity']),
                Child: child_con(obj[k]['childContinuity']),

            }).commit();
        };
        //foreign priority
        if (jsonobj['foreign_priority'] == 1) {
            //console.log(obj[k]['attrnyAddr'])
            ForeignPrioritySheet.addRow({
                Appl_no: obj[k]['applId'],
                data: ForeignPriority_data(obj[k]['foreignPriority'])

            }).commit();
        };
        //Assignemnt data
        //console.log(obj[k]['applId'])
        //console.log(obj[k]['assignments'])

        if (jsonobj['assiginment_data'] == 1) {
            if (obj[k]['assignments'] != undefined) {
                var xyz = Assiginment_array(obj[k]['assignments'], obj[k]['applId'], obj[k]['assignments'].length);
                //console.log(xyz)
                AssignmentSheet.addRow(xyz).commit();
            } else {
                AssignmentSheet.addRow([obj[k]['applId'], 0]).commit();
            }
        };


    }

    workbook.commit().then(function() {
        console.log('excel file cretaed');
        document.getElementById('prgresstrack').innerHTML = "Finished writing Excel file, please check the file at <br>" + options['filename']
        ipcRenderer.send("Excel-completed", options['filename']);
    });
    var t1 = performance.now()
    console.log("Call to fetch application data from uspto took " + (t1 - t0) / 1000 + " seconds to complete a set ")
}

inventors_export = (array) => {

    temp = ""
    //console.log(array)
    if(array == undefined)
    {
        return "-"
    }
    else{
        //temp += element['nameLineTwo'] + " " + element['nameLineOne'] + "\n"
        array.forEach(element => {
            //console.log(element)
            temp += element['nameLineTwo'] + " " + element['nameLineOne'] + "\n"
        });

    }

    //console.log(inventors)
    return temp
}

function Trans_history_fn(array) {
    temp = ""
if(array==undefined){
    return "-"
}else{
    array.forEach(element => {
        //console.log(element)
        temp += element['description'] + " Dated " + element['recordDate'] + " With code " + element['code'] + "\n"

    });
}

    return temp
}

attr_info = (array) => {
    temp = "";
    if (array == undefined) {
        return "-"
    } else {
        array.forEach(e => {
            temp += e['fullName'] + "\n"
        })
        return temp
    }
}
child_con = (array) => {
    temp = "";
    if (array == undefined) {
        return "-"
    } else {
        array.forEach(e => {
            temp += e['patentNumberText'] + "(" + e['claimApplicationNumberText'] + ") filed on " + e['filingDate'] + " " + e['applicationStatusDescription'] + " " + e['applicationNumberText'] + "\n"
        })
        return temp
    }
}
parent_con = (array) => {
    temp = "";
    if (array == undefined) {
        return "-"
    } else {
        array.forEach(e => {
            temp += e['applicationStatusDescription'] + " parent application number " + e['claimApplicationNumberText'] + " filed on " + e['filingDate'] + " with status as " + e['applicationStatus'] + " - " + e['patentNumberText'] + "\n"
        })
        return temp
    }
}
ForeignPriority_data = (array) => {
    temp = "";
    if (array == undefined) {
        return "-"
    } else {
        array.forEach(e => {
            temp += " Claims the priority from " + e['priorityClaim'] + " Filed on " + e['filingDate'] + " - " + e['countryName'] + "\n"
        })
        return temp
    }
}
Assiginment_len = (array) => {
    temp = "";
    if (array == undefined) {
        return 0
    } else {
        return array.length
    }
}

Assiginment_array = (array, appid, len) => {
    var temp = [];
    temp[0] = appid;
    temp[1] = len;
    if (array == undefined) {
        return 0
    } else {
        array.forEach(element => {

            var kar = "Reel/Frame: " + element['reelNumber'] + " / " + element['frameNumber'] + "\n" +
                "Pages: " + element['pagesCount'] + "\n" +
                "Received date:" + element['receivedDate'] + "\n" +
                "Recorded date:" + element['recordedDate'] + "\n" +
                "Mailed date:" + element['mailDate'] + "\n" +
                "Conveyance:" + element['converyanceName'] + "\n" +
                "Assignor:" + Assignor(element['assignors']) + "\n" +
                "Assignee:" + Assignee(element['assignee']) + "\n" +
                "Correspondent:" + element['addressNameText'] + "\n" +
                +element['addressLineOneText'] + "\n" +
                element['addressLineTwoText'] + "\n" +
                element['addressLineThreeText'] + "\n" +
                element['addressLineFourText'] + "\n";

            //console.log(kar);
            temp.push(kar)
        });
        //console.log(temp)
        return (temp)


    }
}

Assignor = (array) => {

    var temp
    if (array == undefined) {
        return ""
    } else {
        array.forEach(element => {
            temp += element['assignorName'] + " executed on the date " + element['execDate'] + "\n"
        });
        return temp
    }
}
Assignee = (array) => {
    temp = ""
    if (array == undefined) {
        return ""
    } else {
        array.forEach(element => {
            temp += element['assigneeName'] + "\n" +
                element['streetLineOneText'] + "\n" +
                element['streetLineTwoText'] + "\n" +
                element['cityName'] + "\n" +
                element['countryCode'] + "\n" +
                element['postalCode']

        });
        return temp
    }
}