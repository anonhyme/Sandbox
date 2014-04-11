function readTextFile() {
   // var proxy = "http://127.0.0.1:53785/proxy.php";
var url = "http://www.crim.ca?callback=mycallback";

var rawFile = new XMLHttpRequest();
rawFile.open("POST", url, true);
    alert(rawFile);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    };
    rawFile.send();        
}


mycallback = function(data){
  alert(data.foo);
};