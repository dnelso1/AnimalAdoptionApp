<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 
header('Access-Control-Allow-Methods: GET, POST'); 
header("Content-Type: application/json; charset=UTF-8");

    session_start();
    $con = mysqli_connect("localhost", "root", "", "registration");
    if (mysqli_connect_errno()) {
        $message = "Failed to connect to database";
        $response = array('message' => $message);
        echo json_encode($response);
        exit;
    }

    # check if user is already logged in
    if (isset($_SESSION['id'])) {
        header("Location:http://localhost:3000/index");
    }

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $data = json_decode(file_get_contents('php://input'), true);

        if($data) {
            $full_name = $data['name'];
            $email = $data['email'];
            $password = $data['password'];

            # hash the password before storing in database 
            #$hash_password = password_hash($password, PASSWORD_DEFAULT);

            # query to check if user is already registered in the database
            $query = "SELECT * FROM user_information where email = '$email'";
            $result = mysqli_query($con, $query);

            # check if email/password is valid and user is not already registered
            if(empty($email) || is_numeric($email)) {
                $errorMessage = 'Your email is not valid';
                $response = array('errorMessage' => $errorMessage);
                echo json_encode($response);
            }
            else if(empty($password) || strlen($password) < 8) {
                $errorMessage = 'Your password must be at least 8 characters long';
                $response = array('errorMessage' => $errorMessage);
                echo json_encode($response);
            }
            else if(mysqli_num_rows($result) > 0) {
                $errorMessage = 'This email is already registered';
                $response = array('errorMessage' => $errorMessage);
                echo json_encode($response);
            }
            # insert user data into database 
            else {
                $query = "INSERT INTO user_information (full_name, email, password) VALUES ('$full_name', '$email', '$password')";
                mysqli_query($con, $query);
                $message = 'You are now registered, please log in!';
                $response = array('message' => $message); //, 'info' => $info
                echo json_encode($response);
            }
        };
    };
?>