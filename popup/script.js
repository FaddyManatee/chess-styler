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

function showBoard() {
    chrome.storage.local.get("board", function(result) {
        let board = document.getElementById("board");
        board.src = result.board;
    });
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
        for (const file of event.target.files) {
            let id = file.name.slice(0, 2).toLowerCase();

            if (!pieces.includes(id)) {
                //
            }
            else if (!file.name.includes(".png")  &&
                     !file.name.includes(".jpg")  &&
                     !file.name.includes(".jpeg") &&
                     !file.name.includes(".svg"))
            {
                //
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
                        //
                    });
                });
            }
        }
        preview.innerHTML = "";
        showPieces();
    },
    false
);

document.getElementById("upload-board").addEventListener(
    "change",
    (event) => {
        // Convert image to data URL.
        for (const file of event.target.files) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                // Save data URL to chrome.storage.
                let obj = {};
                obj["board"] = reader.result;
                chrome.storage.local.set(obj, function() {
                    // 
                });
            });
        }
        showBoard();
    },
    false
);

document.getElementById("last-move").addEventListener(
    "input",
    (event) => {
        let colour = event.target.value;

        // Store the color value.
        chrome.storage.local.set({"highlight": colour}, function() {
            //
        });
    },
    false
);


window.onload = function() {
    showPieces();
    showBoard();
};
