/*global beforeEach:true, afterEach:true, describe:true */

var wd = require("yiewd")
  , path = require("path")
  , _ = require("underscore")
  , monocle = require("monocle-js")
  , o_O = monocle.o_O
  , _ = require("underscore")
  , appdesc = {
      'app': path.resolve(__dirname, "org.leo.android.dict-1.apk")
    , 'appPkg': 'org.leo.android.dict'
    , 'appAct': 'org.leo.android.dict.LeoDict' }
  , defaultCaps = {
      browserName: 'Android'
      , device: 'Android'
      , platform: 'Mac'
      , version: '6.0'
      //, newCommandTimeout: 60
  };

(function() {
  var flatten = function(item) {
    if (item === ""
        || item.indexOf("Discussions") > -1
        || item.indexOf("Dictionary") > -1
        || item.indexOf("Results") > -1
        || item.indexOf("Similar words") > -1
        || item.indexOf("Examples") > -1
        || item.indexOf("Nouns") > -1
        || item.indexOf("Adverbs") > -1
        || item.indexOf("Verbs") > -1) { return false; }

    return true;
  };

  var driver = wd.remote("127.0.0.1", 4723);
  driver.run(function*() {
    var caps = _.extend(defaultCaps, {
      "app": appdesc["app"],
      "app-package": appdesc["appPkg"],
      "app-activity": appdesc["appAct"]
    });

    yield driver.init(caps);

    var flat = [];
    var pairs = [];
    var texts = yield driver.elementsByTagName("TextView");
    // trigger lookup
    yield texts[1].click();

    var lookup = yield driver.elementsByTagName("EditText");
    yield lookup[0].sendKeys("muede\n");

    // make this a spinner
    yield driver.sleep(4);

    var entries = yield driver.elementsByTagName("TextView");
    for (var e in entries) {
      var val = yield entries[e].text();

      flat.push(val);
    }

    flat = _.filter(flat, flatten);

    for (var i=0; i < flat.length; i = i + 2) {
      pairs.push([flat[i], flat[i+1]]);
    }

    console.log(JSON.stringify(pairs));
  });
})();
