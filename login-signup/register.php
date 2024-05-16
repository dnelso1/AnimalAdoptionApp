<?php

    session_start();
    include("db.php");

    # check if user is already logged in
    if (isset($_SESSION['id'])) {
        header("Location:index.php");
    }

    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $full_name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        # hash the password before storing in database 
        $password = password_hash($password, PASSWORD_DEFAULT);

        # query to check if user is already registered in the database
        $query = "SELECT * FROM user_information where email = '$email'";
        $result = mysqli_query($con, $query);

        # check if email/password is valid and user is not already registered
        if(empty($email) || is_numeric($email))
        {
            echo '<script>alert("Your email is not valid")</script>';
        }
        else if(empty($password) || strlen($password) < 8)
        {
            echo '<script>alert("Your password must be at least 8 characters long")</script>';

        }
        else if(mysqli_num_rows($result) > 0)
        {
            echo '<script>alert("This email is already registered")</script>';

        }
        # insert user data into database 
        else
        {
            $query = "INSERT INTO user_information (full_name, email, password) VALUES ('$full_name', '$email', '$password')";
            mysqli_query($con, $query);
            header("refresh:1;url=login.php"); 
            echo '<script>alert("You are now registered!")</script>';
            
        }
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetMatch</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
<body>
  
    
    <div class="background">
        <div class="signup">
            <h1 id="create-header"> Create an Account </h1>
            <form method="POST">
                <!--link: https://www.w3schools.com/icons/ -->
                <div class="container">
                    <div class="user-info" id="name">
                        <i class="material-icons">person</i>
                        <input type="text" placeholder="Full Name" name="name" required>
                    </div>

                    <div class="user-info" id="email">
                        <i class="material-icons">mail</i>
                        <input type="email" placeholder="Email" name="email" required>
                    </div>

                    <div class="user-info" id="password">
                        <i class="material-icons">lock</i>
                        <input type="password" placeholder="Password" name="password" required>
                    </div>
                </div>
                <div class="button-container">
                    <button type="submit" id="createaccount" class="createbutton"> Register </button>
                </div>
                <div>
                    <a href="login.php" class="redirect">Already have an account? Login here</a>
                </div>
            </form>

        </div>
        
    </div>
   
</body>
</html>
