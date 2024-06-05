<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 
header('Access-Control-Allow-Methods: GET, POST'); 
header("Content-Type: application/json; charset=UTF-8");
ini_set('allow_url_fopen', 1);

switch (@parse_url($_SERVER['REQUEST_URI'])['path']) {
    case '/login':
        require 'login.php';
        break;  
    case '/login.php':
        require 'login.php';
        break;

    case '/register':
        require 'register.php';
        break;
    case '/register.php':
        require 'register.php';
        break;

    case '/logout':
        require 'logout.php';
        break;
    case '/logout.php':
        require 'logout.php';
        break;

    case '/edit':
        require 'edit.php';
        break;
    case '/edit.php':
        require 'edit.php';
        break;

    case '/delete':
        require 'delete.php';
        break;
    case '/delete.php':
        require 'delete.php';
        break;
    default: 
}
?>