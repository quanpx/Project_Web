import React, { useState, useEffect } from "react";
import { Container, Card, Modal, Button } from 'react-bootstrap';
import { Form, Input, InputNumber, notification } from 'antd';
import { AiOutlineBulb } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { MdAttachMoney, MdDateRange } from "react-icons/md";
import "./Job.css";
import PageContent from "../PageContent/PageContent";
import convertToVNese from "../../utils/convertToVNese";
import NumberFormat from "react-number-format";

import "./Job.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Job() {
    // list jobs
    const [Items, setItems] = useState([]);
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const navigate = useNavigate();

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
    const openNotificationWarning = (message) => {
        notification.warning({
            message: message,
            duration: 3
        });
    }

    const openNotificationSuccess = (message) => {
        notification.success({
            message: message,
            duration: 2
        });
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
            .then(res => {
                if (res.data.code == 200) {
                    openNotificationSuccess("Đã gửi yêu cầu nhận việc !");
                }
            }).catch(err => openNotificationWarning(err.message));
    }

    console.log(Items);
    const [activeModal, setActiveModal] = useState(null);
    const clickHandler = (e, index) => {
        if(authenticated==null)
        {
            openNotificationWarning("Bạn cần đăng nhập trước!");
            navigate("/login");
        }else
        {
            setActiveModal(index);
        }
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    // Search
    const { Search } = Input;
    const [filterData, setFilterData] = useState([]);

    const searchJob = (event) => {
        setFilterData(event.target.value);
    }
    let dataSearch = Items.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filterData.toString().toLowerCase())
        )
    })

    // job content
    const jobContent = {
        img: "https://images.unsplash.com/photo-1601737786679-f6883570cfb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        line2: "Công việc",
        line3: "Happy Farmer",
        line4: "Mang hạnh phúc đến mọi người!"
    }

    return (
        <>
            <PageContent content={jobContent} />
            <Container>
                <div className="search col-4 mx-auto mb-2">
                    <Search
                        type="text"
                        placeholder="Search for..."
                        // enterButton 
                        value={filterData}
                        onChange={searchJob}
                    />
                </div>

                <div className="jobs-content">
                    <div className="list-jobs row justify-content-center align-items-center">
                        {
                            dataSearch.map((element, index) => {
                                return (
                                    <div key={index} className="col-sm-6 col-md-6 col-lg-4" key={index} data-aos="zoom-in-up">
                                        <Card className="card-active">
                                            <Card.Img className="mx-auto" src={element.image_url} />
                                            <Card.Body>
                                                <Card.Title>{element.name}</Card.Title>
                                                <Card.Text>
                                                    <GiPositionMarker style={{ marginBottom: "4px", fontSize: "16px" }} />Địa điểm: {element.address}<br />
                                                    <MdAttachMoney style={{ marginBottom: "4px", fontSize: "16px" }} />Lương: <NumberFormat value={element.salary} displayType={'text'} thousandSeparator={true} suffix={' VND'} /><br />
                                                    <MdDateRange style={{ marginBottom: "4px", fontSize: "16px" }} />Ngày làm: {element.due}<br />
                                                    <AiOutlineBulb style={{ marginBottom: "4px", fontSize: "16px" }} />Trạng thái: {convertToVNese(element.status)}
                                                </Card.Text>
                                                <Button className="detail-btn ant-btn" href={`./job-detail/${element.id}`}>Chi tiết</Button>
                                                {
                                                    authenticated != null && element.username === authenticated.user.username ?
                                                        <p style={{ color: "#82ae46", marginTop: "8px" }}> Công việc bạn tạo </p> :
                                                        element.status == "PENDING" || element.status == "COMPLETED" ? <Button className="getJob-btn ant-btn" disabled>Nhận việc</Button> :
                                                            <Button className="getJob-btn ant-btn" onClick={(e) => clickHandler(e, index)}>Nhận việc</Button>
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
                                                        <Button className="ant-btn" style={{height: "36px"}} onClick={() => handleGetjob(element.id, element.username)}>
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