<?php
session_start();
include("db.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!empty($email) && !is_numeric($email) && !empty($password)) {
        $query = "select * from user_information where email = '$email' limit 1";
        $result = mysqli_query($con, $query);
        if ($result) {
            if (mysqli_num_rows($result) == 1) {
                $user_info = mysqli_fetch_assoc($result);
                if ($user_info['password'] == $password) {
                    header("location: index.php");
                    die;
                }
            }
        }
        echo '<script>alert("Your email and/or password is not correct")</script>';
    } else {
        echo '<script>alert("Your email and/or password is not correct")</script>';
    }
}
?>
