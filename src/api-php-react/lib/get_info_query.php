<?php

/**
 * Shared query for the get_info*.php endpoints. $wheelCondition must be a
 * fixed string literal chosen by the caller (never raw user input) -- it is
 * concatenated directly, while $evento (the only user-supplied value) is
 * always bound as a prepared-statement parameter.
 */
function fetchRegistrations($conn, $evento, $isWheel, $wheelCondition) {
    if ($isWheel) {
        $sql = "SELECT * FROM registro WHERE evento = ? AND " . $wheelCondition;
    } else {
        $sql = "SELECT * FROM registro WHERE evento = ? AND asistencia IS NULL";
    }

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $evento);
    $stmt->execute();
    $result = $stmt->get_result();

    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}
