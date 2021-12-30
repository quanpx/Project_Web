import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { Container } from 'react-bootstrap';
import 'antd/dist/antd.css';
import "./Login.css";
import Register from "../Register/Register";
import { Navigate, useNavigate } from "react-router-dom";
const axios = require('axios');

const Login = (props) => {

    const navigate = useNavigate();
    let [authenticated, setAuthenticated] = useState({});


    useEffect(() => {
        let authenticated = localStorage.getItem("authenticated");
        if (authenticated == null) {
            localStorage.setItem("authenticated", authenticated);
        }
    }, []);
    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1"

    const login = async () => {
        var username = document.getElementById("basic_username").value;
        var password = document.getElementById("basic_password").value;


        const headers = {
            'Content-Type': 'application/json'
        };
        let body = { username, password };

        await axios.post(base_url + "/login", body, headers)
            .then(res => res.data)
            .then(data => {
                setAuthenticated(data.data);
                localStorage.setItem("authenticated", JSON.stringify(data.data));
                props.action(data.data);
                navigate("/");
            })





    }

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
                    <Button type="primary" htmlType="submit" className="login-btn" onClick={login}>
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