// file simpleajax.js
// using POST method
var xhr = createRequest();
function getData(dataSource, divID, cname, phone, unumber, snumber, stname, sbname, dsbname, date,time) {
  if (xhr) {
    var obj = document.getElementById(divID); //set DOM object to variable
    var requestbody =
    console.log(cname);
      "cname=" + encodeURIComponent(cname) + "&phone=" + encodeURIComponent(phone)+ "&unumber=" + encodeURIComponent(unumber)+ "&snumber=" +
       encodeURIComponent(snumber)+ "&stname=" + encodeURIComponent(stname) + "&sbname=" + encodeURIComponent(sbname)+ "&dsbname=" + 
       encodeURIComponent(dsbname)+ "&date=" + encodeURIComponent(date)+ "&time=" + encodeURIComponent(time);
    xhr.open("POST", dataSource, true); //open xtml request for POST and send to
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      //   alert(xhr.readyState); // to let us see the state of the computation
      if (xhr.readyState == 4 && xhr.status == 200) {
        //4=complete, 200=OK

        obj.innerHTML = xhr.responseText;
      }
    };
    xhr.send(requestbody);
  }
}
