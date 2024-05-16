<?php
    session_start();
    include("db.php");
    
    # check to see if session ID is set, else redirect to login page
    if (!isset($_SESSION['id']))
    {
        header("Location:login.php");
    }

    # fetch user data from database
    $id = $_SESSION['id'];
    $query = "SELECT * FROM user_information WHERE id = '$id'";
    $result = mysqli_query($con, $query);
    if(mysqli_num_rows($result) == 1)
    {
        while ($user_info = mysqli_fetch_assoc($result))
        {
            $user_name = $user_info['full_name'];
            $user_email = $user_info['email'];     
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
            <h1 id="create-header"> Welcome <?php echo $user_name; ?></h1>
                <div class="container">
                    <div>
                        <a href="edit_profile.php" class="editbutton" id="editbutton">Edit Profile</a>
                    </div>
                    <div>
                        <a href="logout.php" class="logoutbutton">Logout</a>
                    </div>
                </div>

        </div> 
    </div>
   
</body>
</html>


