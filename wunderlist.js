/*global beforeEach:true, afterEach:true, describe:true */

var wd = require("yiewd")
  , concat = require('concat-stream')
  , path = require("path")
  , _ = require("underscore")
  , monocle = require("monocle-js")
  , o_O = monocle.o_O
  , o_C = monocle.callback
  , _ = require("underscore")
  , appdesc = {
      'app': path.resolve(__dirname, "com.wunderkinder.wunderlistandroid-1.apk")
    , 'appPkg': 'com.wunderkinder.wunderlistandroid'
    , 'appAct': 'com.wunderkinder.wunderlistandroid.activity.WLSlideShowActivity' }
  , defaultCaps = {
      browserName: 'Android'
      , device: 'Android'
      , platform: 'Mac'
      , version: '6.0'
      //, newCommandTimeout: 60
  };

(function() {
  var account = ['sebastian@saucelabs.com', 'test123'];
  var login = o_O(function*(driver) {
    var button = yield driver.elementByName('Log In');
    yield button.click();
    yield driver.sleep(3);

    var inputs = yield driver.elementsByTagName('EditText');
    for (var i in inputs) {
      yield inputs[i].sendKeys(account[i]);
    }

    button = driver.elementByName("Log In");
    yield button.click();
  });

  var addItem = o_O(function*(driver, pairs) {
    var label = pairs[0].join(' - ');
    var adds = yield driver.elementsByTagName("EditText");

    console.log(label);

    yield adds[0].click();
    yield adds[0].click();
    yield adds[0].sendKeys(label + '\n');
  });

  var dismiss = o_O(function*(driver) {
    var next = yield driver.elementByName("Next");
    yield next.click();
    var done = yield driver.elementByName("Done");
    yield done.click();
  });

  var readPairs = o_O(function*() {
    var cb = o_C();

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.pipe(concat(cb));
    
    var data = yield cb;
    return JSON.parse(data);
  });

  var driver = wd.remote("127.0.0.1", 4723);
  driver.run(function*() {
    var caps = _.extend(defaultCaps, {
      "app": appdesc["app"],
      "app-package": appdesc["appPkg"],
      "app-activity": appdesc["appAct"]
    });

    var pairs = yield readPairs();
    yield driver.init(caps);
    yield login(driver);
    yield driver.sleep(4);
    yield dismiss(driver);
    yield addItem(driver, pairs);
    yield driver.quit();
  });
})();
