/**
 * Created by Mardan MEMET on 28/11/2017.
 */

fonts = [
    { "name": "باسما", "value": "UKIJ Basma" },
    { "name": "بوم", "value": "UKIJ Bom" },
    { "name": "چېچەك", "value": "UKIJ Chechek" },
    { "name": "چىۋەر كەسمە", "value": "UKIJ Chiwer Kesme" },
    { "name": "دىۋانى", "value": "UKIJ Diwani" },
    { "name": "دىۋانى توم", "value": "UKIJ Diwani Tom" },
    { "name": "دىۋانى يانتۇ نورمال", "value": "UKIJ" },
    { "name": "ئېكران", "value": "UKIJ Ekran" },
    { "name": "ئېلىبە", "value": "UKIJ Elipbe" },
    { "name": "ئېلىبە چەكتىلىك", "value": "UKIJ" },
    { "name": "ئەسلىيە", "value": "UKIJ Elsiye" },
    { "name": "ئەسلىيە چىۋەر", "value": "UKIJ Elsiye Chiwer" },
    { "name": "ئەسلىيە نەقىش", "value": "UKIJ Esliye Neqish" },
    { "name": "ئەسلىيە قارا", "value": "UKIJ Esliye Qara" },
    { "name": "ئەسلىيە توم", "value": "UKIJ Esliye Tom" },
    { "name": "ئىمارەت", "value": "UKIJ Imaret" },
    { "name": "ئىنچىكە", "value": "UKIJ Inchike" },
    { "name": "جۇنۇن", "value": "UKIJ Junun" },
    { "name": "كاۋاك", "value": "UKIJ Kawak" },
    { "name": "كاۋاك 3ئۆلچەم", "value": "UKIJ Kawak 3D" },
    { "name": "كەسمە", "value": "UKIJ " },
    { "name": "كەسمە تۈز", "value": "UKIJ" },
    { "name": "كۇفى 3ئۆلچەم", "value": "UKIJ" },
    { "name": "كۇفى چىۋەر", "value": "UKIJ" },
    { "name": "كۇفى گۈل", "value": "UKIJ" },
    { "name": "كۇفى كاۋاك", "value": "UKIJ" },
    { "name": "كۇفى نورمال", "value": "UKIJ" },
    { "name": "كۇفى تار", "value": "UKIJ" },
    { "name": "كۇفى ئۇز", "value": "UKIJ" },
    { "name": "كۇفى ياي", "value": "UKIJ" },
    { "name": "كۇفى يوللۇق", "value": "UKIJ" },
    { "name": "مەجنۇن نورمال", "value": "UKIJ" },
    { "name": "مەجنۇنتال", "value": "UKIJ" },
    { "name": "مەردانە", "value": "UKIJ" },
    { "name": "قوي قەلەم", "value": "UKIJ" },
    { "name": "ناسق", "value": "UKIJ" },
    { "name": "ناسق زىلۋا", "value": "UKIJ" },
    { "name": "ئورقۇن باسما", "value": "UKIJ" },
    { "name": "ئورقۇن يازما", "value": "UKIJ" },
    { "name": "ئورخۇن", "value": "UKIJ" },
    { "name": "قارا", "value": "UKIJ" }
];


// load params
//loadParams();

// font style
var fontStyle = $('#fontStyle');
var fontSelectedIndex = null;
fonts.forEach(function (element, index) {
    fontSelectedIndex = index;
    var option = '<li style="font-family: '+element.value+'; text-align: right;"><a id="font-select-'+index+'">'+element.name+'</a></li>';
    fontStyle.append(option);
    var select = $('#font-select-'+index);
    select.on('click', function () {
        setFontStyle(fonts[index].value);
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
    var code = setStyle('fontFamily', font);
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

/**
 *  ULY to UY Convert
 * @type {Array}
 */


//TODO: remove list
//TODO: max count for list