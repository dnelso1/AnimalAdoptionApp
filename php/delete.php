<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 
header('Access-Control-Allow-Methods: GET, POST'); 
header("Content-Type: application/json; charset=UTF-8");

    session_start();
    $con = mysqli_connect("localhost", "root", "", "registration");

    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];

    $query = "DELETE FROM user_information WHERE email = '$email'";
    $result = mysqli_query($con, $query);
    session_unset();
    session_destroy();
    $message = "Your profile was deleted!";
    $response = array('message' => $message);
    echo json_encode($response);

?>