var valid_pieces = ["wp", "bp", "wb", "bb", "wn", "bn", "wr", "br", "wq", "bq", "wk", "bk"];

document.getElementById("upload-pieces").addEventListener(
    "change",
    (event) => {
        let log = document.getElementById("result");

        console.log(event.target.files.length);

        for (const file of event.target.files) {
            let id = file.name.slice(0, 2);

            if (!valid_pieces.includes(id)) {
                log.innerHTML += "<li class=\"skip\">Skipped '" + file.name + "' (bad name)</li>";
            }
            else if (!file.name.includes(".png")  &&
                     !file.name.includes(".jpg")  &&
                     !file.name.includes(".jpeg") &&
                     !file.name.includes(".svg"))
            {
                log.innerHTML += "<li class=\"skip\">Skipped '" + file.name + "' (bad type)</li>";
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
                    // Save data URL to local storage.
                    localStorage.setItem(id, reader.result);
                    log.innerHTML += "<li class=\"accept\">Accepted '" + file.name + "'</li>";
                });
            }
        }
    },
    false
);
