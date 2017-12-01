/* Author:  Muhammad Abdulla (muhammad@yulghun.com)
 * Common routines for text conversion
 * Version: 1.0 (Apr. 20, 2009)
 * License: GPL
 */

var WDBEG = 0;
var INBEG = 1;
var NOBEG = 2;

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
var BPAD = 0x0600;
var BMAX = 0x06FF;
var EPAD = 0xFB00; // presentation form region (extented region)
var EMAX = 0xFEFF;
var BASELEN = 256;
var cmapinv = new Array(BASELEN);
var pform = new Array(BASELEN);
var pf2basic = new Array(EMAX-EPAD);
var pfinited = 0 ;


function uy2uly (str) {
    var i;
    var j = 0;
    var arr = new Array(str.length * 2);
    var pwc = 0;

    if ( !pfinited ) {
        pfinit();
    }

    for ( i = 0; i < str.length; i++ ) {
        wc = str.charCodeAt(i) ;
        if ( wc == HAMZA ) {
            continue ;
        }

        // first handle Uyghur letters that become joint letters in Latin
        if ( wc == CHEE ) {
            arr[j++] = gac('c');
            arr[j] = gac('h');
        } else if ( wc == GHEE ) {
            arr[j++] = gac('g');
            arr[j] = gac('h');
        } else if ( wc == NGEE ) {
            arr[j++] = gac('n');
            arr[j] = gac('g');
        } else if ( wc == SHEE ) {
            arr[j++] = gac('s');
            arr[j] = gac('h');
        } else if ( wc == SZEE ) {
            arr[j] = gac('j');
        } else if ( BPAD <= wc && wc < BMAX && cmapinv[wc-BPAD] != 0 ) {
            // put an apostrophe between two-consecutive vowels
            if ( is_vowel(pwc) && is_vowel(cmapinv[wc-BPAD]) ) {
                arr[j++] = gac("'");
            }

            arr[j] = cmapinv[wc-BPAD] ;
        } else {
            arr[j] = wc ;
        }
        pwc = arr[j];
        j++ ;
    }

    for ( i = 0; i < j; i++ ) {
        arr[i] = String.fromCharCode(arr[i]);
    }

    return arr.join('');
}

function is_vowel (ch) {
    if ( ch == gac('a') || ch == gac('A') || ch == gac('e') || ch == gac('E') ||
        ch == PRIMe || ch == PRIME || ch == gac('i') || ch == gac('I') ||
        ch == gac('o') || ch == gac('O') || ch == COLo || ch == COLO ||
        ch == gac('u') || ch == gac('U') || ch == COLu || ch == COLU ) {
        return true ;
    }
    return false ;
}

