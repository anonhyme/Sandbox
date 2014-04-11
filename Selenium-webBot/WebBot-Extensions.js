Selenium.prototype.doParseCsv = function (filePath, splitBy) {
    
    'use strict';
    var _file;
    
    var csvParser = new Parser();
    _file = csvParser.readFile(filePath);    
};




function Parser() {
    
    'use strict';
    
    // read file a la Selenium.    
    
    var _data;
    //Parse the file
    this.readFile = function (filePath, result) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", filePath, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                   var allText = rawFile.responseText;
                    storedVars[result] = allText;
                }
            }
        };
        rawFile.send();
    };

    function readData(sData) {
        console.log(sData);
    }


    function parseCSV(str) {
        return _.reduce(str.split("\n"), function (table, row) {
            table.push(_.map(row.split(","), function (c) {
                return c.trim();
            }));
            return table;
        }, []);

    };
}

Selenium.prototype.doLoadXmlVars = function(filepath, selector)
  {
    assert(filepath, " Requires an XML file path or URL.");
    var xmlReader = new XmlReader(filepath);
    loadVars(xmlReader, "XML element", filepath, selector);
  };
  Selenium.prototype.doLoadVars = function(filepath, selector)
  {
    $$.LOG.warn("The loadVars command has been deprecated and will be removed in future releases."
      + " Please use doLoadXmlVars instead.");
    Selenium.prototype.doLoadXmlVars(filepath, selector);
  };




  function loadVars(reader, desc, filepath, selector)
  {
    if (selector) {
      assertCompilable("", selector, ";", "Invalid selector condition");
    }
    reader.load(filepath);
    reader.next(); // read first varset and set values on storedVars
    if (!selector && !reader.EOF()) {
      notifyFatalHere(" Multiple " + desc + "s are not valid for this command."
        + ' (A specific ' + desc + ' can be selected by specifying: name="value".)');
    }

    var result = evalWithVars(selector);
    if (typeof result !== "boolean") {
      notifyFatalHere(", " + selector + " is not a boolean expression");
    }

    // read until specified set found
    var isEof = reader.EOF();
    while (!isEof && evalWithVars(selector) !== true) {
      reader.next(); // read next varset and set values on storedVars
      isEof = reader.EOF();
    } 

    if (!evalWithVars(selector)) {
      notifyFatalHere(desc + " not found for selector expression: " + selector
        + "; in input file " + filepath);
    }
  }



  function XmlReader()
  {
    var varsets = null;
    var varNames = null;
    var curVars = null;
    var varsetIdx = 0;

    // load XML file and return the list of var names found in the first <VARS> element
    this.load = function(filepath)
    {
      var fileReader = new FileReader();
      var fileUrl = urlFor(filepath);
      var xmlHttpReq = fileReader.getDocumentSynchronous(fileUrl);
      $$.LOG.info("Reading from: " + fileUrl);

      var fileObj = xmlHttpReq.responseXML; // XML DOM
      varsets = fileObj.getElementsByTagName("vars"); // HTMLCollection
      if (varsets === null || varsets.length === 0) {
        throw new Error("A <vars> element could not be loaded, or <testdata> was empty.");
      }

      curVars = 0;
      varNames = attrNamesFor(varsets[0]);
      return varNames;
    };

    this.EOF = function() {
      return (curVars === null || curVars >= varsets.length);
    };

    this.next = function()
    {
      if (this.EOF()) {
        $$.LOG.error("No more <vars> elements to read after element #" + varsetIdx);
        return;
      }
      varsetIdx++;
      $$.LOG.debug(varsetIdx + ") " + serializeXml(varsets[curVars]));  // log each name & value

      var expected = countAttrs(varsets[0]);
      var found = countAttrs(varsets[curVars]);
      if (found !== expected) {
        throw new Error("Inconsistent <testdata> at <vars> element #" + varsetIdx
          + "; expected " + expected + " attributes, but found " + found + "."
          + " Each <vars> element must have the same set of attributes."
        );
      }
      setupStoredVars(varsets[curVars]);
      curVars++;
    };


  function FileReader() {}

  FileReader.prototype.prepareUrl = function(url) {
    var absUrl;
    // htmlSuite mode of SRC? TODO is there a better way to decide whether in SRC mode?
    if (window.location.href.indexOf("selenium-server") >= 0) {
      $$.LOG.debug("FileReader() is running in SRC mode");
      absUrl = absolutify(url, htmlTestRunner.controlPanel.getTestSuiteName());
    } else {
      absUrl = absolutify(url, selenium.browserbot.baseUrl);
    }
    $$.LOG.debug("FileReader() using URL to get file '" + absUrl + "'");
    return absUrl;
  };

  FileReader.prototype.getDocumentSynchronous = function(url) {
    var absUrl = this.prepareUrl(url);
    var requester = this.newXMLHttpRequest();
    if (!requester) {
      throw new Error("XMLHttp requester object not initialized");
    }
    requester.open("GET", absUrl, false); // synchronous (we don't want selenium to go ahead)
    try {
      requester.send(null);
    } catch(e) {
      throw new Error("Error while fetching URL '" + absUrl + "':: " + e);
    }
    if (requester.status !== 200 && requester.status !== 0) {
      throw new Error("Error while fetching " + absUrl
        + " server response has status = " + requester.status + ", " + requester.statusText );
    }
    return requester;
  };

  FileReader.prototype.newXMLHttpRequest = function() {
    var requester = 0;
    try {
      // for IE/ActiveX
      if (window.ActiveXObject) {
        try {       requester = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch(ee) { requester = new ActiveXObject("Microsoft.XMLHTTP"); }
      }
      // Native XMLHttp
      else if (window.XMLHttpRequest) {
        requester = new XMLHttpRequest();
      }
    }
    catch(e) {
      throw new Error("Your browser has to support XMLHttpRequest in order to read data files\n" + e);
    }
    return requester;
  };}



/*
function selectName(table) {
    return _.rest(_.map(table, _.first));
};

function selectFirst(table) {
    return _.rest(_.map(table, _.first));
};

function getClassName(name) {
    var result;
    result = document.getElementsByClassName(name);
    return result[0].innerText;
}

function setInnerText(name) {
    var result;
    result = document.getElementsByClassName(name);

    return result[0].innerText;
}*/