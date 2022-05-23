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

function refGenerator($rows)
{
    $start = "BRN";
    $end = $rows;
    while (strlen($end) < 5) {
        $end = "0" . $end;
    }
    $ref = $start . $end;

    return $ref;
}

$countquery = "SELECT * FROM bookings;";
$rows = mysqli_query($conn, $countquery);
$numrows = mysqli_num_rows($rows) + 1;

$bookingid = refGenerator($numrows);
$gendate = date("d/m/Y");
$gentime = date("H:i");
$status = "unassigned";
// get name and password passed from client
$cname = $_POST["cname"];
$phone = $_POST["phone"];
$unumber = $_POST["unumber"];
$snumber = $_POST["snumber"];
$stname = $_POST["stname"];
$sbname = $_POST["sbname"];
$dsbname = $_POST["dsbname"];
$pickupdate = $_POST["date"];
$pickuptime = $_POST["time"];

//CREATE TABLE bookings(bookingID VARCHAR(20) PRIMARY KEY NOT NULL, gendate VARCHAR(20) NOT NULL,
// gentime VARCHAR(20) NOT NULL, status VARCHAR(20) NOT NULL, cname VARCHAR(20) NOT NULL,
// phone VARCHAR(20) NOT NULL, unumber INT, snumber INT NOT NULL, stname VARCHAR(20) NOT NULL,
// sbname VARCHAR(20), dsbname VARCHAR(20), pickupdate VARCHAR(20) NOT NULL, pickuptime VARCHAR(20) NOT NULL);

$insertSQL = "INSERT INTO bookings VALUES 
('$bookingid', '$gendate', '$gentime', '$status',
 '$cname', '$phone', '$unumber', '$snumber', '$stname' ,
  '$sbname', '$dsbname' , '$pickupdate', '$pickuptime');";

$query = mysqli_query($conn, $insertSQL);

if ($query) {

    $formatdate = date("d-m-Y", strtotime($pickupdate));



    echo "<p name='reference'>Thank you,<b> $cname</b>, for your booking!
    <br>
    Booking reference number: $bookingid<br>
    Pickup time: $pickuptime<br>
    Pickup date: $formatdate<br>
    </p>";
} else {
    die(mysqli_error($conn));
    echo "FAIL";
}



?>