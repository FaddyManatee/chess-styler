var pieces = ["wp", "wb", "wn", "wr", "wq", "wk", "bp", "bb", "bn", "br", "bq", "bk"];

window.onload = function() {
    let root = document.documentElement;

    for (let i = 0; i < pieces.length; i++) {
        chrome.storage.local.get(pieces[i], function(result) {
            let url = result[pieces[i]];
            if (url) {
                root.style.setProperty(`--theme-piece-set-${pieces[i]}`, `url(${url})`);
            }
        });
    }
};
