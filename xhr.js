/**
  Ivan Czar
  19088501
  xhr.js creates and returns an xhr object
 */

/**
 * Creates a new xhr object
 * @returns {Object} the xhr object
 */
function createRequest() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}
