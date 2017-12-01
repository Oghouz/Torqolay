/**
 * Created by Mardan MEMET on 28/11/2017.
 * mardan828@gmail.com
 * GNU General Public License v3.0
 */

fonts = [
    { "name": "تۈز", "value": "UKIJ Tuz", "file": "UKIJTuz.ttf" },
    { "name": "تۈز تور", "value": "UKIJ Tuz Tor", "file": "UKIJTzTr.ttf" },
    { "name": "تۈز باسما", "value": "UKIJ Tuz Basma", "file": "UKIJTuzB.ttf" },
    { "name": "تۈز كىتاب", "value": "UKIJ Tuz Kitab", "file": "UKIJTuzK.ttf" },
    { "name": "تۈز قارا", "value": "UKIJ Tuz Qara", "file": "UKIJTuzQ.ttf" },
    { "name": "تۈز ژورنال", "value": "UKIJ Tuz Jurnal", "file": "" },
    { "name": "ئېكران", "value": "UKIJ Ekran", "file": "UKIJEkran.ttf" },
    { "name": "باسما", "value": "UKIJ Basma", "file": "UKIJBasma.ttf" },
    { "name": "زىلۋا", "value": "UKIJ Zilwa", "file": "UKIJZilwa.ttf" }
];


// load params
//loadParams();

// font style
var fontStyle = $('#fontStyle');
var fontSelectedIndex = null;
fonts.forEach(function (element, index) {
    fontSelectedIndex = index;
    var option = '<li style="font-family: '+element.value+'; text-align: right;cursor: pointer;"><a id="font-select-'+index+'">'+element.name+'</a></li>';
    fontStyle.append(option);
    var select = $('#font-select-'+index);
    select.on('click', function () {
        setFontStyle(fonts[index]);
    })
});

// font size event
var fontSize = $('#fontSize');
var fontSizeCounter = $('#fontSizeCounter');
fontSize.on('input', function () {
    var size = this.value;
    fontSizeCounter.text(size);
    setFontSize(size);
});

// div direction
var direction = $('#direction');
direction.change(function () {
    if (this.checked) {
        setDirection('rtl');
    } else {
        setDirection('');
    }
});
// font color event
var fontColor = $('#fontColor');
fontColor.on('input', function () {
    color = this.value;
    setFontColor(color);
});

// background color event
var bgColor = $('#bgColor');
bgColor.on('input', function () {
    color = this.value;
    setBackgroundColor(color);
});

// UY -> ULY convert
$('#uytouly').on('click', function () {
    chrome.tabs.executeScript(null, {
        file: 'js/uy2uly.js'
    });
});


// ULY -> UY convert
$('#ulytouy').on('click', function () {
    chrome.tabs.executeScript(null, {
        file: 'js/uly2uy.js'
    });
});


// get params from cookie
var ck = getCookie('torqolay');
var listGroup = $('#list-group');
if (ck) {
    var params = JSON.parse(ck);
    params.forEach(function (param) {
        console.log(param.params);
        var listGroupItem = document.createElement('a');
        listGroupItem.href="#";
        listGroupItem.className = "list-group-item";
        listGroupItem.textContent = param.name;
        listGroupItem.addEventListener('click', function() {

            fontColor.val(param.params.fontColor);
            setFontColor(param.params.fontColor);

            setFontStyle(fonts[param.params.fontStyle]);

            fontSize.val(param.params.fontSize);
            fontSizeCounter.text(param.params.fontSize);
            setFontSize(param.params.fontSize);

            bgColor.val(param.params.bgColor);
            setBackgroundColor(param.params.bgColor);

            $('.list').hide();
            $('.popup').show();
        });
        listGroup.append(listGroupItem);
    });
}


// load list box
var listBtn = $('#listBtn');
listBtn.on('click', function () {
    $('.popup').hide();
    $('.list').show();

});

