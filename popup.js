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
    { "name": "ئەسلىيە", "value": "UKIJ" },
    { "name": "ئەسلىيە چىۋەر", "value": "UKIJ" },
    { "name": "ئەسلىيە نەقىش", "value": "UKIJ" },
    { "name": "ئەسلىيە قارا", "value": "UKIJ" },
    { "name": "ئەسلىيە توم", "value": "UKIJ" },
    { "name": "ئىمارەت", "value": "UKIJ" },
    { "name": "ئىنچىكە", "value": "UKIJ" },
    { "name": "جۇنۇن", "value": "UKIJ" },
    { "name": "كاۋاك", "value": "UKIJ" },
    { "name": "كاۋاك 3ئۆلچەم", "value": "UKIJ" },
    { "name": "كەسمە", "value": "UKIJ" },
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

var fontStyle = $('#fontStyle');
fonts.forEach(function (element, index) {
    var option = '<li style="font-family: '+element.value+'; text-align: right;"><a id="font-select-'+index+'">'+element.name+'</a></li>';
    var li = fontStyle.append(option);
    var select = $('#font-select-'+index);
    select.on('click', function () {
        changeFontStyle(index);
    })
});

function changeFontStyle(index) {
    var font = fonts[index].value;
    var command = "var es = document.all; for(var i=0;i<es.length;i++){ if((es[i]['tagName']=='IFRAME')||(es[i]['tagName']=='FRAME')){ var w=es[i].contentWindow; var wes = w.document.all; for(var j=0;j<wes.length;j++){ wes[j].style.fontFamily='"+font+"'; }  } es[i].style.fontFamily='"+font+"'; }";
    chrome.tabs.executeScript(null,{code:command});
}



