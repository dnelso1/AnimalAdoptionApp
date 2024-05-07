<?php
session_start();
include("db.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $full_name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!empty($email) && !is_numeric($email) && !empty($password)) {
        $query = "insert into user_information (full_name, email, password) values ('$full_name', '$email', '$password')";
        mysqli_query($con, $query);
        echo '<script>alert("You are now registered!")</script>';
    } else {
        echo '<script>alert("Your email and/or password is not valid")</script>';
    }
}
?>
