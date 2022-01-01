import React, { useState, useEffect } from "react";
import { Container, Card, Modal, Button } from 'react-bootstrap';
import { Form, Input, InputNumber } from 'antd';
import "./Job.css";
import axios from "axios";
import PageContent from "../PageContent/PageContent";


function Job() {
    // list jobs
    const [Items, setItems] = useState([]);
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    useEffect(async () => {
        await axios.get(base_url + "/job")
            .then(res => res.data)
            .then(data => {
                setItems(data.data);
            });
    }, []);

    //get job pop up
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setActiveModal(null);
    }

    const handleGetjob = async (id) => {
        handleClose();
        let headers = {
            'Authorization': 'Bearer ' + authenticated.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const user_salary = document.getElementById(`user_salary${id}`).value;
        const user_note = document.getElementById(`user_note${id}`).value
        let body = {
            deal_price: user_salary,
            comment: user_note
        }
        await axios.post(base_url + "/job/receiveJob/" + id,
            body,
            { headers }
        )
            .then(res => console.log(res));
    }

    const [activeModal, setActiveModal] = useState(null);
    const clickHandler = (e, index) => {
        setActiveModal(index);
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    // job content
    const jobContent = {
        img: "https://i.rada.vn/data/image/2020/05/15/Farming-Village-Story-nong-trai.jpg",
        line1: "Job",
        line2: "Job nè",
        line3: "Job nữa nè",
        line4: "Job tiếp nè"
    }

    return (
        <>
            <PageContent content={jobContent} />
            <Container>
                <div className="jobs-content">
                    <div className="list-jobs row justify-content-center align-items-center">
                        {
                            Items.map((element, index) => {
                                return (
                                    <div className="col-sm-6 col-md-4" key={index} data-aos="zoom-in-up">
                                        <Card className="card-active">
                                            <Card.Img variant="top" src={element.image_url} />
                                            <Card.Body>
                                                <Card.Title>{element.name}</Card.Title>
                                                <Card.Text>
                                                    {element.address}<br />
                                                    {element.salary}<br />
                                                    {element.due}<br />
                                                    {element.status}
                                                </Card.Text>
                                                <Button className="detail-btn" href={`./job-detail/${element.id}`}>Chi tiết</Button>
                                                {
                                                    element.status == "PENDING" || element.status=="COMPLETED" ? <Button className="getJob-btn" disabled>Nhận việc</Button> :
                                                        <Button className="getJob-btn" onClick={(e) => clickHandler(e, index)}>Nhận việc</Button>
                                                }

                                                <Modal show={activeModal === index} onHide={handleClose} centered>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Nhận việc</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form {...layout}>
                                                            <Form.Item name={['user', 'salary']} label="Lương mong muốn" rules={[{ type: 'number', min: 100000, max: 10000000 }]}>
                                                                <InputNumber step={100000} id={`user_salary${element.id}`} />
                                                            </Form.Item>
                                                            <Form.Item name={['user', 'note']} label="Yêu cầu">
                                                                <Input.TextArea id={`user_note${element.id}`} />
                                                            </Form.Item>
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={() => handleGetjob(element.id)}>
                                                            Nhận việc
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </>
    )
};

export default React.memo(Job);