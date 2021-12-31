//import { Card } from "antd";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
const Receiver = (props) => {
    const { worker_id, username, comment, deal_price, phone, status } = props.receiver;
    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    let headers = {
        'Authorization': "Bearer " + props.authenticated.token,
        'Content-Type': 'application/json'
    };
    const acceptJob = async (workerId) => {
        const body = { worker_id: workerId };
        console.log(body);
        await axios.post(base_url + "/job/assignJob/" + props.job, body, { headers })
            .then(res => res.data)
            .then(data => {
                console.log(data.data)
            }).catch(err => { throw Error(err) });
    }
    const rejectJob = async (workerId) => {
        const body = { worker_id: workerId };
        console.log(body);
        await axios.post(base_url + "/job/rejectJob/" + props.job, body, { headers })
            .then(res => res.data)
            .then(data => {
                console.log(data.data)
            }).catch(err => { throw Error(err) });
    }
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    <p>{worker_id}</p>
                </Card.Text>
                <Card.Text>
                    <p>{username}</p>
                </Card.Text>
                <Card.Text>
                    <p>{comment}</p>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button onClick={() => acceptJob(worker_id)}
                    variant="primary">Accept</Button>
                <Button onClick={() => rejectJob(worker_id)}
                    variant="primary">Reject</Button>
            </Card.Footer>
        </Card >
    )
}

export default React.memo(Receiver);