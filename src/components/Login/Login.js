import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const axios = require('axios')

export default function Login() {
    let history = useNavigate();

    let [logins,setLogins]=useState([]);
    const login = () => {


        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;


        var myHeaders = new Headers();
        myHeaders.append("Content-type", "application/json");

       
        const headers = {
           'Authorization': 'Bearer '+logins[0].token,
            'Content-Type':'application/json'
        };
        let body = { username, password };

        axios.post("http://localhost:8080/api/v1/login", body)
            .then(res => setLogins(res.data.data));
        
    }

    return (
        <div className="login">
            <form>
                <label className="username">Username:</label>
                <input type="text" id="username" name="username" />

                <label className="password">Password:</label>
                <input type="text" id="password" name="password" />
                <button type="button" className="btn btn-primary" onClick={login}>Login</button>
            </form >
        </div >
    )
}
