import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Button, Card,Spinner, Modal } from 'react-bootstrap';
import PageContent from "../PageContent/PageContent";
import { AiOutlineBulb } from "react-icons/ai";
import { MdAttachMoney, MdDateRange } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import NumberFormat from "react-number-format";
import convertToVNese from "../../utils/convertToVNese";
import { useNavigate } from "react-router-dom";
import { Form, Input, InputNumber,notification } from 'antd';
import "./JobDetail.css";
import axios from "axios";

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // get products
    const [Items, setItems] = useState([]);
    const [job, setJob] = useState({});
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const [relate, setRelate] = useState(null);
    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    useEffect(async () => {
        await axios.get(base_url + "/job")
            .then(res => res.data)
            .then(data => {
                setItems(data.data);
                setRelate(data.data.slice(0, 3));
            });
        await axios.get(base_url + "/job/detail/" + id)
            .then(res => res.data)
            .then(data => {
                setJob(data.data);

            });
    }, [authenticated]);

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

    // job detail content
    const jobDetailContent = {
        img: "https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        line1: "Job detail",
        line2: "Job detail",
        line3: "Job detail",
        line4: "Job detail",
    }

    return (
        <>
            <PageContent content={jobDetailContent} />
            <Container className="job-detail">
                <div className="row">
                    <Button className="ant-btn" onClick={() => navigate("/job")} style={{width: "74px", marginBottom: "40px"}}>Trở về</Button>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <img src={job.image_url} alt="job-image" className="job-img"></img>
                    </div>
                    <div className="col-lg-6 job-content">
                        <h1>
                            {job.name}
                            <div className="job-status">
                                ({job.status})
                            </div>
                        </h1>
                        <h1>Lương: <NumberFormat value={job.salary} displayType={'text'} thousandSeparator={true} suffix={' VND'} /></h1>
                        <table className="align-items-start">
                            <tr>
                                <td width="30%"><b>Chi tiết công việc</b></td>
                                <td>: {job.description}. {job.job_detail}</td>
                            </tr>
                            <tr>
                                <td><b>Ngày làm việc</b></td>
                                <td>: {job.due}</td>
                            </tr>
                            <tr>
                                <td><b>Địa điểm làm việc</b></td>
                                <td>: {job.address}</td>
                            </tr>
                            <tr>
                                <td><b>Liên hệ</b></td>
                                <td>: {job.contact}.  Số điện thoại: {job.contact_number}</td>
                            </tr>
                        </table>
                        {
                            job.status == "PENDING" || job.status == "COMPLETED" ?
                                <Button className="getJob-btn ant-btn" disabled>Nhận việc</Button> :
                                <Button className="getJob-btn ant-btn" onClick={(e) => clickHandler(e, job.id)}>Nhận việc</Button>
                        }
                        <Modal show={activeModal === job.id} onHide={handleClose} centered>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Nhận việc</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form {...layout}>
                                                            <Form.Item name={['user', 'salary']} label="Lương mong muốn" rules={[{ type: 'number', min: 100000, max: 10000000 }]}>
                                                                <InputNumber step={100000} id={`user_salary${job.id}`} />
                                                            </Form.Item>
                                                            <Form.Item name={['user', 'note']} label="Yêu cầu">
                                                                <Input.TextArea id={`user_note${job.id}`} />
                                                            </Form.Item>
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button className="ant-btn" style={{height: "36px"}} onClick={() => handleGetjob(job.id, job.username)}>
                                                            Nhận việc
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                    </div>
                </div>
                {
                    relate != null ?
                        <div className="row">
                            <h1 className="text-center mt-4">Các công việc liên quan</h1>
                            <div className="list-jobs row justify-content-center align-items-center">
                                {
                                    relate.map((element, index) => {
                                        console.log("element " + element)
                                        return (
                                            <div className="col-sm-6 col-md-6 col-lg-4" key={index} data-aos="zoom-in-up">
                                                <Card className="card-active">
                                                    <Card.Img className="mx-auto" src={element.image_url} />
                                                    <Card.Body>
                                                        <Card.Title>{element.name}</Card.Title>
                                                        <Card.Text>
                                                            <GiPositionMarker style={{marginBottom: "4px", fontSize: "16px"}}/>Địa điểm: {element.address}<br />
                                                            <MdAttachMoney style={{marginBottom: "4px", fontSize: "16px"}}/>Lương: <NumberFormat value={element.salary} displayType={'text'} thousandSeparator={true} suffix={' VND'}/><br />
                                                            <MdDateRange style={{marginBottom: "4px", fontSize: "16px"}}/>Ngày làm: {element.due}<br />
                                                            <AiOutlineBulb style={{marginBottom: "4px", fontSize: "16px"}}/>Trạng thái: {convertToVNese(element.status)}
                                                        </Card.Text>
                                                        <Button className="detail-btn ant-btn" href={`./${element.id}`}>Chi tiết</Button>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : <Spinner animation="border" role="status" variant="success">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>

                }
            </Container>
        </>
    )
}

export default React.memo(JobDetail);