import React from "react";
import { Form, Input, InputNumber, Button, Select, notification, Space } from 'antd';
import { Container } from 'react-bootstrap';
import 'antd/dist/antd.css';
import "./Register.css";

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
    const onFinish = (values) => {
        console.log(values);
    };

    // register success
    const openNotificationWithIcon = type => {
        notification[type]({
          message: 'Register Success',
          description:
            ''
        });
    };

    return(
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
                    name={['user', 'bankname']}
                    label="Bank Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="vietinbank">Vietinbank</Select.Option>
                        <Select.Option value="vietcombank">Vietcombank</Select.Option>
                        <Select.Option value="agribank">Agribank</Select.Option>
                        <Select.Option value="bidv">BIDV</Select.Option>
                        <Select.Option value="vpbank">VPBank</Select.Option>
                        <Select.Option value="sacombank">Sacombank</Select.Option>
                        <Select.Option value="acb">ACB</Select.Option>
                        <Select.Option value="tpbank">TPBank</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name={['user', 'banknumber']}
                    label="Bank Number"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                    <Space>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="register-btn" 
                            // onClick={() => openNotificationWithIcon('success')}
                            // href="./login"    
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