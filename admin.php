<!-- 
    Ivan Czar
    19088501
 -->

<!--file admin.php connects to db, retrieves booking data and puts it into table, then returns table to client-->
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

$adminInput = $_POST["search"]; 
$queryResult = null;

if (!empty($adminInput)) { //if admin searches for a reference number

    $queryResult = mysqli_query($conn, "SELECT bookingID, cname, phone ,sbname,dsbname, pickupdate,pickuptime, bstatus FROM bookings WHERE bookingID LIKE '$adminInput'");
} else {

    $queryResult = mysqli_query($conn, "SELECT bookingID, cname, phone ,sbname,dsbname, pickupdate,pickuptime, bstatus FROM bookings WHERE bstatus LIKE 'Unassigned' AND CONCAT(pickupdate, ' ', pickuptime) < DATE_ADD(NOW(), INTERVAL 2 HOUR)");
}


echo "<div class='content'><table width='100%' border='1'>";
echo "<tr><th>Booking Reference Number</th><th>Customer Name</th><th>Phone</th>
    <th>Pickup Suburb</th><th>Destination Suburb</th><th>Pickup Date and Time</th><th>Status</th><th>Assign</th>";
$row = mysqli_fetch_assoc($queryResult);
while ($row) {
    $rowBookingID = $row['bookingID'];
    echo "<tr>";
    echo "<td>$rowBookingID</td>";
    echo "<td>{$row['cname']}</td>";
    echo "<td>{$row['phone']}</td>";
    echo "<td>{$row['sbname']}</td>";
    echo "<td>{$row['dsbname']}</td>";
    $date = date_create($row['pickupdate']);
    $time = $row['pickuptime'];
    echo "<td>", date_format($date, 'd/m/Y'), " ", $time, "</td>";
    echo "<td>{$row['bstatus']}</td>";
    echo '<td><input type="button" onClick="assign(\'assign.php\' , \'targetDiv\' , \'' . $rowBookingID . '\', \'' . $adminInput . '\')" value="Assign"   /></td>';
    echo "</tr>";
    $row = mysqli_fetch_assoc($queryResult);
}
echo "</table></div>";
mysqli_free_result($tableExistsQuery);
mysqli_free_result($searchQuery);
mysqli_close($conn);


?>