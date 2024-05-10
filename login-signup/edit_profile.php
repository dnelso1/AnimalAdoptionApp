<?php
    session_start();
    include("db.php");
    
    # check to see if session ID is set, else redirect to login page
    if (!isset($_SESSION['id']))
    {
        header("Location:login.php");
    }

   # fetch user data from database, will need to be used for UPDATE functionality 
   $id = $_SESSION['id'];
   $query = "SELECT * FROM user_information WHERE id = '$id'";
   $result = mysqli_query($con, $query);
   if(mysqli_num_rows($result) == 1)
   {
       while ($user_info = mysqli_fetch_assoc($result))
       {
           $user_name = $user_info['full_name'];
           $user_email = $user_info['email'];
           $user_password = $user_info['password'];     
       }
   }

   if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        $new_name = $_POST['new_name'];
        $new_email = $_POST['new_email'];
        $new_password = $_POST['new_password'];
        
        $query = "UPDATE user_information SET full_name = '$new_name', email = '$new_email', password = '$new_password' WHERE id = '$id'";
        $result = mysqli_query($con, $query);
        header("refresh:1;url=index.php"); 
        echo '<script>alert("Your profile was updated!")</script>';
        
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
            <h1 id="create-header"> Edit Profile </h1>
            <form method="POST">
                <div class="container">
                    <div class="user-info" id="new_name">
                        <i class="material-icons">person</i>
                        <input type="text" value="<?php echo $user_name; ?>" name="new_name">
                    </div>

                    <div class="user-info" id="new_email">
                        <i class="material-icons">mail</i>
                        <input type="email" value="<?php echo $user_email; ?>" name="new_email">
                    </div>

                    <div class="user-info" id="new_password">
                        <i class="material-icons">lock</i>
                        <input type="password" value="<?php echo $user_password; ?>" name="new_password">
                    </div>
                </div>
                <div class="button-container">
                    <button type="submit" id="updateaccount" class="createbutton">Update</button>
                </div>
                <div>
                    <a href="index.php" class="redirect">Cancel</a>
                </div>
            </form>
        </div>

    </div> 



</body>
</html>