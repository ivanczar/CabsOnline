<!-- 
    Ivan Czar
    19088501
 -->

<!--file assign.php connects to db, updates booking status and re-renders table -->
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


if (isset($assignRef)) 
{
    // update status of passed bookingReference to assigned
    $updateQuery = "UPDATE bookings SET bstatus = 'Assigned' WHERE bookingID LIKE '$assignRef'";
    $updateResult = mysqli_query($conn, $updateQuery);
    echo "<p style='font-size:20px;'><b>*A driver has been assigned to " . $assignRef . "*</b></p>";
}

if (empty($adminInput)) {
    // $queryResult = mysqli_query($conn, "SELECT bookingID, cname, phone ,sbname,dsbname, pickupdate,pickuptime, bstatus FROM bookings WHERE CONCAT(pickupdate, ' ', pickuptime) < DATE_ADD(NOW(), INTERVAL 2 HOUR)");
    $queryResult = mysqli_query($conn, "SELECT bookingID, cname, phone ,sbname,dsbname, pickupdate,pickuptime, bstatus FROM bookings WHERE bstatus LIKE 'Unassigned' AND CONCAT(pickupdate, ' ', pickuptime) < DATE_ADD(NOW(), INTERVAL 2 HOUR)");
} else {

    $queryResult = mysqli_query($conn, "SELECT bookingID, cname, phone ,sbname,dsbname, pickupdate,pickuptime, bstatus FROM bookings WHERE bookingID LIKE '$adminInput'");
}


echo "<div class='content'><table width='100%' border='1'>";
echo "<tr><th>Booking Reference Number</th><th>Customer Name</th><th>Phone</th>
    <th>Pickup Suburb</th><th>Destination Suburb</th><th>Pickup Date and Time</th><th>Status</th><th>Assign</th>";
$row = mysqli_fetch_assoc($queryResult);
while ($row) {
    $rowBookingID = $row['bookingID'];
    echo "<tr><td>$rowBookingID</td>";
    echo "<td>{$row['cname']}</td>";
    echo "<td>{$row['phone']}</td>";
    echo "<td>{$row['sbname']}</td>";
    echo "<td>{$row['dsbname']}</td>";
    $date = date_create($row['pickupdate']);
    $time = $row['pickuptime'];
    echo "<td>", date_format($date, 'd/m/Y'), " ", $time, "</td>";
    echo "<td>{$row['bstatus']}</td>";
    $isAssigned = $row['bstatus'] == "Assigned";
    echo '<td><input type="button" onClick="assign(\'assign.php\' , \'targetDiv\' , \'' . $rowBookingID . '\', \'' . $adminInput . '\')" value="Assign" disabled=\'' . $isAssigned . '\'/></td></tr>';

    $row = mysqli_fetch_assoc($queryResult); // returns false when reached end of row

}
echo "</table></div>";

mysqli_free_result($tableExistsQuery);
mysqli_free_result($searchQuery);
mysqli_close($conn);
?>