const Excel = require('exceljs');
const axios = require('axios');
const axiosRetry = require('axios-retry');
const performance = require('perf_hooks').performance;
const fs = require('fs')
const path = require('path');

//progress bar
const progressbar = document.getElementById("progress");

payload = {
    //"searchText": "applId:" + "16384156 14164884 11838022",
    "searchText": "applId:16384156",
    "fl": "*",
    "mm": "100%",
    "qf": "appEarlyPubNumber applId appLocation appType appStatus_txt appConfrNumber appCustNumber appGrpArtNumber appCls appSubCls appEntityStatus_txt patentNumber patentTitle primaryInventor firstNamedApplicant appExamName appExamPrefrdName appAttrDockNumber appPCTNumber appIntlPubNumber wipoEarlyPubNumber pctAppType firstInventorFile appClsSubCls rankAndInventorsList",
    "facet": "false",
    "sort": "applId asc",
    "start": "0"
}
var data_json = {};
var excel_path;
// module to resolve the excel column a data to a array
module.exports.excel2arr = async(path) => {
    dummy = []
    excel_path = path
    var k
    var workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(path)
        .then(() => {
            var worksheet = workbook.getWorksheet(1);
            var dobCol = worksheet.getColumn(1);
            dobCol.eachCell(function(cell, rowNumber) {
                k = cell.value
                k = k.toString()
                k = k.replace(/[A-Za-z]/g, "");
                k = k.replace(/[A-Za-z]/g, "");
                k = k.replace(/[',-\/\\]/g, "");

                //console.log(k)
                dummy.push(k)
            });
            //console.log(dummy)

            //console.log(worksheet.getCell('A1').value)
            dummy.splice(0, 1);
            //console.log(dummy)

        })

    return new Promise((resolve, reject) => {
        if (path !== "") {
            resolve(dummy);
        } else {
            reject('not found');
        }
    })



}


module.exports.peds_fetch = async function(payload) {
    var data1
    axiosRetry(axios, { retries: 5 });
    await axios.post('https://ped.uspto.gov/api/queries', payload)
        .then(res => {
            data1 = res
        })
        .catch(console.log);

    //console.log(data1.data.queryResults.searchResponse.response.docs[0])
    return data1.data.queryResults.searchResponse.response.docs[0]

}



module.exports.data2json = async(array) => {
    var t0 = performance.now()
    progressbar.max = "" + array.length + "";

    i = 1;
    for (num of array) {
        payload.searchText = 'applId:' + num;
        //console.log(num)
        await xlarray.peds_fetch(payload)
            .then(res => {
                console.log(res)
                data_json[num] = res
                document.getElementById('appno').innerHTML = res['applId'];
                document.getElementById('statdate').innerHTML = res['appStatusDate'];
                document.getElementById('status').innerHTML = res['appStatus'];
                document.getElementById('Pubno').innerHTML = res['appEarlyPubNumber'];
                document.getElementById('Pubdate').innerHTML = res['appEarlyPubDate'];
                document.getElementById('Pubdate').innerHTML = res['appEarlyPubDate'];
                document.getElementById('Title').innerHTML = res['patentTitle'];
                document.getElementById('patno').innerHTML = res['patentNumber'];
                document.getElementById('patdate').innerHTML = res['patentIssueDate'];
                document.getElementById('entity').innerHTML = res['appEntityStatus'];
                document.getElementById('pta').innerHTML = res['totalPtoDays'];
                if (res['assignments'] != undefined) {
                    document.getElementById('Assign').innerHTML = res['assignments'].length;
                } else {
                    document.getElementById('Assign').innerHTML = '0';
                }
                document.getElementById('Inv').innerHTML = res['inventorName'];
                if (res['parentContinuity'] != undefined) {
                    document.getElementById('parentcon').innerHTML = res['parentContinuity'].length;
                } else {
                    document.getElementById('parentcon').innerHTML = 0;
                }
                if (res['childContinuity'] != undefined) {
                    document.getElementById('childcon').innerHTML = res['childContinuity'].length;
                } else {
                    document.getElementById('childcon').innerHTML = 0;
                }
                document.getElementById('AIA').innerHTML = res['firstInventorFileFacet'];
            })
            .catch(err => {
                console.log(err)
            })

        progressbar.value = "" + i + "";

        i++;
        document.getElementById('prgresstrack').innerHTML = "Completed " + progressbar.value + " of " + progressbar.max;
    }

    //console.log(path.dirname(excel_path))
    //console.log(path.basename(excel_path, '.xlsx'))
    document.getElementById('prgresstrack').innerHTML = "Writing data to Excel file!!, please wait for a notification :)"
    data_jasonsting = JSON.stringify(data_json)
    var filenama = path.join(path.dirname(excel_path), path.basename(excel_path, '.xlsx')) + '.json'
        //console.log(filenama)
    fs.writeFileSync(filenama, data_jasonsting)
        //console.log(data_json)
        //console.log('done')
    var t1 = performance.now()
    console.log("Call to fetch application data from uspto took " + (t1 - t0) / 1000 + " seconds to complete a set of " + array.length + " applications")
    return new Promise((resolve, reject) => {
        if (filenama !== "") {
            console.log('data written sucessful')
            resolve(filenama);
        } else {
            reject('not found');
        }
    })
}

// module.exports.excel2arr = (path) => {
//     dummy = []
//     var workbook = new Excel.Workbook();
//     workbook.xlsx.readFile(path)
//         //'./src/data.xlsx'
//         .then(() => {
//             var worksheet = workbook.getWorksheet(1);
//             var dobCol = worksheet.getColumn(1);
//             dobCol.eachCell(function(cell, rowNumber) {
//                 dummy.push(cell.value)
//             });

//             //console.log(dummy)

//             console.log(worksheet.getCell('A1').value)
//             dummy.splice(0, 1);
//             //console.log(dummy)
//             return dummy
//         })
//         .catch(console.log);
// }