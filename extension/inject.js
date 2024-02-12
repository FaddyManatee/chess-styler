var pieces = ["wp", "wb", "wn", "wr", "wq", "wk", "bp", "bb", "bn", "br", "bq", "bk"];

window.onload = function() {
  for (let i = 0; i < pieces.length; i++) {
    let elements = document.getElementsByClassName(`piece ${pieces[i]}`);

    chrome.storage.local.get(pieces[i], function(result) {
      let url = result[pieces[i]];
      if (url) {
        for (let j = 0; j < elements.length; j++) {
          elements[j].style.backgroundImage = `url(${url})`;
        }
      }
    });
  }
};
