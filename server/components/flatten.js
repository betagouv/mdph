'use strict';

 exports.flatten = function (table) {
  return reduce('', {}, table);
};

function reduceArray(path, accumulator, table) {
  var length = table.length;

  if (length) {
    var index = 0;

    while (index < length) {
      var property = path, item = table[index++];
      if (Object(item) !== item) {
        accumulator[property] = item;
      }
      else {
        reduce(property, accumulator, item);
      }
    }
  } else {
    accumulator[path] = table;
  }
}

function reduceObject(path, accumulator, table) {
  var empty = true;

  for (var property in table) {
    var item = table[property];
    if (path) {
      property = path + '.' + property;
    }
    empty = false;
    if (Object(item) !== item) accumulator[property] = item;
    else reduce(property, accumulator, item);
  }

  if (empty) accumulator[path] = table;
}

function reduce(path, accumulator, table) {
  if (Array.isArray(table)) {
    reduceArray(path, accumulator, table)
  } else {
    reduceObject(path, accumulator, table)
  }

  return accumulator;
}

return function (table) {
  return reduce('', {}, table);
};
