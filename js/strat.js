/**
 * Shared renderer for stratigraphy columns.
 *
 * Builds DOM nodes directly (no innerHTML string-concat) so layer data
 * can never be interpreted as markup, and validates height/color/type
 * before they touch the DOM.
 */
(function (global) {
  "use strict";

  var DEFAULT_HEIGHT_PX = 20;
  var DEFAULT_COLOR = "lightgray";

  // Named colors or #hex — anything else falls back to DEFAULT_COLOR.
  var COLOR_RE = /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)$/;

  // Pattern codes are filenames under svg/ (e.g. "627"), so only allow
  // the characters a filename needs. Blocks path traversal ("../") and
  // any markup/URL-breaking characters.
  var TYPE_RE = /^[A-Za-z0-9-]+$/;

  function sanitizeHeight(value) {
    var n = parseFloat(value);
    return Number.isFinite(n) && n > 0 ? n : DEFAULT_HEIGHT_PX;
  }

  function sanitizeColor(value) {
    return typeof value === "string" && COLOR_RE.test(value) ? value : DEFAULT_COLOR;
  }

  function sanitizeType(value) {
    return typeof value === "string" && TYPE_RE.test(value) ? value : null;
  }

  /**
   * @param {Element} container - element to fill with layer divs
   * @param {{seq: Array<{name?:string,height:*,type:string,color:string}>}} data
   */
  function renderStratColumn(container, data) {
    if (!container || !data || !Array.isArray(data.seq)) return;

    var frag = document.createDocumentFragment();

    data.seq.forEach(function (layer) {
      var type = sanitizeType(layer && layer.type);
      if (!type) {
        console.warn("strat: skipping layer with invalid type", layer);
        return;
      }

      var div = document.createElement("div");
      div.className = "layer";
      div.style.backgroundImage = "url(svg/" + type + ".svg)";
      div.style.height = sanitizeHeight(layer.height) + "px";
      div.style.backgroundColor = sanitizeColor(layer.color);
      if (layer.name) div.title = String(layer.name);
      frag.appendChild(div);
    });

    container.innerHTML = "";
    container.appendChild(frag);
  }

  global.Strat = { renderStratColumn: renderStratColumn };
})(window);
