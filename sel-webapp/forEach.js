/*
 * Copyright 2012 Samit Badle, Samit.Badle@gmail.com
 * http://blog.reallysimplethoughts.com/
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

ForEachElement = (function() {
  function ForEachElement(editor) {
    this.editor = editor;
    this.enabled = false;
    //this.reportBaseFolder = ForEachElement.createHomeSubFolder("ScreenshotOnFail");
    //TODO load the changed dest folder instead of always creating with above
    this.latestReportFolder = "";  //changed to latest folder by prepareNewRun()
    this.screenShotCount = 0;
    this.curTestCaseIndex = -1;
    this.testCaseCount = 0;
    this.isTestRunning = false;
    this.curTestCaseIsLast = false;
    this.oldDebuggerState = '';
    this.subclassEditorPlayCurrentTestCase = new ForEachElement.Subclass.InterceptMethod(editor, 'playCurrentTestCase', 'sbsof', this, this.editor_playCurrentTestCase);
    this.observerState = 1;
    editor.app.addObserver(this);
  }

  ForEachElement.makePath = function (folder) {
    if (!folder.exists() || !folder.isDirectory()) {   // if it doesn't exist, create
      folder.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0777);
    }
    return folder;
  };

  ScreenshotOnFail.getHomeFolder = function() {
    return Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("Home", Components.interfaces.nsIFile);
  };

  ScreenshotOnFail.createHomeSubFolder = function(subFolderName) {
    var folder = ScreenshotOnFail.getHomeFolder();
    folder.append(subFolderName);
    return ScreenshotOnFail.makePath(folder).path;
  };

  ScreenshotOnFail.createTimeStampSubFolder = function(path) {
    var folder = FileUtils.getFile(path);
    folder.append(new Date().toLocaleFormat('%Y-%m-%d_%H-%M-%S'));
    return ScreenshotOnFail.makePath(folder).path;
  };

  ScreenshotOnFail.getDestFolder = function() {
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    fp.init(window, "Select destination folder", nsIFilePicker.modeGetFolder);
    if (fp.show() == nsIFilePicker.returnOK) {
      return fp.file;
    }
  };

  ScreenshotOnFail.prototype.changeReportsFolder = function(evt, toolButton) {
    var destFolder = ScreenshotOnFail.getDestFolder();
    if (destFolder) {
      this.reportBaseFolder = destFolder.path;
      //TODO save the changed dest folder
    }
  };

  ScreenshotOnFail.prototype.toggleEnabled = function(evt, toolButton) {
    if (evt.target.id && evt.target.id == "screenshotfail-button") {
      this.enabled = !this.enabled;
      toolButton.checked = this.enabled;
      if (this.enabled && this.isTestRunning) {
        //started when test is running, means we need to prepare for snapshot on error at this point
        this.prepareNewRun();
      }
    }
  };

  ScreenshotOnFail.prototype.viewLatestReports = function(toolButton) {
    var file = FileUtils.getFile((this.latestReportFolder != "") ? this.latestReportFolder : this.reportBaseFolder);
    var ioService = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
    var url = ioService.newFileURI(file);
    openTabOrWindow(url.spec);
  };

  ScreenshotOnFail.prototype.prepareNewRun = function() {
    try {
      if (this.enabled) {
        this.screenShotCount = 0;
        this.latestReportFolder = ScreenshotOnFail.createTimeStampSubFolder(this.reportBaseFolder);
      }
    } catch(e) {
    }
  };

  ScreenshotOnFail.prototype.takeScreenShot = function() {
    try {
      var file = FileUtils.getFile(this.latestReportFolder);
      file.append("error" + (++this.screenShotCount) + ".png");
      this.selenium.doCaptureEntirePageScreenshot(file.path);
    } catch(e) {
    }
  };

  ScreenshotOnFail.prototype.debuggerStateChanged = function(state) {
    if (state == Debugger.STOPPED && this.curTestCaseIsLast) {
      this.isTestRunning = false;
    }
  };

  ScreenshotOnFail.prototype.editor_playCurrentTestCase = function(baseClassObject, args) {
    this.curTestCaseIndex = args[1];
    this.testCaseCount = args[2];
    //Is this the first test case in a suite or the only test case
    // first => index = 0
    // only => total == 1
    if (this.curTestCaseIndex == 0 || this.testCaseCount == 1) {
      // we are starting a new run
      this.isTestRunning = true;
      this.prepareNewRun();
    }
    //Is this the last test case in the suite or the only test case
    // last => index + 1 == total
    // only => total == 1
    this.curTestCaseIsLast = (this.curTestCaseIndex + 1 == this.testCaseCount) || (this.testCaseCount == 1);
  };

  ScreenshotOnFail.prototype.runner_createSelenium = function(baseClassObject, retValue, args) {
    this.selenium = retValue;
    this.browserbot = retValue.browserbot;
    //this.changeBrowserbotHighlight();
    return retValue;
  };

  ScreenshotOnFail.prototype.ideTestLoop_commandComplete = function(baseClassObject, retValue, args) {
    if (this.enabled && args[0].failed) {
      this.takeScreenShot();
    }
    return retValue;
  };

  ScreenshotOnFail.prototype.ideTestLoop_commandError = function(baseClassObject, retValue, args) {
    if (this.enabled && this.editor.selDebugger.runner.testCase.debugContext.currentCommand().result == 'failed') {
      this.takeScreenShot();
    }
    return retValue;
  };

  ScreenshotOnFail.prototype.selDebugger_init = function(baseClassObject, retValue, args) {
    if (baseClassObject.runner) {
      this.subclassRunner = new ScreenshotOnFail.Subclass.ChainMethod(baseClassObject.runner, 'createSelenium', 'sbsof', this, this.runner_createSelenium);
      if (baseClassObject.runner.IDETestLoop) {
        this.subclassIDETestLoopCommandComplete = new ScreenshotOnFail.Subclass.ChainMethod(baseClassObject.runner.IDETestLoop.prototype, 'commandComplete', 'sbsof', this, this.ideTestLoop_commandComplete);
        this.subclassIDETestLoopCommandError = new ScreenshotOnFail.Subclass.ChainMethod(baseClassObject.runner.IDETestLoop.prototype, 'commandError', 'sbsof', this, this.ideTestLoop_commandError);
      }
    }
    return retValue;
  };

  ScreenshotOnFail.prototype.testSuiteChanged = function (testSuite) {
    if (this.observerState == 1 && this.editor.selDebugger) {
      this.subclassSelDebugger = new ScreenshotOnFail.Subclass.ChainMethod(this.editor.selDebugger, 'init', 'sbsof', this, this.selDebugger_init);
      var pcSelf = this;
      this.editor.selDebugger.addObserver({
        stateUpdated: function(state) {
          if (state != Debugger.PAUSE_REQUESTED && state != Debugger.PAUSED) {
            if (pcSelf.oldDebuggerState != state) {
              pcSelf.debuggerStateChanged(state);
              pcSelf.oldDebuggerState = state;
            }
          }
        }
      });
      this.observerState = 0;
    }
  };

  ScreenshotOnFail.Subclass = {
    ChainMethod: function(baseClassObject, methodName, overrideMarkerPrefix, subClassObject, chainedMethod) {
      if (baseClassObject) {
        var overrideMarkerName = overrideMarkerPrefix + methodName;
        if (!baseClassObject[overrideMarkerName]) {
          this.baseClassMethod = baseClassObject[methodName];
          this.subClassObject = subClassObject;
          this.chainedMethod = chainedMethod;
          baseClassObject[overrideMarkerName] = this;
          var self = this;
          baseClassObject[methodName] = function() {
            var retValue = self.baseClassMethod.apply(this, arguments);
            return self.chainedMethod.call(subClassObject, this, retValue, arguments);
          }
        }
      }
    },

    InterceptMethod: function(baseClassObject, methodName, overrideMarkerPrefix, subClassObject, chainedMethod) {
      if (baseClassObject) {
        var overrideMarkerName = overrideMarkerPrefix + methodName;
        if (!baseClassObject[overrideMarkerName]) {
          this.baseClassMethod = baseClassObject[methodName];
          this.subClassObject = subClassObject;
          this.chainedMethod = chainedMethod;
          baseClassObject[overrideMarkerName] = this;
          var self = this;
          baseClassObject[methodName] = function() {
            self.chainedMethod.call(subClassObject, this, arguments);
            return self.baseClassMethod.apply(this, arguments);
          }
        }
      }
    }
  };

  return ScreenshotOnFail;
})();

// Init the extension
try {
  this.editor.screenshotOnFail = new ScreenshotOnFail(this.editor);
} catch (error) {
  alert('Error in ScreenshotOnFail: ' + error);
}