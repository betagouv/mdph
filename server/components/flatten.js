'use strict';

 exports.flatten = function (table) {
    return reduce('', {}, table);
};

function reduce(path, accumulator, table) {
    if (Array.isArray(table)) {
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
    } else {
        var empty = true;

        if (path) {
            for (var property in table) {
                var item = table[property], property = path + '.' + property, empty = false;
                if (Object(item) !== item) accumulator[property] = item;
                else reduce(property, accumulator, item);
            }
        } else {
            for (var property in table) {
                var item = table[property], empty = false;
                if (Object(item) !== item) accumulator[property] = item;
                else reduce(property, accumulator, item);
            }
        }

        if (empty) accumulator[path] = table;
    }

    return accumulator;
}

return function (table) {
    return reduce('', {}, table);
};
