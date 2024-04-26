<?php
    session_start();
    include("db.php");
    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $full_name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        if(!empty($email) && !is_numeric($email) && !empty($password))
        {
            $query = "insert into user_information (full_name, email, password) values ('$full_name', '$email', '$password')";
            mysqli_query($con, $query);
            echo '<script>alert("You are now registered!")</script>';
            
        }
        else
        {
            echo '<script>alert("Your email and/or password is not valid")</script>';
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
