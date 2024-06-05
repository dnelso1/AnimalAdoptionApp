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

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        # receive the edited user information with old email and store intp PHP variables 
        $data = json_decode(file_get_contents('php://input'), true);
       
        $new_name = $data['name'];
        $new_email = $data['email'];
        $old_email = $data['old_email'];
        $new_password = $data['password'];
        $query = "SELECT * FROM user_information where email = '$new_email'";
        $result = mysqli_query($con, $query);
        
        # check to see that the new email does not already exist in the database 
        if($new_email != $old_email and mysqli_num_rows($result) > 0) {
            $errorMessage = 'This email is already registered';
            $response = array('errorMessage' => $errorMessage);
            echo json_encode($response);
        }
        # verify email format
        else if(is_numeric($new_email)) {
                $errorMessage = 'Your email is not valid';
                $response = array('errorMessage' => $errorMessage);
                echo json_encode($response);
        }

        # check for valid password length
        else if(!empty($new_password)) {
            if (strlen($new_password) < 8) {
                $errorMessage = 'Your password must be at least 8 characters long';
                $response = array('errorMessage' => $errorMessage);
                echo json_encode($response);
            }
            # edit user information if password was changed
            else {
                $query = "UPDATE user_information SET full_name = '$new_name', email = '$new_email', password = '$new_password' WHERE email = '$old_email'";
                mysqli_query($con, $query);
                $message = 'Your profile was updated!';
                $_SESSION['name'] = $new_name;
                $_SESSION['email'] = $new_email;
                $info = $_SESSION['name'];
                $detail = $_SESSION['email'];
                $response = array('message' => $message, 'info' => $info, 'detail' => $detail);
                echo json_encode($response);
            };
        # edit user information if password was not changed     
        }            
        else {
            $query = "UPDATE user_information SET full_name = '$new_name', email = '$new_email' WHERE email = '$old_email'";
            mysqli_query($con, $query);
            $message = 'Your profile was updated!';
            $_SESSION['name'] = $new_name;
            $_SESSION['email'] = $new_email;
            $info = $_SESSION['name'];
            $detail = $_SESSION['email'];
            $response = array('message' => $message, 'info' => $info, 'detail' => $detail);
            echo json_encode($response);
        }
    };

?>