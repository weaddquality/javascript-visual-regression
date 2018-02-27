const assert = require('assert');

exports.noDifferance = async function(result, settings) {
  await assert(result.pass, 'A differance above the set fuzzlevel ' + settings.fuzzLevel + ' has been detected');
};
