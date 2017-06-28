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
  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  callback(worksheet, load);
};

// [Transform] : Format the list for the mongoDb
function transform(worksheet, callback) {

  // Output questions json
  var questions = [];

  // id of the next question input
  var id = 0;

  // Start row number
  var START_ROW = 3;

  // Clomumns in XLSX file
  var SECTION = 'B';
  var LIBELLE = 'D';
  var TRAJECTOIRE = 'E';
  var QUESTION = 'F';
  var TYPE = 'G';

  var REPONSE_LIBELLE = 'J';
  var REPONSE_CODE_VALEUR = 'I';

  var SUBREPONSE_LIBELLE = 'K';

  // Current section and reponse working on
  var section = {};
  var reponse = {};

  // Process until current row is empty
  for (var row = START_ROW ; worksheet['I' + row] !== undefined ; row++) {

    if (worksheet[SECTION + row]) {
      // If current row as a section (not empty), make new section

      // Save the current section in questions
      if (row > START_ROW) {
        questions.push(section);
        id++;
      }

      // Create a new section
      section = {
          id: id,
          Section: worksheet[SECTION + row].v,
          Libelle: worksheet[LIBELLE + row].v,
          Trajectoire: worksheet[TRAJECTOIRE + row].v,
          Question: worksheet[QUESTION + row].v,
          Type: worksheet[TYPE + row].v,
          Reponses: []
        };

      // Create a new reponse
      reponse = {
        id: 0,
        CodeValeur: '',
        Libelle: worksheet[REPONSE_LIBELLE + row].v,
        Reponses: []
      };
    } else {
      // Is not a Section but is ether a Reponse or SubReponse
      if (worksheet[REPONSE_LIBELLE + row]) {
        // This row is a Reponse

        if (row > START_ROW) {
          section.Reponses.push(reponse);
        }

        reponse = {
          id: 0,
          CodeValeur: '',
          Libelle: worksheet[REPONSE_LIBELLE + row].v,
          Reponses: []
        };
      } else if (worksheet[SUBREPONSE_LIBELLE + row]) {
        // This row is a sub reponse
        var subReponse = {
          id: worksheet[REPONSE_CODE_VALEUR + row].v,
          CodeValeur: worksheet[REPONSE_CODE_VALEUR + row].v,
          Libelle: worksheet[SUBREPONSE_LIBELLE + row].v
        };
        reponse.Reponses.push(subReponse);
      }

    }
  }

  console.log('questions', JSON.stringify(questions[0]));
  console.log('questions', JSON.stringify(questions[1]));
  console.log('number of rows processed', id);

  callback(questions);
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
