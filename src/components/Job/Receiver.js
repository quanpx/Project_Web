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
    return(
        <div>
            <p>{worker_id}</p>
            <p>{username}</p>
            <p>{comment}</p>

            <button onClick={()=>rejectJob(worker_id)}>Reject</button>
            <button onClick={()=>acceptJob(worker_id)}>Accept</button>
        </div>
    )
}

export default React.memo(Receiver);