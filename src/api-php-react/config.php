<?php

function loadEnvFile($path) {
    if (!is_readable($path)) {
        return;
    }
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if (getenv($key) === false) {
            putenv($key . '=' . $value);
        }
    }
}

loadEnvFile(__DIR__ . '/.env');

function envOrFail($key) {
    $value = getenv($key);
    if ($value === false || $value === '') {
        header('Content-Type: application/json; charset=UTF-8');
        http_response_code(500);
        echo json_encode(array('message' => 'Server misconfigured: missing ' . $key));
        exit;
    }
    return $value;
}

function getDbConnection() {
    $conn = new mysqli(
        envOrFail('DB_HOST'),
        envOrFail('DB_USER'),
        envOrFail('DB_PASS'),
        envOrFail('DB_NAME')
    );
    if ($conn->connect_error) {
        header('Content-Type: application/json; charset=UTF-8');
        http_response_code(500);
        echo json_encode(array('message' => 'Database connection failed'));
        exit;
    }
    return $conn;
}
