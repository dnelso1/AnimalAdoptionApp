import '../User.css';
import React from 'react';
import { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import axios from "axios"

function Edit() {

    const loginStatus = sessionStorage.getItem("loginStatus");
    const emailObj = sessionStorage.getItem("emailObj");

    if (!loginStatus) {
        alert("Please log in");
        window.location.href = "/login";
    }

    const [new_name, setName] = useState('');
    const [new_email, setEmail] = useState('');
    const [new_password, setPassword] = useState('');

    const handleChange = (event, input) => {
        switch(input){
            case "new_name":
                setName(event.target.value);
                break;
            case "new_email":
                setEmail(event.target.value);
                break;
            case "new_password":
                setPassword(event.target.value);
                break;
            default:
        };
    };

    function submitChange(event) {
        event.preventDefault();
        if (new_name !== "" || new_email!== "" || new_password !== "") {
            //axios.post("https://php-api-425323.wl.r.appspot.com/edit.php", {
            axios.post("http://localhost:80/php/edit.php", {
                name: new_name,
                email: new_email,
                old_email: emailObj,
                password: new_password
            }).then((response) => {
                if (response.data.message === 'Your profile was updated!') {
                    sessionStorage.setItem("nameData", response.data.info);
                    sessionStorage.setItem("emailObj", response.data.detail);
                    alert(response.data.message);
                    window.location.href = "/index";    
                } else {
                    alert(response.data.errorMessage);
                    window.location.href = "/edit";
                }
            })
        };
    };

    function deleteUser(event) {
        event.preventDefault();
        axios.post("http://localhost:80/php/delete.php", {
        //axios.post("https://php-api-425323.wl.r.appspot.com/delete.php", {
            email: emailObj
        }).then((response) => {
            if (response.data.message === 'Your profile was deleted!') {
                sessionStorage.clear();
                alert(response.data.message);
                window.location.href = "/";
            }           
        })
    };

    return (
        <div class="background">
        <div class="signup">
            <h1 id="create-header"> Edit Profile </h1>
            <form>
                <div class="container">
                    <div class="user-info" id="new_name">
                        <IoPersonOutline className="icon"/>
                        <input type="text" name="new_name" placeholder="Enter new name" required
                        onChange={(event) => handleChange(event, "new_name")}
                        />
                    </div>

                    <div class="user-info" id="new_email">
                        <CiMail className="icon"/> 
                        <input type="email" name="new_email" placeholder="Enter new email" required
                        onChange={(event) => handleChange(event, "new_email")}
                        /> 
                     
                    </div>

                    <div class="user-info" id="new_password">
                        <CiLock className="icon"/>  
                        <input type="password" name="new_password" placeholder="Enter new password" 
                        onChange={(event) => handleChange(event, "new_password")}
                        />
                    
                    </div>
                </div>
                <div class="button-container">
                    <button type="submit" id="updateaccount" name="updateaccount" class="createbutton"
                    onClick={submitChange}>Update</button>
                </div>
                <div class="button-container">
                    <button type="submit" id="deleteaccount" name="deleteaccount" class="createbutton" 
                    onClick={deleteUser}>Delete Profile</button>
                </div>
                <div>
                    <a href="/index" class="redirect">Cancel</a>
                </div>
            </form>
        </div>     
    </div>
    );
}
    
export default Edit;

