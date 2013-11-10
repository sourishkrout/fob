var monocle = require("monocle-js")
  , o_O = monocle.o_O
  , o_C = monocle.callback
  , sleep = monocle.utils.sleep

module.exports = o_O(function*(oroutine) {
  var ex, res = null;
  var args = Array.prototype.slice.call(arguments, 1);
  for (var i=0; i < 60; i++) {
    try {
      res = yield oroutine.apply(this, args);
      return res;
    } catch (e) {
      ex = e;
      yield sleep(1);
    }
  }

  if (ex !== null) {
    throw ex;
  }
});
