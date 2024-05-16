<?php

    session_start();
    include("db.php");

    # check if user is already logged in
    if (isset($_SESSION['id'])) {
        header("Location:index.php");
    }

    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $email = $_POST['email'];
        $password = $_POST['password'];

        if(!empty($email) && !is_numeric($email) && !empty($password))
        {
            # check to see that user exists in database
            $query = "SELECT * FROM user_information WHERE email = '$email' limit 1";
            $result = mysqli_query($con, $query); 
            if(mysqli_num_rows($result) == 1)
            {
                while ($user_info = mysqli_fetch_assoc($result)) {
                # password verification
                    if(password_verify($password, $user_info['password'])) {
                        $_SESSION['id'] = $user_info['id'];
                        header("Location: index.php");
                        die;
                    }
                    else
                    {
                        echo '<script>alert("Your email and/or password is incorrect")</script>';
                    }
                }
            }
            else
            {
                echo '<script>alert("User not found")</script>';
            }  
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
            <h1 id="create-header"> Login </h1>
            <form method="POST">
                <!--link: https://www.w3schools.com/icons/ -->
                <div class="container">
                
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
                    <button type="submit" id="createaccount" class="createbutton"> Login </button>
                </div>
                <div>
                    <a href="register.php" class="redirect">Don't have an account? Register here</a>
                </div>
            </form>

        </div>       
    </div>
    
</body>
</html>
