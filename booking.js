/**
  Ivan Czar
  19088501
  booking.js file sets html time and date inputs to current date, sets up the xhr object, validates user inputs and modifies DOM elements
 */

/**
 * Pads a number with a leading zero if it is less than 10
 * @param {Number} number the number to be padded
 * @returns The number padded with 0's
 */
function zeroPad(number) {
  if (number < 10) return "0" + number;
  else return number;
}

/**
 * Sets the date and time DOM inputs to the client's current date and time
 */
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

/**
 * Gets the client's current date
 * @returns {String} the current date in the format YYYY-MM-DD
 */
function getDate() {
  var today = new Date();
  var dd = zeroPad(today.getDate());
  var mm = zeroPad(today.getMonth() + 1);
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return today;
}

/**
 * Gets the client's current time
 * @returns {String} the current time in the format HH:MM
 */
function getTime() {
  var today = new Date();
  var time = zeroPad(today.getHours()) + ":" + zeroPad(today.getMinutes());
  return time;
}

/**
 * Validates phone number input using Regex
 * @param {String} phone the phone number to be validated
 * @returns {Boolean} true if the phone number is valid, false otherwise
 */
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

/**
 * Gets the booking data from the server using an AJAX request and displays it in the DOM
 * @param {File} dataSource The file to be requested
 * @param {Element} divID The DOM element to be populated with the data
 * @param {String} cname  the name of the customer
 * @param {String} phone the phone number of the customer
 * @param {String} unumber the unit number of the customer
 * @param {String} snumber the street number of the customer
 * @param {String} stname the street name of the customer
 * @param {String} sbname the suburb name of the customer
 * @param {String} dsbname the destination suburb name of the customer
 * @param {Date} date the pickup date of the booking
 * @param {Time} time the pickup time of the booking
 */
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

      xhr.open("POST", dataSource, true); //open xtml request for POST and send to server
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          obj.innerHTML = xhr.responseText;
          form.reset();
          setDateTime();
        }
      };
      xhr.send(requestbody);
    }
  }
}
