//import { Card } from "antd";
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { Rate } from 'antd';
import Button from 'react-bootstrap/Button';
import { AiFillPhone, AiOutlineBulb } from "react-icons/ai";
import { MdAttachMoney, MdEditNote } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";
import axios from "axios";

const Receiver = (props) => {
    const { worker_id, fullname, username, email, comment, deal_price, phone, status } = props.receiver;
    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    const [receiverStatus, setReceiverStatus] = useState(status);
    const [isShow, setIsShow] = useState(true);

    let headers = {
        'Authorization': "Bearer " + props.authenticated.token,
        'Content-Type': 'application/json'
    };
    const acceptJob = async (workerId) => {
        const body = { worker_id: workerId };
        await axios.post(base_url + "/job/assignJob/" + props.job.id, body, { headers })
            .then(res => res.data)
            .then(data => {
                if (data.code == 200) {
                    setReceiverStatus("ACCEPTED");
                    props.handleAcceptJob();
                }
            }).catch(err => { throw Error(err) });
    }
    const rejectJob = async (workerId, e) => {
        const body = { worker_id: workerId };
        console.log(body);
        await axios.post(base_url + "/job/rejectJob/" + props.job.id, body, { headers })
            .then(res => res.data)
            .then(data => {
                if (data.code == 200) {
                   setIsShow(false);
                }
            }).catch(err => { throw Error(err) });
    }
    return (
        <>
            {
                isShow ? <Card style={{ width: "100%" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <div className='d-flex'>
                            <img src='https://bootdey.com/img/Content/avatar/avatar7.png' width="16%" height="20%" alt="user image" />
                            <div style={{marginLeft: "16px"}}>
                                <div 
                                    style={{
                                        marginBottom: "-10px", 
                                        fontSize: "30px"
                                    }}>
                                    {fullname}
                                </div>
                                <Rate disabled allowHalf defaultValue={4.5} />
                                <FaCommentDots style={{marginLeft: "16px"}}/> 6
                                <BsCheck2Circle style={{marginLeft: "16px"}}/> 98%
                            </div>
                        </div>
                        <div style={{marginLeft: "16px", marginTop: "8px"}}>
                            <p><AiFillPhone style={{marginBottom: "4px", fontSize: "16px"}}/>SĐT: {phone}</p>
                            <p><MdAttachMoney style={{marginBottom: "4px", fontSize: "16px"}}/>Lương mong muốn: {deal_price} vnd</p>
                            <p><MdEditNote style={{marginBottom: "4px", fontSize: "16px"}}/>Chú thích: {comment}</p>
                            <p><AiOutlineBulb style={{marginBottom: "4px", fontSize: "16px"}}/>{receiverStatus}</p>
                        </div>
                    </Card.Body>
                    <Card.Footer style={{marginLeft: "16px"}}>
                        {
                            receiverStatus == "ACCEPTED" ? <Button
                                variant="success" disabled>Accept</Button> :
                                <>
                                    <Button onClick={() => acceptJob(worker_id)}
                                        variant="success">Accept</Button>&nbsp; &nbsp;
                                    <Button onClick={(e) => rejectJob(worker_id, e)}
                                        variant="danger">Reject</Button>
                                </>
                        }


                    </Card.Footer>
                </Card > : null
            }
        </>
    )
}

export default React.memo(Receiver);