function pfinit ( )
{
    pfinited = true ;
    var wc;
    var i;

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

    for ( i = 0 ; i < cmapinv.length ; i++ ) {
        wc = cm[i] ;
        if ( wc != 0 ) {
            cmapinv [ wc - BPAD ] = i ;
        }
    }

    // S new_syn ( wchar_t i, wchar_t b, wchar_t m, wchar_t e, begtype bt ) ;

    for ( i = 0 ; i < pform.length ; i++ ) {
        pform[i] = null ;
    }

    pform[ CM('a') ]    = new Syn ( 0xFE8D, 0xFE8D, 0xFE8D, 0xFE8E, WDBEG ) ;
    pform[ CM('e') ]    = new Syn ( 0xFEE9, 0xFEE9, 0xFEE9, 0xFEEA, WDBEG ) ;
    pform[ CM('b') ]    = new Syn ( 0xFE8F, 0xFE91, 0xFE92, 0xFE90, NOBEG ) ;
    pform[ CM('p') ]    = new Syn ( 0xFB56, 0xFB58, 0xFB59, 0xFB57, NOBEG ) ;
    pform[ CM('t') ]    = new Syn ( 0xFE95, 0xFE97, 0xFE98, 0xFE96, NOBEG ) ;
    pform[ CM('j') ]    = new Syn ( 0xFE9D, 0xFE9F, 0xFEA0, 0xFE9E, NOBEG ) ;
    pform[ CHEE-BPAD ]  = new Syn ( 0xFB7A, 0xFB7C, 0xFB7D, 0xFB7B, NOBEG ) ;
    pform[ CM('x') ]    = new Syn ( 0xFEA5, 0xFEA7, 0xFEA8, 0xFEA6, NOBEG ) ;
    pform[ CM('d') ]    = new Syn ( 0xFEA9, 0xFEA9, 0xFEAA, 0xFEAA, INBEG ) ;
    pform[ CM('r') ]    = new Syn ( 0xFEAD, 0xFEAD, 0xFEAE, 0xFEAE, INBEG ) ;
    pform[ CM('z') ]    = new Syn ( 0xFEAF, 0xFEAF, 0xFEB0, 0xFEB0, INBEG ) ;
    pform[ SZEE-BPAD ]  = new Syn ( 0xFB8A, 0xFB8A, 0xFB8B, 0xFB8B, INBEG ) ;
    pform[ CM('s') ]    = new Syn ( 0xFEB1, 0xFEB3, 0xFEB4, 0xFEB2, NOBEG ) ;
    pform[ SHEE-BPAD ]  = new Syn ( 0xFEB5, 0xFEB7, 0xFEB8, 0xFEB6, NOBEG ) ;
    pform[ GHEE-BPAD ]  = new Syn ( 0xFECD, 0xFECF, 0xFED0, 0xFECE, NOBEG ) ;
    pform[ CM('f') ]    = new Syn ( 0xFED1, 0xFED3, 0xFED4, 0xFED2, NOBEG ) ;
    pform[ CM('q') ]    = new Syn ( 0xFED5, 0xFED7, 0xFED8, 0xFED6, NOBEG ) ;
    pform[ CM('k') ]    = new Syn ( 0xFED9, 0xFEDB, 0xFEDC, 0xFEDA, NOBEG ) ;
    pform[ CM('g') ]    = new Syn ( 0xFB92, 0xFB94, 0xFB95, 0xFB93, NOBEG ) ;
    pform[ NGEE-BPAD ]  = new Syn ( 0xFBD3, 0xFBD5, 0xFBD6, 0xFBD4, NOBEG ) ;
    pform[ CM('l') ]    = new Syn ( 0xFEDD, 0xFEDF, 0xFEE0, 0xFEDE, NOBEG ) ;
    pform[ CM('m') ]    = new Syn ( 0xFEE1, 0xFEE3, 0xFEE4, 0xFEE2, NOBEG ) ;
    pform[ CM('n') ]    = new Syn ( 0xFEE5, 0xFEE7, 0xFEE8, 0xFEE6, NOBEG ) ;
    //pform[ CM('h') ]    = new Syn ( 0xFEEB, 0xFEEB, 0xFEEC, 0xFEEC, NOBEG ) ;
    pform[ CM('h') ]    = new Syn ( 0xFBAA, 0xFBAA, 0xFBAD, 0xFBAD, NOBEG ) ;
    pform[ CM('o') ]    = new Syn ( 0xFEED, 0xFEED, 0xFEEE, 0xFEEE, INBEG ) ;
    pform[ CM('u') ]    = new Syn ( 0xFBD7, 0xFBD7, 0xFBD8, 0xFBD8, INBEG ) ;
    pform[ CM('w') ]    = new Syn ( 0xFBDE, 0xFBDE, 0xFBDF, 0xFBDF, INBEG ) ;
    pform[ CM('i') ]    = new Syn ( 0xFEEF, 0xFBE8, 0xFBE9, 0xFEF0, NOBEG ) ;
    pform[ CM('y') ]    = new Syn ( 0xFEF1, 0xFEF3, 0xFEF4, 0xFEF2, NOBEG ) ;
    pform[ HAMZA-BPAD ] = new Syn ( 0xFE8B, 0xFE8B, 0xFE8C, 0xFB8C, NOBEG ) ;
    pform[ cm[COLo]-BPAD]   = new Syn ( 0xFBD9, 0xFBD9, 0xFBDA, 0xFBDA, INBEG ) ;
    pform[ cm[COLu]-BPAD ]   = new Syn ( 0xFBDB, 0xFBDB, 0xFBDC, 0xFBDC, INBEG ) ;
    pform[ cm[PRIMe]-BPAD ]  = new Syn ( 0xFBE4, 0xFBE6, 0xFBE7, 0xFBE5, NOBEG ) ;

    for ( i = 0; i < pf2basic.length; i++ ) {
        pf2basic[i] = new Array(2);
    }

    var lig;
    // initialize presentation form to basic region mapping
    for (i = 0; i < pform.length; i++) {
        lig = pform[i];
        if (lig != null) {
            pf2basic[lig.iform - EPAD][0] = i + BPAD;
            pf2basic[lig.bform - EPAD][0] = i + BPAD;
            pf2basic[lig.mform - EPAD][0] = i + BPAD;
            pf2basic[lig.eform - EPAD][0] = i + BPAD;
        }
    }

    // the letter 'h' has some other mappings
    pf2basic[0xFEEB - EPAD][0] = cm[gac('h')];
    pf2basic[0xFEEC - EPAD][0] = cm[gac('h')];

    // joint letter LA and _LA
    pf2basic[0xFEFB - EPAD][0] = cm[gac('l')];
    pf2basic[0xFEFB - EPAD][1] = cm[gac('a')];
    pf2basic[0xFEFC - EPAD][0] = cm[gac('l')];
    pf2basic[0xFEFC - EPAD][1] = cm[gac('a')];

    // joint letter AA, AE, EE, II, OO, OE, UU, UE
    // AA, _AA
    pf2basic[0xFBEA - EPAD][0] = HAMZA;
    pf2basic[0xFBEA - EPAD][1] = cm[gac('a')];
    pf2basic[0xFBEB - EPAD][0] = HAMZA;
    pf2basic[0xFBEB - EPAD][1] = cm[gac('a')];

    // AE, _AE
    pf2basic[0xFBEC - EPAD][0] = HAMZA;
    pf2basic[0xFBEC - EPAD][1] = cm[gac('e')];
    pf2basic[0xFBED - EPAD][0] = HAMZA;
    pf2basic[0xFBED - EPAD][1] = cm[gac('e')];

    // EE, _EE, _EE_
    pf2basic[0xFBF6 - EPAD][0] = HAMZA;
    pf2basic[0xFBF6 - EPAD][1] = cm[PRIMe];
    pf2basic[0xFBF7 - EPAD][0] = HAMZA;
    pf2basic[0xFBF7 - EPAD][1] = cm[PRIMe];
    pf2basic[0xFBF8 - EPAD][0] = HAMZA;
    pf2basic[0xFBF8 - EPAD][1] = cm[PRIMe];
    pf2basic[0xFBD1 - EPAD][0] = HAMZA;
    pf2basic[0xFBD1 - EPAD][1] = cm[PRIMe];

    // II, _II, _II_
    pf2basic[0xFBF9 - EPAD][0] = HAMZA;
    pf2basic[0xFBF9 - EPAD][1] = cm[gac('i')];
    pf2basic[0xFBFA - EPAD][0] = HAMZA;
    pf2basic[0xFBFA - EPAD][1] = cm[gac('i')];
    pf2basic[0xFBFB - EPAD][0] = HAMZA;
    pf2basic[0xFBFB - EPAD][1] = cm[gac('i')];

    // OO, _OO
    pf2basic[0xFBEE - EPAD][0] = HAMZA;
    pf2basic[0xFBEE - EPAD][1] = cm[gac('o')];
    pf2basic[0xFBEF - EPAD][0] = HAMZA;
    pf2basic[0xFBEF - EPAD][1] = cm[gac('o')];

    // OE, _OE
    pf2basic[0xFBF2 - EPAD][0] = HAMZA;
    pf2basic[0xFBF2 - EPAD][1] = cm[COLo];
    pf2basic[0xFBF3 - EPAD][0] = HAMZA;
    pf2basic[0xFBF3 - EPAD][1] = cm[COLo];

    // UU, _UU
    pf2basic[0xFBF0 - EPAD][0] = HAMZA;
    pf2basic[0xFBF0 - EPAD][1] = cm[gac('u')];
    pf2basic[0xFBF1 - EPAD][0] = HAMZA;
    pf2basic[0xFBF1 - EPAD][1] = cm[gac('u')];

    // UE, _UE
    pf2basic[0xFBF4 - EPAD][0] = HAMZA;
    pf2basic[0xFBF4 - EPAD][1] = cm[COLu];
    pf2basic[0xFBF5 - EPAD][0] = HAMZA;
    pf2basic[0xFBF5 - EPAD][1] = cm[COLu];
}

function CM(x) {
    return cm[gac(x)]-BPAD;
}

function Syn ( i, b, m, e, bt ) {
    this.iform = i ;
    this.bform = b ;
    this.mform = m ;
    this.eform = e ;
    this.btype = bt ;
}

function gac ( ascii ) {
    var str = "" + ascii;
    return str.charCodeAt(0);
}

function gas ( code ) {
    return String.fromCharCode(code);
}

var e = [];
var es = document.body.getElementsByTagName('*');
for(var i=0;i<es.length;i++) {

    if(es[i]['tagName'] !='SCRIPT') {

        if (es[i].children.length < 1) {
            e.push(es[i]);
        }
    }
}
for (var i = 0; i < e.length; i++) {
    var textContent = e[i].textContent.trim();
    if (isUy(textContent)) {
        e[i].textContent = uy2uly(textContent);
    }
}

function isUy(text)
{
    var regex = /[\u0600-\u06FF]/;
    return regex.test(text);
}