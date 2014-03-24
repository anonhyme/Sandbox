var file = require('file.js');
var gui = require('nw.gui');


function clickInput(id) {
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent('click');
    document.getElementById(id).dispatchEvent(event);
}
 
document.addEventListener('keyup', function (e) {
    var keyOpen     = e.keyCode == 'O'.charCodeAt(0) && e.ctrlKey; 
    var keySave     = e.keyCode == 'S'.charCodeAt(0) && e.ctrlKey; 
    var keyClose    = e.keyCode == 'W'.charCodeAt(0) && e.ctrlKey; 
    var keyNew      = e.keyCode == 'N'.charCodeAt(0) && e.ctrlKey;
    
                
    if (keyOpen) {
        clickInput('open');
    } else if (keySave) {
        clickInput('save');
    } else if (keyNew) {
        gui.Window.open('index.html');
    } else if (keyClose) {
        gui.Window.get().close();
    }
    
});

document.getElementById('open').addEventListener('change', function (e) { 
    console.info(this.value);
    file.open(this.value, document);
});

document.getElementById('open').addEventListener('change', function (e) {
    
    file.open(this.value, document);
});



var menu = new gui.Menu({ type: 'menubar' });

// Submenu //
var menuFile = new gui.MenuItem({
    label: 'File',
    submenu: new gui.Menu()
});

var menuNew = new gui.MenuItem({
    label: 'New',
    click: function () {
        gui.Window.open('index.html');
    }
});

var menuSeparator = new gui.MenuItem({
    type: 'separator'
});

var menuClose = new gui.MenuItem({
    label: 'Close',
    click: function () {
        gui.Window.get().close();
    }
});


menu.append(menuFile);

menu.items[0].submenu.append(menuNew);

menu.items[0].submenu.append(menuSeparator);

menu.items[0].submenu.append(menuClose);

gui.Window.get().menu = menu;



