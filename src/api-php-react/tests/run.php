<?php
/**
 * Minimal dependency-free test runner (composer/PHPUnit are not available
 * in every deployment target for this project). Run with:
 *   php src/api-php-react/tests/run.php
 */

require __DIR__ . '/../lib/TicketCodes.php';
require __DIR__ . '/../lib/QueryHelpers.php';

$failures = 0;
$assertions = 0;

function check($description, $condition) {
    global $failures, $assertions;
    $assertions++;
    if ($condition) {
        echo "  PASS  $description\n";
    } else {
        echo "  FAIL  $description\n";
        $failures++;
    }
}

echo "TicketCodes\n";
$codes = array('123', '456', '789');
check('accepts a known code', isValidTicketCode('123', $codes) === true);
check('accepts a known code passed as int', isValidTicketCode(456, $codes) === true);
check('rejects an unknown code', isValidTicketCode('000', $codes) === false);
check('rejects an empty code', isValidTicketCode('', $codes) === false);

$tmpFile = tempnam(sys_get_temp_dir(), 'codes');
file_put_contents($tmpFile, json_encode(array('111', '222')));
$loaded = loadTicketCodes($tmpFile);
check('loads a JSON codes file into an array', $loaded === array('111', '222'));
unlink($tmpFile);
check('missing codes file loads as an empty array', loadTicketCodes('/no/such/file.json') === array());

echo "\nQueryHelpers\n";
check('builds one placeholder', buildInPlaceholders(1) === '?');
check('builds three placeholders', buildInPlaceholders(3) === '?, ?, ?');
check('builds zero placeholders as an empty string', buildInPlaceholders(0) === '');

echo "\n$assertions assertions, $failures failure(s)\n";
exit($failures > 0 ? 1 : 0);