// Save
var saveBtn = $('#save');
saveBtn.on('click', function () {
    $('.popup').hide();
    $('.save').show();

    var paramForm = $('#params-form');
    paramForm.submit('click', function (event) {
        event.preventDefault();
        var ck = getCookie('torqolay');
        if (ck) {
            var loadData = JSON.parse(ck);
            loadData.push({
                "name": $('#paramsName').val(),
                "params": {
                    "fontStyle": fontSelectedIndex,
                    "fontColor": fontColor.val(),
                    "fontSize": fontSize.val(),
                    "bgColor": bgColor.val()
                }
            });
            document.cookie = "torqolay="+JSON.stringify(loadData);
        } else {
            var newData = [
                {
                    "name": $('#paramsName').val(),
                    "params": {
                        "fontStyle": fontSelectedIndex,
                        "fontColor": fontColor.val(),
                        "fontSize": fontSize.val(),
                        "bgColor": bgColor.val()
                    }
                }
            ];
            document.cookie = "torqolay="+JSON.stringify(newData);
        }

        $('.save').hide();
        $('.popup').show();
    })
});

// back button
var backBtn = $('button[name=backBtn]');
backBtn.on('click', function () {
    $('.list').hide();
    $('.save').hide();
    $('.popup').show();
});

// delete cookie
var removeBtn = $('#remove');
removeBtn.on('click', function () {
    removeCookie("torqolay");
});

/**
 *  Set font family
 * @param font
 */
function setFontStyle(font) {
    var code = setStyle('fontFamily', font.value);
        code+= setHeadStyle(font.value, font.file);
    chrome.tabs.executeScript(null,{code:code});
}

/**
 *  Set font color
 * @param color
 */
function setFontColor(color) {
    var code = setStyle('color', color);
    chrome.tabs.executeScript(null,{code:code});
}

/**
 *  Set font size
 * @param size
 */
function setFontSize(size) {
    var code = setStyle('fontSize', size+'px');
    chrome.tabs.executeScript(null,{code:code});
}

function setDirection(direction) {
    var code = setStyle('direction', direction);
    chrome.tabs.executeScript(null,{code:code});

}

/**
 *  Set background color
 * @param color
 */
function setBackgroundColor(color) {
    var code = setStyle('backgroundColor', color);
    chrome.tabs.executeScript(null,{code:code});
}

/**
 *  reload all element in the current tabs
 * @param style
 * @param value
 * @returns {string}
 */
function setStyle(style, value) {
    return "var regex=/[\u0600-\u06FF]/;var es=document.body.getElementsByTagName('*');for(var i=0;i<es.length;i++){var search=es[i].innerText;if(es[i]['tagName'] !='SCRIPT' && regex.test(search)){es[i].style."+style+"='"+value+"';}}";
}

/**
 *  generate head style for import font
 * @param fontName
 * @param fileName
 * @returns {string}
 */
function setHeadStyle(fontName, fileName) {
    var file = "chrome-extension://feekbgjlnbmihodgdomphfgiakdkfbfo/fonts/"+fileName;
    return 'var css="@font-face {font-family: '+fontName+';src: url('+file+');}";'+
        'var head = document.head;var style = document.createElement("style");'+
        'if(style.styleSheet) {style.styleSheet.cssText=css;}else{style.appendChild(document.createTextNode(css));}head.appendChild(style);';
}


/**
 *  Get cookie by name
 * @param name
 * @returns {null}
 */
function getCookie(name) {
    var pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
    return !!pair ? pair[1] : null;
}

/**
 *  Remove cookie by name
 * @param name
 */
function removeCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

/**
 *  Chekc string is Uyghur language
 * @param text
 * @returns {boolean}
 */
function isUy(text)
{
    var regex = /[\u0600-\u06FF]/;
    return regex.test(text);
}

function loadParams() {
    chrome.storage.sync.get("params", function (item) {
        if (item.params['global-select']) {

        }
    });
}



//TODO: remove list
//TODO: max count for list