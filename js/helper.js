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
