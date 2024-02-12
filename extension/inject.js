var pieces = ["wp", "wb", "wn", "wr", "wq", "wk", "bp", "bb", "bn", "br", "bq", "bk"];

function changePieces() {
    let root = document.documentElement;

    for (let i = 0; i < pieces.length; i++) {
        let elements = document.getElementsByClassName(`piece ${pieces[i]}`);

        chrome.storage.local.get(pieces[i], function(result) {
            let url = result[pieces[i]];
            if (url) {
                root.style.setProperty(`--theme-piece-set-${pieces[i]}`, `url(${url})`);

                for (let j = 0; j < elements.length; j++) {
                    elements[j].style.backgroundImage = `url(${url})`;
                }
            }
        });
    }
};

window.onload = function() {
    // Create an observer instance linked to the callback function
    let observer = new MutationObserver(changePieces);

    // Start observing the document body for configured mutations
    observer.observe(document.body, { childList: true, subtree: true });
};
