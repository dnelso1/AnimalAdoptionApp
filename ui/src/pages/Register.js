import '../User.css';
import React from 'react';
import { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import axios from "axios";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event, input) => {
        switch(input){
            case "name":
                setName(event.target.value);
                break;
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
        event.preventDefault();
        if (name !== "" && email!== "" && password !== "") {
            //axios.post("https://php-api-425323.wl.r.appspot.com/register.php", {
            axios.post("http://localhost:80/php/register.php", {
                name: name,
                email: email,
                password: password
            }).then((response) => {
                if (response.data.message === 'You are now registered, please log in!') {
                    alert(response.data.message);
                    window.location.href = "/login";    
                } else if (response.data.message === "Failed to connect to database") {
                    alert(response.data.message);

                } else {
                    alert(response.data.errorMessage);
                    window.location.href = "/register";
                }
            })
            .catch((err) => {
                alert(err.message); 
            });
        } else {
            alert("Please fill out all required fields");
        };
    };
   
    return (
        <div className="background">
        <div className="signup">
            <h1 id="create-header"> Create an Account </h1>
            <form onSubmit={submitChange}>
                <div className="container">
                    <div className="user-info" id="name">
                        <IoPersonOutline className="icon"/> 
                        <input type="text" placeholder="Full Name" name="name" value={name} required
                        onChange={(event) => handleChange(event, "name")}
                        />
                    </div>

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
                    <button type="submit" id="createaccount" className="createbutton"> Register </button>
                </div>
                <div>
                    <a href="http://localhost:3000/login" className="redirect">Already have an account? Login here</a>
                </div>
                <div>
                    <a href="http://localhost:3000/" className="redirect">Go Back</a>
                </div>
            </form>

        </div>
        
    </div>
    );
}   
export default Register;