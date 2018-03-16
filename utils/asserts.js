const assert = require('assert');

exports.noDifference = async function(result, settings) {
  await assert(result.pass, `Mismatch detected.
                                      Difference was: ${result.diff}%.
                                      Accepted fuzzlevel: ${settings.fuzzLevel}.`);
};
