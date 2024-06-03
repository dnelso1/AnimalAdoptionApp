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
            $email = $data['email'];
            $password = $data['password'];

            if(!empty($email) && !is_numeric($email) && !empty($password))
            {
                # check to see that user exists in database
                $query = "SELECT * FROM user_information WHERE email = '$email' limit 1";
                $result = mysqli_query($con, $query); 
                if(mysqli_num_rows($result) == 1) {
                    $user_info = mysqli_fetch_assoc($result);
                    # password verification
                    if($password == $user_info['password']) {
                    //$hash_password = $user_info['password']
                    //if(password_verify($password, $hash_password)) {
                        $_SESSION['id'] = $user_info['id'];
                        $_SESSION['name'] = $user_info['full_name'];
                        $_SESSION['email'] = $user_info['email'];
                       // $session = $_SESSION['id'];
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
        }
        else {
            $errorMessage = 'Cannot access database';
            $response = array('errorMessage' => $errorMessage);
            echo json_encode($response);
            }
            
        
    };  
    
?>