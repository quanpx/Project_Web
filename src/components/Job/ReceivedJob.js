import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { GiPositionMarker } from "react-icons/gi";
import { AiOutlineBulb } from "react-icons/ai";
import { MdAttachMoney, MdEditNote, MdDateRange } from "react-icons/md";
import { notification } from "antd";
import convertToVNese from "../../utils/convertToVNese";
import NumberFormat from "react-number-format";
import dateFormat from "dateformat";
const ReceivedJob = (props) => {

    const [status, setStatus] = useState(props.job.status);
    const [requestStatus, setRequestStatus] = useState(props.job.request_status)
    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    let headers = {
        'Authorization': "Bearer " + props.authenticated.token,
        'Content-Type': 'application/json'
    };

    const completeJob = async (id) => {
        await axios.get(base_url + "/job/completeJob/" + id, { headers })
            .then(res => res.data)
            .then(data => {
                if (data.code == 200) {
                    openNotificationSuccess("Completed Job!");
                    setStatus("COMPLETED")
                    setRequestStatus("COMPLETED");
                }
            })
    }
    const openNotificationSuccess = message => {
        notification.success({
            message: message,
            duration: 3
        });
    };

    return (
        <Card className="card-active" style={{width: "100%", marginBottom: "12px", height: "304px"}}>
            <Card.Body>
                <Card.Title>{props.job.name}</Card.Title>
                <Card.Text>
                    <p><GiPositionMarker style={{marginBottom: "4px", fontSize: "16px"}}/>Địa điểm: {props.job.address}<br /></p>
                    <p><MdAttachMoney style={{marginBottom: "4px", fontSize: "16px"}}/>
                        Lương: <NumberFormat value={props.job.salary} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} /><br />
                    </p>
                    <p><MdDateRange style={{marginBottom: "4px", fontSize: "16px"}}/>Ngày làm: {dateFormat(props.job.due, "dd/mm/yyyy")}<br /></p>
                    <p><MdEditNote style={{marginBottom: "4px", fontSize: "16px"}}/>Mô tả công việc: {props.job.description}<br /></p>
                    <p><AiOutlineBulb style={{marginBottom: "4px", fontSize: "16px"}}/>Trạng thái: {status}</p>
                </Card.Text>
                {

                    requestStatus === "COMPLETED" ? <Button disabled variant="success">Completed</Button> :
                        requestStatus === "ACCEPTED" ?
                            <Button onClick={() => completeJob(props.job.id)} variant="success">Complete</Button> :
                            requestStatus === "REQUESTING" ? convertToVNese(requestStatus) : convertToVNese(requestStatus)
                }
            </Card.Body>
        </Card >
    )
}

export default React.memo(ReceivedJob);