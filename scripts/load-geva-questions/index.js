'use strict';

var _ = require('lodash');
var fs = require('fs');

// https://github.com/SheetJS/js-xlsx
var XLSX = require('xlsx');

/*
 * ETL that load GEVA questions
 * (Extract Transform Load)
 *
 * "Outil éval - nomenclature de ref V15.xlsx"
 * */

var tmp_file = __dirname + '/tmp.json';

// Take the first argument as filename
var fileName = process.argv[2] ? process.argv[2] : __dirname + '/Outil éval - nomenclature de ref V15.xlsx';

// [Extract] : Load XLSX
function extract(xlsxFileName, callback) {
  console.log('Loading file', xlsxFileName);
  var workbook = XLSX.readFile(xlsxFileName);
  callback(workbook);
};

// [Transform] : Format the list for the mongoDb
function transform(workbook, callback) {

  var first_sheet_name = workbook.SheetNames[0];
  var address_of_cell = 'A3';

  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];

  /* Find desired cell */
  var desired_cell = worksheet[address_of_cell];

  /* Get the value */
  var desired_value = (desired_cell ? desired_cell.v : undefined);

  console.log('workbook', workbook.SheetNames);

  console.log('desired_value', desired_value);


  //console.log('workbook', workbook.Sheets[workbook.SheetNames[0]]);

  //callback('');
};

// [Load] :
function load(json) {
  // stringify: parameter '2' is for pretty output
  fs.writeFile(tmp_file, JSON.stringify(json, null, 2), function() {
    console.log('You may load the mdphs .list with :');
    console.log('mongoimport --db impact --collection mdphs --jsonArray --file tmp_mdphs.json');
  });
}

extract(fileName, transform);
