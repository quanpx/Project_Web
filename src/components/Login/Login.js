import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css";

export default function Login() {
    let history = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const setParams = (event) => {
        if(event.target.name === 'username'){
            setUserName(event.target.value);
        }
        console.log(username);
        if(event.target.name === 'password'){
            setPassword(event.target.value);
        }
        console.log(password);
    }

    const login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-type", "application/json");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        };

        fetch("", requestOptions)
            .then(response => {
                console.log(response);
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.status)
            })
            .then(result => {
                console.log(result);
                localStorage.setItem("accessToken", result.accessToken)
                history.push("/home")
            })
            .catch(error => {
                console.log('error', error);
                alert("Username or Password is wrong!");
            })
    }

    return(
        <div className="login">
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><label className="username">Username:</label></td>
                            <td><input type="text" name="username" onChange={setParams} /></td>
                        </tr>
                        <tr>
                            <td><label className="password">Password:</label></td>
                            <td><input type="text" name="password" onChange={setParams} /></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                </div>
            </form>
        </div>
    )
}
