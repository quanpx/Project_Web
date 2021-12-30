import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { Container } from 'react-bootstrap';
import 'antd/dist/antd.css';
import "./Login.css";
import Register from "../Register/Register";

const axios = require('axios');

const Login = () => {
    // let [logins,setLogins]=useState([]);
    // const login = () => {
    //     var username = document.getElementById("username").value;
    //     var password = document.getElementById("password").value;


    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-type", "application/json");

       
    //     const headers = {
    //        'Authorization': 'Bearer '+logins[0].token,
    //         'Content-Type':'application/json'
    //     };
    //     let body = { username, password };

    //     axios.post("http://localhost:8080/api/v1/login", body)
    //         .then(res => setLogins(res.data.data));   
    // }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Container className="login ">
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="login-form "
            >
                <div className="row text-center justify-content-center login-title">LOGIN</div>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                    offset: 6,
                    span: 14,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            
                <Form.Item
                    wrapperCol={{
                    offset: 6,
                    span: 14,
                    }}
                >
                    <Button type="primary" htmlType="submit" className="login-btn">
                        Login
                    </Button>
                    <Button type="primary" className="register-btn" href="./register">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    );
}

export default React.memo(Login)