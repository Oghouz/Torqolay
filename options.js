/**
 * Created by Mardan MEMET (mardan828@gmail.com) on 28/11/2017.
 * GNU General Public License v3.0
 */

var select = document.getElementsByName("select");
var saveBtn = document.getElementById("save");
var mouseSelect = document.getElementById("mouseSelect");

var params = {
    "globalSelect": false,
    "mouseSelect": false
};

// version info
var manifestData = chrome.runtime.getManifest();
document.getElementById('version').textContent = "version " + manifestData.version;

setParams();
getParams();


function setParams() {
    saveBtn.addEventListener('click', function () {
        if (select[0].checked) {
            params.globalSelect = true;
        }
        localStorage.setItem('params', JSON.stringify(params));
    });

    mouseSelect.addEventListener("change", function () {
        if (this.checked) {
            params.mouseSelect = true;
        }
    })
}

function getParams() {

    var params = localStorage.getItem('params');
    params = JSON.parse(params);
    if (params && params.globalSelect == true) {
        select[0].checked = true;
    }
    if (params && params.mouseSelect == true) {
        mouseSelect.checked = true;
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

