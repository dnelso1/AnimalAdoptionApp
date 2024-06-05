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
    };

    # extract JSON data from user input 
    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $data = json_decode(file_get_contents('php://input'), true);

        $full_name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];

        $query = "SELECT * FROM user_information where email = '$email'";
        $result = mysqli_query($con, $query);

        # check to see email field is not empty with correct email format
        if(empty($email) || is_numeric($email)) {
            $errorMessage = 'Your email is not valid';
            $response = array('errorMessage' => $errorMessage);
            echo json_encode($response);
        }
        # check to see is password is not empty and not less than 8 chars
        else if(empty($password) || strlen($password) < 8) {
            $errorMessage = 'Your password must be at least 8 characters long';
            $response = array('errorMessage' => $errorMessage);
            echo json_encode($response);
        }
        # check to see if email is already present in database 
        else if(mysqli_num_rows($result) > 0) {
            $errorMessage = 'This email is already registered';
            $response = array('errorMessage' => $errorMessage);
            echo json_encode($response);
        }
        else {
            $query = "INSERT INTO user_information (full_name, email, password) VALUES ('$full_name', '$email', '$password')";
            mysqli_query($con, $query);
            $message = 'You are now registered, please log in!';
            $response = array('message' => $message); 
            echo json_encode($response);
        }
    };
?>