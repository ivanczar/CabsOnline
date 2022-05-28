/**
  Ivan Czar
  19088501
  admin.js file sets up the xhr object, encodes and sends data to server and validates user inputs with regex
 */
var xhr = createRequest();

/**
 * Gets the admin data from the server using an AJAX request and displays it in the DOM
 * @param {File} dataSource The file to be requested
 * @param {Element} targetDivID The ID of the element to be populated with the table response
 * @param {String} searchQuery The search query to be sent to the server
 */
function getData(dataSource, targetDivID, searchQuery) {
  var regex = new RegExp(/^$|^BRN[0-9]{5}$/);
  if (!searchQuery.match(regex)) {
    //if bookingRef doesnt match format
    window.alert("Incorrect reference number format. Try format: BRNXXXXX");
  } else {
    if (xhr) {
      var targetObj = document.getElementById(targetDivID);
      var requestbody = "search=" + encodeURIComponent(searchQuery);

      xhr.open("POST", dataSource, true); //open xtml request for POST and send to
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          targetObj.innerHTML = xhr.responseText;
        }
      };
      xhr.send(requestbody);
    }
  }
}

/**
 * Gets the admin data from the server using an AJAX request and displays it in the DOM
 * @param {File} dataSource The file to be requested
 * @param {Element} confirmDivID The ID of the element to be populated with the confirmation response
 * @param {String} bookingReference The booking reference to be sent to the server
 * @param {String} searchQuery The search query to be sent to the server
 * @param {String} buttonID The ID of the assign button to be disabled
 * @param {String} statusID The ID of the status table cell to be changed to assigned
 */
function assign(
  dataSource,
  confirmDivID,
  bookingReference,
  searchQuery,
  buttonID,
  statusID
) {
  if (xhr) {
    var confirmObj = document.getElementById(confirmDivID);
    var assignButton = document.getElementById(buttonID);
    var statusCell = document.getElementById(statusID);

    var requestbody =
      "bookingRef=" +
      encodeURIComponent(bookingReference) +
      "&search=" +
      encodeURIComponent(searchQuery);

    xhr.open("POST", dataSource, true); //open xtml request for POST and send to server
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        confirmObj.innerHTML = xhr.responseText; //sets confirmation after assigning
        assignButton.disabled = true;
        statusCell.innerHTML = "Assigned";
      }
    };
    xhr.send(requestbody);
  }
}
