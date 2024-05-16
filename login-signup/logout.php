<?php
# starts the session if session id is not set 
    if (!isset($_SESSION['id']))
    {
        session_start();
    }
    session_unset();
    session_destroy();
    header("Location:login.php");

?>
