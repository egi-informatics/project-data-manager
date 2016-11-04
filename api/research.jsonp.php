<?php

$current = getcwd();
$data = file_get_contents($current . "/research.json");

$data = str_replace("\xe2\x80\xa8", '\\u2028', $data);
$data = str_replace("\xe2\x80\xa9", '\\u2029', $data);

header('Content-Type: application/json');

$function_name = $_GET['callback'];
echo "$function_name($data);";

?>
