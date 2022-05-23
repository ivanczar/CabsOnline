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

}

function getDate()
{
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
return today;
}

function getTime() {
  var today = new Date();
  var time =
    zeroPad(today.getHours()) + ":" + zeroPad(today.getMinutes());
  return time;
}

function isValidPh(phone){
  let isValid = true;
  if (!(/^\d+$/.test(phone))){
    isValid = false;
  }
  if (phone.length < 10 || phone.length > 12){
    isValid = false;
  }
  return isValid;

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
  console.log("current date: " + getDate());
  console.log("input date: " + date);
  console.log("current time: " + getTime());
  console.log("input date: " + time);
  // VALIDATE TEXT TO TYPE TEXT? eg cname, stname, sbname, dsbname
  if (cname == "") {
    alert("Please provide a name");
  } else if (phone == "" || !isValidPh(phone)) {
    alert(
      "Please provide a phone number containing only numbers and length between 10-12"
    );
  } else if (snumber == "") {
    alert("Please provide a street number");
  } else if (stname == "") {
    alert("Please provide a street name");
  } else if (date == "") {
    alert("Please provide a pickup date");
  } else if (time == "") {
    alert("Please provide a pickup time");
  } else if (date == getDate() && time < getTime()) {
    alert("We do not support time travel yet, please provide a valid date/time");
  } else {
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
}
