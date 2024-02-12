var pieces = ["wp", "wb", "wn", "wr", "wq", "wk", "bp", "bb", "bn", "br", "bq", "bk"];
var preview = document.getElementById("preview-pieces");

for (let i = 0; i < pieces.length; i++) {
    chrome.storage.local.get(pieces[i], function(result) {
        var value = result[pieces[i]];
        if (value) {
            preview.innerHTML += `<div class=\"piece\"><img src=\"${value}\"></div>`;
        }
        else {
            preview.innerHTML += `<div class=\"piece\"><img src="../icons/empty.png"></div>`;
        }
    });
}

document.getElementById("reset").addEventListener(
    "click", 
    (event) => {
        chrome.storage.local.clear();
    }
);
