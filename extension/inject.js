var pieces = {
    "wp": "", "wb": "", "wn": "", "wr": "", "wq": "", "wk": "", 
    "bp": "", "bb": "", "bn": "", "br": "", "bq": "", "bk": ""
};

window.onload = function() {
    for (let key in pieces) {
        chrome.storage.local.get(key, function(result) {
            let url = result[key];
            if (url) {
                pieces[key] = url;
            }
        });
    }

    chrome.storage.local.get("board", function(result) {
        let css = `
        #board-single, .fade-in-overlay {
            background-image: url(${result.board}) !important;
        }
        
        .coordinate-light {
            fill: #aaaaaa;
        }
        
        .coordinate-dark {
            fill: #dcdcdc;
        }
        
        .highlight {
            background-color: #a4b8c4;
        }
        
        #board-single .piece.wp, #board-single .promotion-piece.wp {
            background-image: url(${pieces["wp"]}) !important;
        }
            
        #board-single .piece.wn, #board-single .promotion-piece.wn {
            background-image: url(${pieces["wn"]}) !important;
        }
            
        #board-single .piece.wb, #board-single .promotion-piece.wb {
            background-image: url(${pieces["wb"]}) !important;
        }
        
        #board-single .piece.wr, #board-single .promotion-piece.wr {
            background-image: url(${pieces["wr"]}) !important;
        }
        
        #board-single .piece.wq, #board-single .promotion-piece.wq {
            background-image: url(${pieces["wq"]}) !important;
        }
        
        #board-single .piece.wk, #board-single .promotion-piece.wk {
            background-image: url(${pieces["wk"]}) !important;
        }
        
        #board-single .piece.bp, #board-single .promotion-piece.bp {
            background-image: url(${pieces["bp"]}) !important;
        }
            
        #board-single .piece.bn, #board-single .promotion-piece.bn {
            background-image: url(${pieces["bn"]}) !important;
        }
            
        #board-single .piece.bb, #board-single .promotion-piece.bb {
            background-image: url(${pieces["bb"]}) !important;
        }
        
        #board-single .piece.br, #board-single .promotion-piece.br {
            background-image: url(${pieces["br"]}) !important;
        }
        
        #board-single .piece.bq, #board-single .promotion-piece.bq {
            background-image: url(${pieces["bq"]}) !important;
        }
        
        #board-single .piece.bk, #board-single .promotion-piece.bk {
            background-image: url(${pieces["bk"]}) !important;
        }`;
        
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
