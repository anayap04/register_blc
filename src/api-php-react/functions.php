<?php
function saveRegistry($save)
{
    $bd = getConnection();
    $sentencia = $bd->prepare("INSERT INTO `registro` (`boleto`, `nombre`, `apellido`, `uid`, `evento`, `email`, `telefono`) VALUES VALUES (?, ?, ?, ?, ?, ?, ?)");
    return $sentencia->execute([$save->boleto, $save->nombre, $save->apellido, $save->uid, $save->evento,$save->email, $save->telefono]);
}

function getVars($key)
{
    if (defined("_ENV_CACHE")) {
        $vars = _ENV_CACHE;
    } else {
        $file = "env.php";
        if (!file_exists($file)) {
            throw new Exception("El archivo de las variables de entorno ($file) no existe. Favor de crearlo");
        }
        $vars = parse_ini_file($file);
        define("_ENV_CACHE", $vars);
    }
    if (isset($vars[$key])) {
        return $vars[$key];
    } else {
        throw new Exception("La clave especificada (" . $key . ") no existe en el archivo de las variables de entorno");
    }
}
function getConnection()
{
    $password = getVars("MYSQL_PASSWORD");
    $user = getVars("MYSQL_USER");
    $dbName = getVars("MYSQL_DATABASE_NAME");
    $database = new PDO('mysql:host=localhost;dbname=' . $dbName, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}