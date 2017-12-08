/**
 * Created by Mardan MEMET (mardan828@gmail.com) on 28/11/2017.
 * GNU General Public License v3.0
 */

tq = {

    fonts: [
        { "name": "تۈز", "value": "UKIJ Tuz", "file": "UKIJTuz.ttf" },
        { "name": "تۈز تور", "value": "UKIJ Tuz Tor", "file": "UKIJTzTr.ttf" },
        { "name": "تۈز باسما", "value": "UKIJ Tuz Basma", "file": "UKIJTuzB.ttf" },
        { "name": "تۈز كىتاب", "value": "UKIJ Tuz Kitab", "file": "UKIJTuzK.ttf" },
        { "name": "تۈز قارا", "value": "UKIJ Tuz Qara", "file": "UKIJTuzQ.ttf" },
        { "name": "ئېكران", "value": "UKIJ Ekran", "file": "UKIJEkran.ttf" },
        { "name": "باسما", "value": "UKIJ Basma", "file": "UKIJBasma.ttf" },
        { "name": "زىلۋا", "value": "UKIJ Zilwa", "file": "UKIJZilwa.ttf" }
    ],
    fontSelectedIndex: null,

    init: () => {
        tq.mouseSelect()
        tq.setPage()
        tq.bindEvents()
    },
    
    setPage: () => {

        tq.fonts.forEach((element, index) => {
            var option = '<li style="font-family: '+element.value+' text-align: rightcursor: pointer"><a id="font-select-'+index+'">'+element.name+'</a></li>'
            $('#fontStyle').append(option)
            var select = $('#font-select-'+index)
            select.on('click', () => {
                tq.setFontStyle(tq.fonts[index])
            })
        })
    },

    mouseSelect: () => {
        var params = tq.getGlobalSelect()
        if (params.mouseSelect) {
            chrome.tabs.executeScript(null, {
                file: 'js/selector.js'
            })
        }
    },

    bindEvents: () => {

        // UY -> ULY convert
        $('#uytouly').on('click', () => {
            chrome.tabs.executeScript(null, {
                file: 'js/uy2uly.js'
            })
        })

        // ULY -> UY convert event
        $('#ulytouy').on('click', () => {
            chrome.tabs.executeScript(null, {
                file: 'js/uly2uy.js'
            })
        })

        // font size
        var fontSize = $('#fontSize')
        var fontSizeCounter = $('#fontSizeCounter')
        fontSize.on('input', () => {
            var size = this.value
            fontSizeCounter.text(size)
            tq.setFontSize(size)
        })

        // text direction
        $('#direction').change(() => {
            if (this.checked) {
                tq.setDirection('rtl')
            } else {
                tq.setDirection('')
            }
        })

        // font color
        $('#fontColor').on('input', () => {
            color = this.value
            tq.setFontColor(color)
        })

        // background color
        $('#bgColor').on('input', () => {
            color = this.value
            tq.setBackgroundColor(color)
        })

        // refresh page
        $('#refresh').on('click', () => {
            chrome.tabs.executeScript(null, {code: "window.location.reload()"})
        })
        

    },
    
    setFontStyle: (font) => {
        var code = tq.setStyle('fontFamily', font.value)
        code+= tq.setHeadStyle(font.value, font.file)
        chrome.tabs.executeScript(null,{code:code})
    },
    
    setFontSize: (size) => {
        var code = tq.setStyle('fontSize', size+'px')
        chrome.tabs.executeScript(null,{code:code})
    },

    setDirection: (direction) => {
        var code = tq.setStyle('direction', direction)
        chrome.tabs.executeScript(null,{code:code})
    },

    setFontColor: (color) => {
        var code = tq.setStyle('color', color)
        chrome.tabs.executeScript(null,{code:code})
    },

    setBackgroundColor: (color) => {
        var code = tq.setStyle('backgroundColor', color)
        chrome.tabs.executeScript(null,{code:code})
    },

    setStyle: (style, value) => {
        var params = tq.getGlobalSelect()
        if (params.globalSelect) {
            return "var es=document.body.getElementsByTagName('*')for(var i=0i<es.lengthi++){var search=es[i].innerTextif(es[i]['tagName'] !='SCRIPT'){es[i].style."+style+"='"+value+"'}}"
        }
        return "var regex=/[\u0600-\u06FF]/var es=document.body.getElementsByTagName('*')for(var i=0i<es.lengthi++){var search=es[i].innerTextif(es[i]['tagName'] !='SCRIPT' && regex.test(search)){es[i].style."+style+"='"+value+"'}}"
    },

    setHeadStyle: (fontName, fileName) => {
        var file = "chrome-extension://feekbgjlnbmihodgdomphfgiakdkfbfo/fonts/"+fileName
        return 'var css="@font-face {font-family: '+fontName+'src: url('+file+')}"'+
            'var head = document.headvar style = document.createElement("style")'+
            'if(style.styleSheet) {style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}head.appendChild(style)'
    },

    isUy: (text) => {
        var regex = /[\u0600-\u06FF]/
        return regex.test(text)
    },

    getGlobalSelect: () => {
        var param = localStorage.getItem("params")
        if (param === null) return false
        return JSON.parse(param)
    }

}

$(tq.init)
