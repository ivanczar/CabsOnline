function zeroPad(number) {
  if (number < 10) return "0" + number;
  else return number;
}

function setDateTime() {
  var today = new Date();

  var time = zeroPad(today.getHours()) + ":" + zeroPad(today.getMinutes());
  document.getElementById("time").value = time;

  var date =
    zeroPad(today.getFullYear()) +
    "-" +
    zeroPad(today.getMonth() + 1) +
    "-" +
    zeroPad(today.getDate());

  document.getElementById("date").min = date;
  document.getElementById("date").value = date;

  console.log(time);
}

var xhr = createRequest();
function getData(
  dataSource,
  divID,
  cname,
  phone,
  unumber,
  snumber,
  stname,
  sbname,
  dsbname,
  date,
  time
) {
  if (xhr) {
    var obj = document.getElementById(divID); //set DOM object to variable
    var requestbody =
      "cname=" +
      encodeURIComponent(cname) +
      "&phone=" +
      encodeURIComponent(phone) +
      "&unumber=" +
      encodeURIComponent(unumber) +
      "&snumber=" +
      encodeURIComponent(snumber) +
      "&stname=" +
      encodeURIComponent(stname) +
      "&sbname=" +
      encodeURIComponent(sbname) +
      "&dsbname=" +
      encodeURIComponent(dsbname) +
      "&date=" +
      encodeURIComponent(date) +
      "&time=" +
      encodeURIComponent(time);

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
