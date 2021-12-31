//import { Card } from "antd";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
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
        console.log(body);
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
        <div>
            {
                isShow ? <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>{username}</Card.Title>
                        <Card.Text>
                            <p>Sdt: {phone}</p>
                        </Card.Text>
                        <Card.Text>
                            <p>{deal_price} vnd</p>
                        </Card.Text>
                        <Card.Text>
                            <p>{comment}</p>
                        </Card.Text>
                        

                        <Card.Text>
                            <p>{receiverStatus}</p>
                        </Card.Text>
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
        </div>
    )
}

export default React.memo(Receiver);