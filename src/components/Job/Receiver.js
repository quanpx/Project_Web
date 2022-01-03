//import { Card } from "antd";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import React, { useState } from "react";
import { Container } from 'react-bootstrap';

const Receiver = (props) => {
    const { worker_id, name, username, email, comment, deal_price, phone, status } = props.receiver;
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
        <Container>
            {
                isShow ? <Card style={{ width: "100%" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <div className='d-flex'>
                            <img src='https://bootdey.com/img/Content/avatar/avatar7.png' width="12%" alt="user image" />
                            <Card.Title style={{marginTop: "12px", marginLeft: "12px", fontSize: "30px"}}>{username}</Card.Title>
                        </div>
                        <div style={{marginLeft: "16px", marginTop: "8px"}}>
                            <p>SĐT: {phone}</p>
                            <p>Lương mong muốn: {deal_price} vnd</p>
                            <p>Chú thích: {comment}</p>
                            <p>{receiverStatus}</p>
                        </div>
                    </Card.Body>
                    <Card.Footer>
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
        </Container>
    )
}

export default React.memo(Receiver);