import React, { useState } from "react";
import { Radio } from 'antd';

import { Form, Input, InputNumber, Button, Select, notification, Space } from 'antd';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import 'antd/dist/antd.css';
import "./Register.css";
import axios from "axios";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const Register = () => {

    const navigate = useNavigate()
    const [type,setType]=useState("");

    const onFinish = (values) => {
        console.log(values);
    };
    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    const headers = {
        'Content-Type': 'application/json',
        'Accept':'application/json'
    };

    const register = async () => {
        var name = document.getElementById("nest-messages_user_name").value;
        var username = document.getElementById("nest-messages_user_username").value;
        var password = document.getElementById("nest-messages_user_password").value;
        var email = document.getElementById("nest-messages_user_email").value;
        var address = document.getElementById("nest-messages_user_address").value;
        var phone = document.getElementById("nest-messages_user_phone").value;
        var age = document.getElementById("nest-messages_user_age").value;

        var body = { name, username, password, email, age, address, phone, type };
        console.log(body);

        await axios.post(base_url + "/register", body, { headers })
            .then(res => res.data)
            .then(() => { openNotificationWithIcon('success'); navigate("/login") })
            .catch(err => { throw new Error(err) });
    }
    // register success
    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Register Success',
            description:
                ''
        });
    };
    const onChange = e => {
    setType(e.target.value);
  };

    return (
        <Container className="register">
            <Form {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                className="register-form"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
            >
                <div className="row text-center justify-content-center register-title">Register</div>

                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['user', 'username']}
                    label="Username"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['user', 'password']}
                    label="Password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['user', 'address']}
                    label="Address"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'phone']}
                    label="Phone"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['user', 'age']}
                    label="Age"
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 99,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name={['user', 'type']}
                    label="User type"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Radio.Group onChange={onChange} value={type}>
                        <Radio value={"FARMER"}>FARMER</Radio>
                        <Radio value={"SOCIETY"}>SOCIETY</Radio>
                    </Radio.Group>
                </Form.Item>
                
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="register-btn"
                            // onClick={() => openNotificationWithIcon('success')}
                            // href="./login"  
                            onClick={register}
                        >
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Container>
    )
}

export default React.memo(Register);