/**
 * Created by Mardan MEMET (mardan828@gmail.com) on 28/11/2017.
 * GNU General Public License v3.0
 */

var select = document.getElementsByName("select");
var saveBtn = document.getElementById("save");
var global = false;

setParams();
getParams();
//restoreOptions();
//saveOptions();

function setParams() {
    saveBtn.addEventListener('click', function () {
        if (select[0].checked) {
            global = true;
        }
        var params = {
            "globalSelect": global,
        };
        localStorage.setItem('params', JSON.stringify(params));
    });
}

function getParams() {

    var params = localStorage.getItem('params');
    params = JSON.parse(params);
    if (params.globalSelect == true) {
        select[0].checked = true;
    }


}


function restoreOptions() {
    chrome.storage.sync.get({
        params: {
            "global-select": global
        }
    }, function (items) {
        if (items.params['global-select'] == true) {
            select[0].checked = true;
        }
    });
}

function saveOptions() {
    saveBtn.addEventListener('click', function () {
        if (select[0].checked) {
            global = true;
        }
        chrome.storage.sync.set({
            params: {
                "global-select": global
            }
        }, function () {
            var status = document.getElementById("status");
            status.style.display = "block";
            status.textContent = "مەشغۇلات مۇۋاپىققىيەتلىك بولدى";
            setTimeout(function() {
                status.style.display = "none";
            }, 1500);
        });
    });
}

