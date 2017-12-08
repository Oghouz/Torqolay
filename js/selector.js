/**
 * Created by Mardan MEMET (mardan828@gmail.com) on 28/11/2017.
 * GNU General Public License v3.0
 */

document.addEventListener('mouseup', function(e) {
    var selection;
    if(window.getSelection) {
        selection = window.getSelection();
    } else if (document.selection){
        selection = document.selection.createRange();
    }

    if (selection.toString() !== '' && selection.rangeCount > 0) {

        var text = selection.toString(); // selected text

        var showDiv = document.getElementById("tq-selection-p");
        if(showDiv) {
            document.body.removeChild(showDiv);
        }

        // translate result content
        var p = document.createElement("div");
        p.innerText = text; // todo: converted text
        p.style.position = "absolute";
        p.style.backgroundColor = '#dedede';
        p.style.border = '1px solid #aaa';
        p.style.borderRadius  = "5px";
        p.style.padding = "10px";
        p.id = "tq-selection-p";
        p.style.left = e.pageX + "px";
        p.style.top = e.pageY + "px";
        document.body.appendChild(p);

        // close button
        var close = document.createElement('a');
        close.style.float = "right";
        close.style.marginTop = "-30px";
        close.style.marginRight = "-30px";
        close.style.cursor = "pointer";
        close.className = "close";
        close.style.color = "#fff";
        close.style.border = "1px solid #AEAEAE";
        close.style.borderRadius  = "30px";
        close.style.background  = "#676668";
        close.style.fontSize  = "18px";
        close.style.fontWeight  = "bold";
        close.style.display = "inline-block";
        close.style.padding = "11px 3px";
        close.style.lineHeight = "0px";
        close.textContent = "✖";

        p.appendChild(close);

        close.addEventListener("click", function () {
            p.remove();
        })
    }
});
