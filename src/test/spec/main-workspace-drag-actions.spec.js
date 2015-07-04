describe('Given the main page is requested', function() {
  var mainPage = require('./pages/main.js');
  var fs = require('fs');
  var path = require('path');
  var getDateStr = function(){
    var d = (new Date() + '').replace(new RegExp(':', 'g'), '-').split(' ');
    // "2013-Sep-03-21:58:03"
    return [d[3], d[1], d[2], d[4]].join('-');
  };
  var errorCallback = function(err){
    console.log(err);
  };
  var timestampToDate = function(unix_timestamp){
    var date = new Date(unix_timestamp);
    //hours part from the timestamp
    var hours = date.getHours();
    // minutes part from the timestamp
    var minutes = date.getMinutes();
    // and seconds
    var seconds = date.getSeconds();

    var timeValues = [hours, minutes, seconds];
    timeValues.forEach(function (val){
      if (val.lenght < 2){
        //padding
        val = '0' + val;
      }
    });
    // will display time in 10:30:23 format
    return hours + ':' + minutes + ':' + seconds;
  }

  describe('And Given the main page loads', function() {
    beforeEach(function() {
      mainPage.get();
    });

    it('then the toolbar should have a collapsed width', function(){
      expect(mainPage.toolbar.getCssValue('width')).toEqual(mainPage.toolbarCollapsedWidth);
    });

    describe('When the mouse hovers over the toolbar, ', function() {
      beforeEach(function() {
        browser.actions().mouseMove(mainPage.toolbar).perform();
        browser.sleep(500);
      });

      //Scenario: When the New Project button is clicked, the New Project dialog opens.
      it('then the toolbar should have an expanded width', function() {
        expect(mainPage.toolbar.getCssValue('width')).toEqual(mainPage.toolbarExpandedWidth);
      });


    });

//    // drag events don't track well with Selenium.  We can manually confirm this behavior, but this test always fails
//    // in Chrome and IE, because the drag events never fire.
//    describe('and when the toolbar div element drags over the workspace', function(){
//      var startMousePos, endMousePos;
//      beforeEach(function(){
//        var dragStart = browser.actions()
//          .mouseDown(mainPage.toolbarDiv.find());
//        dragStart.perform();
//        var drag = browser.actions()
//          .mouseMove(mainPage.workCanvas.find(), {x:10,y:10});
//        drag.perform();
//        browser.sleep(500);
//      });
//      //.mouseMove({x: 180, y: 0})
//
//      it('then the workCanvas has the class dragover', function(){
//        expect(mainPage.workCanvas.getAttribute('class')).toMatch('dragover');
//      });
//    });
//
//    describe('When the toolbar div element drags and drops to workspace', function(){
//      beforeEach(function(){
//        drag = browser.actions()
//          .dragAndDrop(mainPage.toolbarDiv.find(),mainPage.workCanvas.find())
//          .perform();
//      });
//      //.mouseMove({x: 180, y: 0})
//
//      it('then the workCanvas has a div child node', function(){
//        var childCount = 0;
//        mainPage.workCanvas.findElements(by.tagName('div')).then(function(elements){
//          childCount = elements.length;
//        });
//        expect(childCount).toBeGreaterThan(0);
//      });
//    });

  });

  afterEach(function(){
    var passed = jasmine.getEnv().currentSpec.results().passed();
    //Replace all space characters in spec name with dashes
    var specName = jasmine.getEnv().currentSpec.description.replace(new RegExp(' ', 'g'), '-'),
      baseFileName = specName + '-' + getDateStr(),
      reportDir = path.resolve(__dirname + '/../report/'),
      consoleLogsDir = path.resolve(reportDir + '/logs/'),
      screenshotsDir = path.resolve(reportDir + '/screenshots/');

    if (!fs.existsSync(reportDir)){
      fs.mkdirSync(reportDir);
    }

    if (!passed){
      //Create screenshots dir if doesn't exist
      console.log('screenshotsDir = [' + screenshotsDir + ']');
      if (!fs.existsSync(screenshotsDir)){
        fs.mkdirSync(screenshotsDir);
      }

      var pngFileName = path.resolve(screenshotsDir + '/' + baseFileName + '.png');
      browser.takeScreenshot().then(function (png){
        // Do something with png...
        console.log('Writing file ' + pngFileName);
        fs.writeFileSync(pngFileName, png, {encoding: 'base64'}, function (err){
          console.log(err);
        });
      }, errorCallback);
    }
//
    // Flush browser console to file
    var logs = browser.driver.manage().logs(),
      logType = 'browser'; //browser
    logs.getAvailableLogTypes().then(function(logTypes){
      if (logTypes.indexOf(logType) > -1){
        var logFileName = path.resolve(consoleLogsDir + '/' + baseFileName + '.txt');
        browser.driver.manage().logs().get(logType).then(function(logsEntries){
          if (!fs.existsSync(consoleLogsDir)){
            fs.mkdirSync(consoleLogsDir);
          }
          // Write the browser logs to file
          console.log('Writing file ' + logFileName);
          var len = logsEntries.length;
          for (var i=0; i<len; ++i){
            var logEntry = logsEntries[i];
            var msg = timestampToDate(logEntry.timestamp) + ' ' + logEntry.type + ' ' + logEntry.message;
            fs.appendFileSync(logFileName, msg + '\r\n', {encoding: 'utf8'}, errorCallback);
          }
        }, errorCallback);
      }
    });
  });

});
