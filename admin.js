var xhr = createRequest();
function getData(dataSource, searchConfirmID, targetDivID, searchQuery) {
  var regex = new RegExp(/^$|^BRN[0-9]{5}$/);
  if (!searchQuery.match(regex)) {
    window.alert("Incorrect reference number format. Try format: BRNXXXXX");
    console.log('regex not match')
    
  } else {
    if (xhr) {
      var targetObj = document.getElementById(targetDivID);
      var confirmObj = document.getElementById(searchConfirmID);
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

function assign(dataSource, confirmDivID, bookingReference, searchQuery) {
  if (xhr) {
    var targetObj = document.getElementById(confirmDivID);
    var requestbody =
      "bookingRef=" +
      encodeURIComponent(bookingReference) +
      "&search=" +
      encodeURIComponent(searchQuery);

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
