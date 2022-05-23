var xhr = createRequest();
function getData(dataSource, searchConfirmID, targetDivID, searchQuery) {
  if (xhr) {
    //   var confirmObj = document.getElementById(searchConfirmID);
    var targetObj = document.getElementById(targetDivID);
    var confirmObj = document.getElementById(searchConfirmID); 
    var requestbody = "search=" + encodeURIComponent(searchQuery);

    xhr.open("POST", dataSource, true); //open xtml request for POST and send to
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      //   alert(xhr.readyState); // to let us see the state of the computation
      if (xhr.readyState == 4 && xhr.status == 200) {
        //4=complete, 200=OK

        targetObj.innerHTML = xhr.responseText;
      }
    };
    xhr.send(requestbody);
  }
}


function assign(dataSource, confirmDivID, bookingReference) {
  if (xhr) {
    var targetObj = document.getElementById(confirmDivID);
    // var confObj = document.getElementById("confirmDiv");
    var requestbody = "bookingRef=" + encodeURIComponent(bookingReference);

    xhr.open("POST", dataSource, true); //open xtml request for POST and send to
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      //   alert(xhr.readyState); // to let us see the state of the computation
      if (xhr.readyState == 4 && xhr.status == 200) {
        //4=complete, 200=OK
        // var v1 = document.createElement("p")
        // var v2 = document.createTextNode("Assigned a driver to " . bookingReference);
        // v1.appendChild(v2);
        // v1.style.color = "green";
        // confObj.appendChild(v1);
        targetObj.innerHTML = xhr.responseText;
      }
    };
    xhr.send(requestbody);
  }
}
