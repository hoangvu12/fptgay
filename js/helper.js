/**
 * Add elements array to specify element
 *
 * @param {DOMNode} parent the element you want to append child to
 * @param {Array} array list of elements array
 */

function addChildren(parent, array) {
  array.forEach((element) => parent.appendChild(element));
}

/**
 *
 * @param {DOMNode} element
 */
function removeChild(element) {
  element.querySelectorAll("*").forEach((e) => e.remove());
}

/**
 *
 * @param {String} hash
 * @returns {String} video's URL
 */
function encodeString(hash) {
  var a = "";
  hash.toString();
  for (var i = 0; i < hash.length; i++) {
    var o = hash.charCodeAt(i),
      r = o ^ 69;
    a += String.fromCharCode(r);
  }
  return a;
}
/**
 *
 * @param {String} x number you want to "comma"
 * @returns {String} "Comma"ed number
 */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function isWindow(obj) {
  return obj != null && obj === obj.window;
}
function getWindow(elem) {
  return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}
function offset(elem) {
  var docElem,
    win,
    box = { top: 0, left: 0 },
    doc = elem && elem.ownerDocument;

  docElem = doc.documentElement;

  if (typeof elem.getBoundingClientRect !== typeof undefined) {
    box = elem.getBoundingClientRect();
  }
  win = getWindow(doc);
  return {
    top: box.top + win.pageYOffset - docElem.clientTop,
    left: box.left + win.pageXOffset - docElem.clientLeft,
  };
}
