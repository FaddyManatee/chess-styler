var pieces = ["wp", "wb", "wn", "wr", "wq", "wk", "bp", "bb", "bn", "br", "bq", "bk"];
var preview = document.getElementById("preview-pieces");

for (let i = 0; i < pieces.length; i++) {
    if (localStorage.getItem(pieces[i]) !== null) {
        var value = localStorage.getItem(pieces[i]);
        preview.innerHTML += `<div class=\"piece\"><img src=\"${value}\"></div>`;
    }
    else {
        preview.innerHTML += `<div class=\"piece\"><img src="../icons/empty.png"></div>`;
    }
}

document.getElementById("reset").addEventListener(
    "click", 
    (event) => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            localStorage.removeItem(key);
        }
    }
);
