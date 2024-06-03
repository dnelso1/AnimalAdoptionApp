import axios from "axios";

function Logout() {
    axios.post("http://localhost:80/php/logout.php").then((response) => {
        sessionStorage.clear();
        window.location.href = "/login";
    })
    .catch((err) => {
        console.log(err); 
    })
}

export default Logout;