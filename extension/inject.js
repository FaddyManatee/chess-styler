var pieces = {
    "wp": null, "wb": null, "wn": null, "wr": null, "wq": null, "wk": null, 
    "bp": null, "bb": null, "bn": null, "br": null, "bq": null, "bk": null
};

var root = document.documentElement;

window.onload = function() {
    let promises = [];

    for (let key in pieces) {
        let p = new Promise((resolve, reject) => {
            chrome.storage.local.get(key, function(result) {
                let url = result[key];
                if (url) {
                    pieces[key] = url;
                    root.style.setProperty(`--theme-piece-set-${key}`, `url(${url})`);
                }
                resolve();
            });
        });
        promises.push(p);
    }

    let board = null;
    let board_p = new Promise((resolve, reject) => {
        chrome.storage.local.get("board", function(result) {
            if (result.board) {
                board = result.board;
                root.style.setProperty("--theme-board-style-image", `url(${result.board})`);
            }
            resolve();
        });
    });
    promises.push(board_p);

    let coord_light = null;
    let coord_dark = null;

    let highlight = null;
    let highlight_p = new Promise((resolve, reject) => {
        chrome.storage.local.get("highlight", function(result) {
            if (result.highlight) {
                highlight = result.highlight;
                root.style.setProperty("--theme-board-style-highlight-color", highlight);
            }
            resolve();
        });
    });
    promises.push(highlight_p);

    // All storage operations have completed. Safely access the 'pieces' object and 'board' variables.
    Promise.all(promises).then(() => {
        let css = "";
    
        if (board) {
            css += `
            .board {
                background-image: url(${board}) !important;
            }`;
        }
    
        // if (coord_light) {
        //     css += `    
        //     .coordinate-light {
        //         fill: #aaaaaa !important;
        //     }`;
        // }
    
        // if (coord_dark) {
        //     css += `
        //     .coordinate-dark {
        //         fill: #dcdcdc !important;
        //     }`;
        // }
    
        if (highlight) {
            css += `
            .highlight {
                background-color: ${highlight} !important;
            }`;
        }
    
        if (pieces["wp"]) {
            css += `
            .piece.wp, .promotion-piece.wp {
                background-image: url(${pieces["wp"]}) !important;
            }`;
        }
    
        if (pieces["wn"]) {
            css += `
            .piece.wn, .promotion-piece.wn {
                background-image: url(${pieces["wn"]}) !important;
            }`;    
        }
    
        if (pieces["wb"]) {
            css += `
            .piece.wb, .promotion-piece.wb {
                background-image: url(${pieces["wb"]}) !important;
            }`;    
        }
    
        if (pieces["wr"]) {
            css += `
            .piece.wr, .promotion-piece.wr {
                background-image: url(${pieces["wr"]}) !important;
            }`;    
        }
    
        if (pieces["wq"]) {
            css += `
            .piece.wq, .promotion-piece.wq {
                background-image: url(${pieces["wq"]}) !important;
            }`;   
        }
    
        if (pieces["wk"]) {
            css += `
            .piece.wk, .promotion-piece.wk {
                background-image: url(${pieces["wk"]}) !important;
            }`;   
        }
    
        //////////////////////////////////////////////////////////////
    
        if (pieces["bp"]) {
            css += `
            .piece.bp, .promotion-piece.bp {
                background-image: url(${pieces["bp"]}) !important;
            }`;
        }
    
        if (pieces["bn"]) {
            css += `
            .piece.bn, .promotion-piece.bn {
                background-image: url(${pieces["bn"]}) !important;
            }`;    
        }
    
        if (pieces["bb"]) {
            css += `
            .piece.bb, .promotion-piece.bb {
                background-image: url(${pieces["bb"]}) !important;
            }`;    
        }
    
        if (pieces["br"]) {
            css += `
            .piece.br, .promotion-piece.br {
                background-image: url(${pieces["br"]}) !important;
            }`;    
        }
    
        if (pieces["bq"]) {
            css += `
            .piece.bq, .promotion-piece.bq {
                background-image: url(${pieces["bq"]}) !important;
            }`;   
        }
    
        if (pieces["bk"]) {
            css += `
            .piece.bk, .promotion-piece.bk {
                background-image: url(${pieces["bk"]}) !important;
            }`;   
        }
            
        let style = document.createElement("style");
        style.type = "text/css";
        
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } 
        else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName("head")[0].appendChild(style);
    });
};
