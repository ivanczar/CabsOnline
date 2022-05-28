<!-- 
    Ivan Czar
    19088501
    booking.php file connects to db, gets booking data from XHR object (client), inserts data into db and returns responseText to XHR
 -->

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

/**
 * @param rows The number of rows returned from the query
 * @return ref  the reference number of the last row inserted into the db
 */
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
$gentime = date("H:i:s");
$status = "Unassigned";
$cname = $_POST["cname"];
$phone = $_POST["phone"];
$unumber = $_POST["unumber"];
$snumber = $_POST["snumber"];
$stname = $_POST["stname"];
$sbname = $_POST["sbname"];
$dsbname = $_POST["dsbname"];
$pickupdate = $_POST["date"];
$pickuptime = $_POST["time"];

$insertSQL = "INSERT INTO bookings VALUES 
('$bookingid', '$gendate', '$gentime', '$status',
 '$cname', '$phone', '$unumber', '$snumber', '$stname' ,
  '$sbname', '$dsbname' , '$pickupdate', '$pickuptime');";

$query = mysqli_query($conn, $insertSQL);

if ($query) {

    $formatdate = date("d-m-Y", strtotime($pickupdate));

    echo "<p name='reference'>Thank you,<i> $cname</i>, for your booking!
    <br>
    Booking reference number:<b> $bookingid</b><br>
    Pickup time: $pickuptime<br>
    Pickup date: $formatdate<br>
    </p>";
} else {
    die(mysqli_error($conn));
    echo "FAIL";
}



?>