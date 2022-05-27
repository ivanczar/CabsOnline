/**
  Ivan Czar
  19088501
 */

// file admin.js sets up the xhr object, encodes and sends data to server and validates user inputs with regex
var xhr = createRequest();
var assignQuery = null;
function getData(dataSource, searchConfirmID, targetDivID, searchQuery, assignQuery) {
  var regex = new RegExp(/^$|^BRN[0-9]{5}$/);
  if (!searchQuery.match(regex)) {
    //if bookingRef doesnt match format
    window.alert("Incorrect reference number format. Try format: BRNXXXXX");
  } else {
    if (xhr) {
      var targetObj = document.getElementById(targetDivID);
      var confirmObj = document.getElementById(searchConfirmID);
      var requestbody = "search=" + encodeURIComponent(searchQuery) + "&assign=" + encodeURIComponent(assignQuery);

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

function assign(
  dataSource,
  confirmDivID,
  bookingReference,
  searchQuery,
  buttonID,
  statusID
) {
  if (xhr) {
    var targetObj = document.getElementById(confirmDivID);
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
        assignQuery = xhr.responseText;
        assignButton.disabled = true;
        statusCell.innerHTML = "Assigned";
      }
    };
    xhr.send(requestbody);
  }
}
