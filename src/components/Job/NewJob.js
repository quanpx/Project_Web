import React, { useState } from "react";
import { Form, Input, DatePicker, Modal, Button, InputNumber, notification } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";

const NewJob = ({ authenticated ,createdJobs,setCreateJobs}) => {
    // new job modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    let headers = {
        'Authorization': "Bearer " + authenticated.token,
        'Content-Type': 'application/json'
    };

    const handleOk = async () => {
        const name = document.getElementById("nest-messages_job_name").value;
        const address = document.getElementById("nest-messages_job_address").value;
        const salary = document.getElementById("nest-messages_job_salary").value;
        const due = document.getElementById("nest-messages_job_due").value;
        const description = document.getElementById("nest-messages_job_description").value;
        const image_url = document.getElementById("nest-messages_job_image").value;

        const body = { name, address, salary, due, description, image_url }
        await axios.post(base_url + "/job", body, { headers })
            .then(res => res.data)
            .then(data => {
                if (data.code == 200) {
                    setCreateJobs((prev)=>[...prev,data.data])
                    openNotificationSuccess(data.data.name);
                }
            }).catch(err => { throw Error(err) });
        setIsModalVisible(false);
    };
    const openNotificationSuccess = (name) => {
        notification.success({
            message: `Tạo viêc ${name} thành công!`,
            duration: 3
        });
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // new job form
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} is required!'
    };

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <>
            <Button className=" mb-4" onClick={showModal}>
                Tạo công việc
            </Button>
            <Modal
                title="Tạo công việc mới"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
            >
                <Form {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Form.Item name={['job', 'name']} label="Tên công việc" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['job', 'address']} label="Địa điểm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['job', 'salary']} label="Lương:" rules={[{ required: true, type: 'number', min: 0 }]}>
                        <InputNumber step={100000} />
                    </Form.Item>
                    <Form.Item name={['job', 'due']} label="Ngày làm" rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name={['job', 'description']} label="Mô tả công việc" rules={[{ required: true }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item name={['job', 'image']} label="Thêm ảnh" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default React.memo(NewJob)