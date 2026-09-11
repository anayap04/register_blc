<?php

/**
 * Builds a "?, ?, ?" placeholder list for a SQL IN (...) clause.
 */
function buildInPlaceholders($count) {
    if ($count < 1) {
        return '';
    }
    return implode(', ', array_fill(0, $count, '?'));
}
