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

    $currentDate = date("Y-m-d H:i:s");
    $rangeDate = date("Y-m-d H:i:s", strtotime('+2 hours'));
    $queryResult = mysqli_query($conn, "SELECT bookingID, cname, phone ,sbname,dsbname, pickupdate,pickuptime, bstatus FROM bookings WHERE bstatus LIKE 'Unassigned' AND CONCAT(pickupdate, ' ', pickuptime) > '$currentDate' AND CONCAT(pickupdate, ' ', pickuptime) < '$rangeDate'");
}

if (mysqli_num_rows($queryResult) == 0) {
    echo "<h1 style='margin-top:50px;'>No records found</h1>";
} else {
    echo "<div class='content'><table width='100%' border='1'>";
    echo "<tr><th>Booking Reference Number</th><th>Customer Name</th><th>Phone</th>
        <th>Pickup Suburb</th><th>Destination Suburb</th><th>Pickup Date and Time</th><th>Status</th><th>Assign</th>";
    $row = mysqli_fetch_assoc($queryResult);
    while ($row) {
        $rowBookingID = $row['bookingID'];
        $buttonID = $rowBookingID . "button";
        $statusID = $rowBookingID . "status";
        echo "<tr>";
        echo "<td>$rowBookingID</td>";
        echo "<td>{$row['cname']}</td>";
        echo "<td>{$row['phone']}</td>";
        echo "<td>{$row['sbname']}</td>";
        echo "<td>{$row['dsbname']}</td>";
        $date = date_create($row['pickupdate']);
        $time = $row['pickuptime'];
        echo "<td>", date_format($date, 'd/m/Y'), " ", $time, "</td>";
        echo "<td id=$statusID >{$row['bstatus']}</td>";
        echo '<td><input id=\'' . $buttonID . '\' type="button" onClick="assign(\'assign.php\' , \'confirmDiv\' , \'' . $rowBookingID . '\', \'' . $adminInput . '\', \'' . $buttonID . '\', \'' . $statusID . '\')" value="Assign" /></td></tr>';
        echo "</tr>";
        $row = mysqli_fetch_assoc($queryResult);
    }
}
echo "</table></div>";
mysqli_free_result($tableExistsQuery);
mysqli_free_result($searchQuery);
mysqli_close($conn);


?>