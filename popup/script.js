var pieces = ["wp", "wb", "wn", "wr", "wq", "wk", "bp", "bb", "bn", "br", "bq", "bk"];
var preview = document.getElementById("preview-pieces");

function showPieces() {
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
}

document.getElementById("reset").addEventListener(
    "click", 
    (event) => {
        chrome.storage.local.clear();
        preview.innerHTML = "";

        for (let i = 0; i < pieces.length; i++) {
            preview.innerHTML += `<div class=\"piece\"><img src="../icons/empty.png"></div>`;
        }
    }
);

document.getElementById("upload-pieces").addEventListener(
    "change",
    (event) => {
        // let log = document.getElementById("result");

        for (const file of event.target.files) {
            let id = file.name.slice(0, 2).toLowerCase();

            if (!pieces.includes(id)) {
                // log.innerHTML += "<li class=\"skip\">Skipped '" + file.name + "' (bad name)</li>";
            }
            else if (!file.name.includes(".png")  &&
                     !file.name.includes(".jpg")  &&
                     !file.name.includes(".jpeg") &&
                     !file.name.includes(".svg"))
            {
                // log.innerHTML += "<li class=\"skip\">Skipped '" + file.name + "' (bad type)</li>";
            }
            else {
                // Create a new FileReader for each file.
                /*
                 * The FileReader API is asynchronous, so when you’re trying to read multiple files
                 * in a loop, the load event might be triggered for a different file than you expect.
                 */
                const reader = new FileReader();

                // Convert image to data URL.
                reader.readAsDataURL(file);
                reader.addEventListener("load", () => {
                    // Save data URL to chrome.storage.
                    let obj = {};
                    obj[id] = reader.result;
                    chrome.storage.local.set(obj, function() {
                        // console.log("Value is set to " + reader.result);
                    });
                    // log.innerHTML += "<li class=\"accept\">Accepted '" + file.name + "'</li>";
                });
            }
        }
        preview.innerHTML = "";
        showPieces();
    },
    false
);

window.onload = function() {
    showPieces();
};
