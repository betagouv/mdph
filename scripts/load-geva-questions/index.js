'use strict';

var _ = require('lodash');
var fs = require('fs');
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

  console.log('workbook', workbook);

  //callback('');
};

// [Load] :
function load(json) {
  // stringify: parameter '2' is for pretty output
  fs.writeFile(tmp_file, JSON.stringify(json, null, 2), function() {
    console.log('You may load the mdphs list with :');
    console.log('mongoimport --db impact --collection mdphs --jsonArray --file tmp_mdphs.json');
  });
}

extract(fileName, transform);
