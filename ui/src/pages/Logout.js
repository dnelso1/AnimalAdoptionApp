import axios from "axios";

function Logout() {
    //axios.post("https://php-api-425323.wl.r.appspot.com/logout.php").then((response) => {
    axios.post("http://localhost:80/php/logout.php").then(() => {
        sessionStorage.clear();
        window.location.href = "/login";
    })
    .catch((err) => {
        alert(err.message); 
    })
}

export default Logout;