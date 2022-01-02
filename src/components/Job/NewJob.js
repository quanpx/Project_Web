import React, { useState } from "react";
import { Form, Input, DatePicker, Modal, Button } from 'antd';

const NewJob = () => {
    // new job modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

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

    return(
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
                    <Form.Item name={['job', 'address']} label="Địa chỉ" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['job', 'salary']} label="Lương" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['job', 'due']} label="Ngày làm" rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name={['job', 'description']} label="Mô tả công việc" rules={[{ required: true }]}>
                        <Input />
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