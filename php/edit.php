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
    };

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
     
        if($data) {
            $new_name = $data['name'];
            $new_email = $data['email'];
            $old_email = $data['old_email'];
            $new_password = $data['password'];
            
            $query = "SELECT * FROM user_information where email = '$new_email'";
            $result = mysqli_query($con, $query);
                
            if($new_email != $old_email and mysqli_num_rows($result) > 0) {
                $errorMessage = 'This email is already registered';
                $response = array('errorMessage' => $errorMessage);
                echo json_encode($response);
            }
                
            else if(is_numeric($new_email)) {
                    $errorMessage = 'Your email is not valid';
                    $response = array('errorMessage' => $errorMessage);
                    echo json_encode($response);
            }

            else if(!empty($new_password)) {
                if (strlen($new_password) < 8) {
                    $errorMessage = 'Your password must be at least 8 characters long';
                    $response = array('errorMessage' => $errorMessage);
                    echo json_encode($response);
                }
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
    };

?>