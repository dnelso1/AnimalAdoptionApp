<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 
header('Access-Control-Allow-Methods: GET, POST'); 
header("Content-Type: application/json; charset=UTF-8");

# starts the session if session id is not set 
    if (!isset($_SESSION['id'])) {
        session_start();
    }
    session_unset();
    session_destroy();
    exit;

?>