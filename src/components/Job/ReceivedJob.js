import axios from "axios";
import React, { useEffect, useState } from "react";
import {  Card ,Button} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { notification } from "antd";

const ReceivedJob = (props) => {

    const [status,setStatus]=useState(props.job.status);

     const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    let headers = {
        'Authorization': "Bearer " + props.authenticated.token,
        'Content-Type': 'application/json'
    };



    const completeJob = async (id)=>
    {
        await axios.get(base_url+"/job/completeJob/"+id,{headers})
                    .then(res=>res.data)
                    .then(data=>{
                        if(data.code==200)
                        {
                            openNotificationSuccess("Completed Job!");
                            setStatus("COMPLETED")
                        }
                    })
    }
   const openNotificationSuccess = message => {
        notification.success({
            message: message,
            duration:3
        });
    };

    
    return (
        <Card className="card-active">

            <Card.Body>
                <Card.Title>{props.job.name}</Card.Title>
                <Card.Text>
                    {props.job.address}<br />
                    {props.job.salary}<br />
                    {props.job.due}<br />
                    {props.job.description}<br />
                    {status}
                </Card.Text>
                {
                    status=="COMPLETED"? <Button disabled variant="success">Complete</Button>:
                     <Button onClick={() => completeJob(props.job.id)} variant="success">Complete</Button>
                }
               
            </Card.Body>

        </Card >
    )
}

export default React.memo(ReceivedJob);