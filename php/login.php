<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 
header('Access-Control-Allow-Methods: GET, POST'); 
header("Content-Type: application/json; charset=UTF-8");

     # start user session, connect to database, check for db connection
    session_start();
    $con = mysqli_connect("userdatabase.ct2c0caskx3g.us-west-1.rds.amazonaws.com:3306", "databasemaster", "dbpassword2024", "userdata");
    if (mysqli_connect_errno()) {
        $message = "Failed to connect to database";
        $response = array('message' => $message);
        echo json_encode($response);
        exit;
    }
    
    # extract JSON data from user login input 
    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
        $email = $data['email'];
        $password = $data['password'];
    
        # check to see required information was not empty 
        if(!empty($email) && !is_numeric($email) && !empty($password)){
              
            $query = "SELECT * FROM user_information WHERE email = '$email' limit 1";
            $result = mysqli_query($con, $query); 
            # check to see if user has a profile associated in the database
            if(mysqli_num_rows($result) == 1) {
                $user_info = mysqli_fetch_assoc($result);
                if($password == $user_info['password']) {
                    # store user information into session storage
                    $_SESSION['id'] = $user_info['id'];
                    $_SESSION['name'] = $user_info['full_name'];
                    $_SESSION['email'] = $user_info['email'];
                    $info = $_SESSION['name'];
                    $detail = $_SESSION['email'];
                    $message = 'You are logged in';
                    $response = array('message' => $message, 'info' => $info, 'detail' => $detail);
                    echo json_encode($response);
                }
                else { 
                    $errorMessage = 'Your email and/or password is incorrect';
                    $response = array('errorMessage' => $errorMessage);
                    echo json_encode($response);      
                }
            }
            # send error message if user email did not exist in the database
            else {
                $errorMessage = 'User not found';
                $response = array('errorMessage' => $errorMessage);
                echo json_encode($response); 
            } 
        } 
        else {
            $errorMessage = 'Please fill out required fields';
            $response = array('errorMessage' => $errorMessage);
            echo json_encode($response);
        }             
    };   
?>