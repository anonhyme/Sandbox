function Parser() {
    var _data;

    //Parse the file
    this.parseFile = function (filePath) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", filePath, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                   var allText = rawFile.responseText;
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

function selectName(table) {
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
}