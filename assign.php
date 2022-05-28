<!-- 
    Ivan Czar
    19088501
    assign.php file connects to db, updates booking status echoes if successful
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


$assignRef = $_POST["bookingRef"]; //booking reference of row
$adminInput = $_POST["search"]; //admin's input to searchbar
$queryResult = null;


if (isset($assignRef)) {
    // update status of passed bookingReference to assigned
    $updateQuery = "UPDATE bookings SET bstatus = 'Assigned' WHERE bookingID LIKE '$assignRef'";
    $updateResult = mysqli_query($conn, $updateQuery);
    echo "<p style='font-size:20px;'><b>*A driver has been succesfully assigned to " . $assignRef . "*</b></p>";
}

mysqli_free_result($tableExistsQuery);
mysqli_free_result($searchQuery);
mysqli_close($conn);
?>