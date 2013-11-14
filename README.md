Introduction
===

Ever found yourself not knowing what a word means in a foregin language (eg. German)?
Test automation to the rescue! This project is leveraging the mobile (Android, iOS, etc) testing framework Appium to automate the workflow of looking up a word and adding it to a todo list.
That way you can conveniently revisit the word later and check it off once you memorized it.

Install
===

Clone into repo and install dependencies with ```npm install```.

Run
===

```echo "Term to translate" | node --harmony leo.js | node --harmony wunderlist.js```

Please note that node.js 0.11+ is required to be able to leverage ES6/Harmony based generator implementations.
