/* Author:  Muhammad Abdulla (muhammad@yulghun.com)
 * Common routines for text conversion
 * Version: 1.0 (Apr. 20, 2009)
 * License: GPL
 */

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
var RCQUOTE = 0x2019; // 0x2019 is right closed curly quote
var inited = false;

// returns a char code for a given character
function gac ( ascii ) {
    var str = "" + ascii;
    return str.charCodeAt(0);
}

// returns a string from a given char code
function gas ( code ) {
    return String.fromCharCode(code);
}

// isvowel -- returns true if ch is a vowel in Uyghur
function isvowel ( ch ) {
    var code = gac ( ch );

    if ( ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' || ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U' ) {
        return true;
    }
    if ( code == PRIMe || code == PRIME || code == COLo || code == COLO || code == COLu || code == COLU ) {
        return true;
    }
    return false;
}

function isalpha ( code ) {
    if ( (gac('A') <= code && code <= gac('Z')) || (gac('a') <= code && code <= gac('z')) ) {
        return true;
    }
    return false;
}

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

function run(uly) {

    var bd = '`';  // beginning delimiter
    var ed = '`';  // ending delimiter
    var wdbeg = true;
    var verbatim = false;

    str = '';
    for (var i = 0; i < uly.length; i++)
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

bedit_init();

var e = [];
var es = document.body.getElementsByTagName('*');
for(var i=0;i<es.length;i++) {

    if(es[i]['tagName'] !='SCRIPT') {

        console.log('test');
        if (es[i].children.length < 1) {
            e.push(es[i]);
        }
    }
}
for (var i = 0; i < e.length; i++) {
    var textContent = e[i].textContent.trim();
        e[i].textContent = run(textContent);
}

function isUy(text)
{
    var regex = /[\u0600-\u06FF]/;
    return regex.test(text);
}
