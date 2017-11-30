/**
 * Created by Mardan MEMET on 30/11/2017.
 */

var select = document.getElementsByName("select");
var saveBtn = document.getElementById("save");
var global = true;
saveBtn.addEventListener('click', function (event) {

    if (select[0].value == 1) {
        global = true;
    }

    console.log(global)
})

