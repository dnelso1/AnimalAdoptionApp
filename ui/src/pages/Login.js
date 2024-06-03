import '../User.css';
import React from 'react';
import { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import axios from "axios"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleChange = (event, input) => {
        switch(input){
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            default:
        };
    };

    function submitChange(event) {
        event.preventDefault()
        if (email!== "" && password !== "") {
            axios.post("http://localhost:80/php/login.php", {
                email: email,
                password: password
            }).then((response) => {
                //console.log(response);
                if (response.data.message === 'You are logged in') {
                    sessionStorage.setItem("loginStatus", true);
                    sessionStorage.setItem("nameData", JSON.stringify(response.data.info));
                    sessionStorage.setItem("emailData", JSON.stringify(response.data.detail));
                    sessionStorage.setItem("emailObj", response.data.detail);
                    alert(response.data.message);
                    window.location.href = "/index";    
                } else if (response.data.message === "Failed to connect to database") {
                    alert(response.data.message);
                    window.location.href = "/login";  

                } else {
                    alert(response.data.errorMessage);
                    window.location.href = "/login";
                }
            })
            .catch((err) => {
                console.log(err); 
            });
        } else {
            alert("Both email and password is required");
        };
    };
    return (
        <div className="background">
        <div className="signup">
            <h1 id="create-header"> Login </h1>
            <form onSubmit={submitChange}>
                <div className="container">
                
                    <div className="user-info" id="email">
                        <CiMail className="icon"/>
                        <input type="email" placeholder="Email" name="email" value={email} required
                        onChange={(event) => handleChange(event, "email")}
                        />
                    </div>

                    <div className="user-info" id="password">
                        <CiLock className="icon"/>  
                        <input type="password" placeholder="Password" name="password" value={password} required
                        onChange={(event) => handleChange(event, "password")}
                        />
                    </div>
                </div>
                <div className="button-container">
                    <button type="submit" id="createaccount" className="createbutton"> Login </button>
                </div>
                <div>
                    <a href="http://localhost:3000/register" className="redirect">Don't have an account? Register here</a>
                </div>
            </form>

        </div>       
    </div>

    );
}
    
export default Login;
    