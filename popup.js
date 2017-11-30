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
loadParams();

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
    console.log('UY to ULY');
});

// ULY -> UY convert
$('#ulytouy').on('click', function () {
    // var command = "var es=document.body.getElementsByTagName('*');for(var i=0;i<es.length;i++){var search = es[i].innerText;if(es[i]['tagName'] !='SCRIPT'){es[i].textContent=run(es[i].innerText);}}";
    var command = "var es=document.body.getElementsByTagName('*');for(var i=0;i<es.length;i++){var search = es[i].innerText;if(es[i]['tagName'] !='SCRIPT'){es[i].textContent='TEST';}}";
    chrome.tabs.executeScript(null,{code:command});
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
    var command = setStyle('fontFamily', font);
    chrome.tabs.executeScript(null,{code:command});
}

/**
 *  Set font color
 * @param color
 */
function setFontColor(color) {
    var command = setStyle('color', color);
    chrome.tabs.executeScript(null,{code:command});
}

/**
 *  Set font size
 * @param size
 */
function setFontSize(size) {
    var command = setStyle('fontSize', size+'px');
    chrome.tabs.executeScript(null,{code:command});
}

function setDirection(direction) {
    var command = setStyle('direction', direction);
    chrome.tabs.executeScript(null,{code:command});

}

/**
 *  Set background color
 * @param color
 */
function setBackgroundColor(color) {
    var command = setStyle('backgroundColor', color);
    chrome.tabs.executeScript(null,{code:command});
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


var km = new Array ( 128 ); // keymap
var cm = new Array ( 256 ); // charmap

var PRIMe = 233; // 'e
var PRIME = 201; // 'E
var COLo  = 246; // :o
var COLO  = 214; // :O
var COLu  = 252; // :u
var COLU  = 220; // :U
var HAMZA = 0x0626;
var CHEE  = 0x0686;
var GHEE  = 0x063A;
var NGEE  = 0x06AD;
var SHEE  = 0x0634;
var SZEE  = 0x0698;

// right and left quotes in Uyghur
var OQUOTE = 0x00AB; // for opening quote (oh quote)
var CQUOTE = 0x00BB; // for closing quote

var RCQUOTE = 0x2019; // 0x2019 is right closed curly quote

var BPAD = 0x0600;

// returns a char code for a given character
function gac ( ascii )
{
    var str = "" + ascii;
    return str.charCodeAt(0);
}

// returns a string from a given char code
function gas ( code )
{
    return String.fromCharCode(code);
}

// isvowel -- returns true if ch is a vowel in Uyghur
function isvowel ( ch )
{
    var code = gac ( ch );

    if ( ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' ||
        ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U' ) {
        return true;
    }

    if ( code == PRIMe || code == PRIME || code == COLo ||
        code == COLO || code == COLu || code == COLU ) {
        return true;
    }

    return false;
}

function isalpha ( code )
{
    if ( (gac('A') <= code && code <= gac('Z')) || (gac('a') <= code && code <= gac('z')) ) {
        return true;
    }
    return false;
}

var i;
var inited = false;

function bedit_init ( ) {
    var i;
    if ( inited ) {
        return;
    }

    inited = true;

    // zero-out all entries first
    for ( i = 0; i < km.length; i++ ) {
        km[i] = 0;
    }

    // zero-out all entries first
    for ( i = 0; i < cm.length; i++ ) {
        cm[i] = 0;
    }

    cm[gac('a')] = 0x0627;
    cm[gac('b')] = 0x0628;
    cm[gac('c')] = 0x0643;
    cm[gac('d')] = 0x062F;
    cm[gac('e')] = 0x06D5;
    cm[gac('f')] = 0x0641;
    cm[gac('g')] = 0x06AF;
    cm[gac('h')] = 0x06BE;
    cm[gac('i')] = 0x0649;
    cm[gac('j')] = 0x062C;
    cm[gac('k')] = 0x0643;
    cm[gac('l')] = 0x0644;
    cm[gac('m')] = 0x0645;
    cm[gac('n')] = 0x0646;
    cm[gac('o')] = 0x0648;
    cm[gac('p')] = 0x067E;
    cm[gac('q')] = 0x0642;
    cm[gac('r')] = 0x0631;
    cm[gac('s')] = 0x0633;
    cm[gac('t')] = 0x062A;
    cm[gac('u')] = 0x06C7;
    cm[gac('v')] = 0x06CB;
    cm[gac('w')] = 0x06CB;
    cm[gac('x')] = 0x062E;
    cm[gac('y')] = 0x064A;
    cm[gac('z')] = 0x0632;

    cm[PRIMe] = 0x06D0; // 'e
    cm[PRIME] = 0x06D0; // 'E
    cm[COLo]  = 0x06C6; // :o
    cm[COLO]  = 0x06C6; // :O
    cm[COLu]  = 0x06C8; // :u
    cm[COLU]  = 0x06C8; // :U

    for ( i = 0; i < cm.length; i++ ) {
        if ( cm[i] != 0 ) {
            var u = gac(gas(i).toUpperCase());
            if ( cm[u] == 0 ) {
                cm[u] = cm[i];
            }
        }
    }

    // Uyghur punctuation marks
    cm[gac(';')] = 0x061B;
    cm[gac('?')] = 0x061F;
    cm[gac(',')] = 0x060C;
}


bedit_init();

function run(uly) {


    var bd = '`';  // beginning delimiter
    var ed = '`';  // ending delimiter
    var wdbeg = true;
    var verbatim = false;

    str = '';
    for (i = 0; i < uly.length; i++)
    {

        ch = 0;
        cur    = uly.charAt(i);
        next   = uly.charAt(i+1);
        ccode  = uly.charCodeAt(i);
        ncode  = uly.charCodeAt(i+1);

        if ( cur == '|' && ( prev == 'u' ) && ( next == 'a' || next == 'e' ) ) {
            wdbeg = false;
            continue;
        }

        if ( wdbeg == true ) {
            if ( isvowel(cur) ) {
                str += gas(HAMZA);
            }
        } else {
            if ( cur == '\'' || ccode == RCQUOTE ) {
                if ( isvowel(next) ) {
                    wdbeg = false; // don't add another hamza in next round
                    str += gas(HAMZA);
                    continue;
                } else if ( isalpha(ncode) ) {
                    continue;
                }
            }
        }

        // AA, AE, and non-alpha-numeric letters makes word beginning
        if ( isvowel(cur) || !isalpha(ccode) ) {
            wdbeg = true;
        } else {
            wdbeg = false;
        }

        switch ( cur ) { // handle joint-letters
            case 'c':
            case 'C':
                if ( next == 'h' || next == 'H' ) {
                    ch = CHEE;
                }
                break;
            case 'g':
            case 'G':
                if ( next == 'h' || next == 'H' ) {
                    ch = GHEE;
                }
                break;
            case 'n':
            case 'N':
                if ( next == 'g' || next == 'G' ) {
                    tmpch = uly.charAt(i+2);
                    if ( tmpch != 'h' && tmpch != 'H' ) {
                        ch = NGEE;
                    }
                }
                break;
            case 's':
            case 'S':
                if ( next == 'h' || next == 'H' ) {
                    ch = SHEE;
                } else if ( next == 'z' || next == 'Z' ) { // ULY does not provide a unique SZEE, we use 'sz'
                    ch = SZEE;
                }
                break;
            default:
                break;
        }

        if ( verbatim == true ) {
            if ( cur == ed ) { // ending verbatim mode
                verbatim = false;
            } else {
                str += cur;
            }
            continue;
        }

        if ( ch != 0 ) {
            i++; // advance index for joint letters
            str += gas(ch);
        } else if ( ccode < cm.length && cm[ccode] ) {
            str += gas( cm[ccode] ); // no joint letter, but valid ULY

        } else {
            str += gas(ccode); // non-ULY, return whatever is entered
        }

    }

    return str;
}

//TODO: remove list
//TODO: max count for list