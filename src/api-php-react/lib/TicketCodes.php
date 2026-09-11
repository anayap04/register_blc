<?php

function loadTicketCodes($path) {
    if (!is_readable($path)) {
        return array();
    }
    $codes = json_decode(file_get_contents($path), true);
    return is_array($codes) ? $codes : array();
}

function isValidTicketCode($code, array $validCodes) {
    return in_array((string) $code, $validCodes, true);
}
