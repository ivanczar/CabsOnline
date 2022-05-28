/**
  Ivan Czar
  19088501

  This file sets html time and date inputs to current date, sets up the xhr object, validates user inputs and modifies DOM elements
 */

/**
 * 
 * @param {Number} The date num 
 * @returns 
 */
function zeroPad(number) {
  if (number < 10) return "0" + number;
  else return number;
}

//Set value of date and time inputs to current date
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

function getDate() {
  var today = new Date();
  var dd = zeroPad(today.getDate());
  var mm = zeroPad(today.getMonth() + 1);
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return today;
}

function getTime() {
  var today = new Date();
  var time = zeroPad(today.getHours()) + ":" + zeroPad(today.getMinutes());
  return time;
}

// validates phone number input using Regex
function isValidPh(phone) {
  let isValid = true;
  if (!/^\d+$/.test(phone)) {
    isValid = false;
  }
  if (phone.length < 10 || phone.length > 12) {
    isValid = false;
  }
  return isValid;
}

var xhr = createRequest();
// encodes user data and sends to server as XHR object
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
  } else if ((date == getDate() && time < getTime()) || date < getDate()) {
    alert(
      "We do not support time travel yet, please provide a valid date/time"
    );
  } else {
    if (xhr) {
      var obj = document.getElementById(divID); //set DOM object to variable
      var form = document.getElementById("bookingForm");
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
        if (xhr.readyState == 4 && xhr.status == 200) {
          
          obj.innerHTML = xhr.responseText;
          form.reset();
        }
      };
      xhr.send(requestbody);
      
    }
  }
}
