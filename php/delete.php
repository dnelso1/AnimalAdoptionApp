<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 
header('Access-Control-Allow-Methods: GET, POST'); 
header("Content-Type: application/json; charset=UTF-8");

    session_start();
    $con = mysqli_connect("userdatabase.ct2c0caskx3g.us-west-1.rds.amazonaws.com:3306", "databasemaster", "dbpassword2024", "userdata");

    # receive user email sent with axios 
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];

    # delete user with the associated email from the database
    $query = "DELETE FROM user_information WHERE email = '$email'";
    $result = mysqli_query($con, $query);
    # Remove all session variables and destroy session
    session_unset();
    session_destroy();
    $message = "Your profile was deleted!";
    $response = array('message' => $message);
    echo json_encode($response);
?>