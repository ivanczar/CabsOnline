<!--file data.php -->
<?php
require_once('../../conf/sqlinfo.inc.php');
//establish connection to db
$conn = mysqli_connect($sql_host, $sql_user, $sql_pass);

// If connection fails
if (!$conn) {
	echo "<p>Failed to connect</p>";
}

$dbSelect = mysqli_select_db($conn, $sql_user);

//if db selection fails
if (!$dbSelect) {
	die(mysqli_error($conn));
	echo "<p>Failed to SELECT</p>";
}
// get name and password passed from client
$cname = $_POST['cname'];
$phone = $_POST['phone'];
$unumber = $_POST['unumber'];
$snumber = $_POST['snumber'];
$stname = $_POST['stname'];
$sbname = $_POST['sbname'];
$dsbname = $_POST['dsbname'];
$date = $_POST['date'];
$time = $_POST['time'];

$bookingID = "0002"; // generate by counting table rows
$gendate = "12/123/12"; //use date()
$gentime = "12:12"; //use server time
$status = "unassigned";


//CREATE TABLE bookings(bookingID VARCHAR(20) PRIMARY KEY NOT NULL, gendate VARCHAR(20) NOT NULL,
// gentime VARCHAR(20) NOT NULL, status VARCHAR(20) NOT NULL, cname VARCHAR(20) NOT NULL,
// phone VARCHAR(20) NOT NULL, unumber INT, snumber INT NOT NULL, stname VARCHAR(20) NOT NULL,
// sbname VARCHAR(20), dsbname VARCHAR(20), pickupdate VARCHAR(20) NOT NULL, pickuptime VARCHAR(20) NOT NULL);

$insertSQL = "INSERT INTO bookings VALUES ('$bookingid', '$gendate', '$gentime', '$status', '$cname', '$phone', '$unumber', '$snumber', '$stname' , '$sbname', '$dsbname' , '$pickupdate', '$pickuptime');";
$query = mysqli_query($conn, $insertSQL);

if ($query) {
    echo "<p name='reference'>Thank you for booking!
    <br>
    Booking reference number: $bookingID<br>
    Pickup time: $time<br>
    Pickup date: $date
    <p>";
    
 
} else {
    die(mysqli_error($conn));
    echo "FAIL";
}



?>