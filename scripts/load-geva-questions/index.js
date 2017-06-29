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

// [Transform] : Format the list for JSON
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

  var REPONSE_LIBELLE = ['J','K','L','M','N','O'];
  var REPONSE_CODE_VALEUR = 'I';

  const isValidRow = row => worksheet['I' + row] !== undefined;

  const isSection = row => !!worksheet[SECTION + row];

  const makeSection = (row, id) => ({
    id: id,
    Section: worksheet[SECTION + row].v,
    Libelle: worksheet[LIBELLE + row].v,
    Trajectoire: worksheet[TRAJECTOIRE + row].v,
    Question: worksheet[QUESTION + row].v,
    Type: worksheet[TYPE + row].v,
    Reponses: []
  });

  const LEVEL0 = 0;
  const LEVEL1 = 1;
  const LEVEL2 = 2;
  const LEVEL3 = 3;
  const LEVEL4 = 4;
  const LEVEL5 = 5;

  const isResponseLevel = (row, level) => !!worksheet[REPONSE_LIBELLE[level] + row];

  const getId = id => id.replace(/\./g, '_');

  const makeReponse = (worksheet, row, level, Reponses = undefined) => ({
    id: getId(worksheet[REPONSE_CODE_VALEUR + row].v),
    CodeValeur: worksheet[REPONSE_CODE_VALEUR + row].v,
    Libelle: worksheet[REPONSE_LIBELLE[level] + row].v,
    Reponses
  });

  const processResponseLevel = (row, level, SubReponses = undefined) => {
    reponses[level] = makeReponse(worksheet, row, level, SubReponses);
    reponses[level - 1].Reponses.push(reponses[level]);
  };

  // Current section and reponse working on
  var section = {};
  var reponses = [];

  // Process until current row is empty
  for (var row = START_ROW ; isValidRow(row) ; row++) {

    if (isSection(row)) {
      // If current row as a section (not empty), make new section

      // Save the current section in questions
      if (row > START_ROW) {
        questions.push(section);
        reponses = [];
        id++;
      }

      // Create a new section
      section = makeSection(row, id);

      // Create a new reponse
      reponses[0] = makeReponse(worksheet, row, 0, []);
      section.Reponses.push(reponses[0]);
    } else {
      // Is not a Section but is ether a Reponse or SubReponse

      if (isResponseLevel(row, LEVEL0)) {
        // This row is a Reponse level 0
        reponses[LEVEL0] = makeReponse(worksheet, row, LEVEL0, []);
        section.Reponses.push(reponses[0]);
      } else if (isResponseLevel(row, LEVEL1)) {
        // This row is a Reponse level 1
        processResponseLevel(row, LEVEL1, []);
      } else if (isResponseLevel(row, LEVEL2)) {
        // This row is a Reponse level 2
        processResponseLevel(row, LEVEL2, []);
      } else if (isResponseLevel(row, LEVEL3)) {
        // This row is a Reponse level 3
        processResponseLevel(row, LEVEL3, []);
      } else if (isResponseLevel(row, LEVEL4)) {
        // This row is a Reponse level 4
        processResponseLevel(row, LEVEL4, []);
      } else if (isResponseLevel(row, LEVEL5)) {
        // This row is a Reponse level 5
        processResponseLevel(row, LEVEL5);
      }

    }
  }

  questions.push(section);

  callback(questions);
};

// [Load] :
function load(json) {
  // stringify: parameter '2' is for pretty output
  fs.writeFile(tmp_file, JSON.stringify(json, null, 2), function() {
    console.log('JSON created.');
  });
}

extract(fileName, transform);
