import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Spinner, Card } from "react-bootstrap";
import { GiPositionMarker } from "react-icons/gi";
import { AiOutlineBulb } from "react-icons/ai";
import { MdAttachMoney, MdEditNote, MdDateRange } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import Receiver from "./Receiver";
import NumberFormat from "react-number-format";

const CreatedJob = () => {
    const { id } = useParams();
    const nagative = useNavigate();

    const [job, setJob] = useState({});
    const [receivers, setReceivers] = useState(null)
    const [jobStatus, setJobStatus] = useState(null);
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    let headers = {
        'Authorization': "Bearer " + authenticated.token,
        'Content-Type': 'application/json'
    };


    useEffect(async () => {
        await axios.get(base_url + "/job/createdJob/" + id, { headers })
            .then(res => res.data)
            .then(data => {
                setJob(data.data.job);
                setReceivers(data.data.receivers);
                setJobStatus(data.data.job.status);

            }).catch(err => { throw Error(err) });
    }, []);

    const handleAcceptJob = () => {
        setJobStatus("PENDING");
    }
    return (
        <Container>
            {
                receivers != null ?
                    <div>
                        <div className="row" style={{margin: "4em 0"}}>
                            <div className="col-md-6">
                                <div type="button" className="ant-btn mb-4" onClick={() => nagative("/user/yourJobs")}>
                                    Trở về
                                </div>
                                <h1>Việc đã tạo</h1>
                                <div >
                                    <div>
                                        <Card className="card-active" style={{height: "374px", marginBottom: "12px" }}>

                                            <Card.Body>
                                                <Card.Title style={{fontSize: "30px", marginBottom: "25px"}}>{job.name}</Card.Title>
                                                <Card.Text>
                                                    <p><GiPositionMarker style={{marginBottom: "4px", fontSize: "16px"}}/>Địa điểm: {job.address}<br /></p>
                                                    <p><MdAttachMoney style={{marginBottom: "4px", fontSize: "16px"}}/>
                                                        Lương: <NumberFormat value={job.salary} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} /><br />
                                                    </p>
                                                    <p><MdDateRange style={{marginBottom: "4px", fontSize: "16px"}}/>Ngày làm: {job.due}<br /></p>
                                                    <p><MdEditNote style={{marginBottom: "4px", fontSize: "16px"}}/>Mô tả công việc: {job.description}<br /></p>
                                                    <p><AiOutlineBulb style={{marginBottom: "4px", fontSize: "16px"}}/>Trạng thái công việc: {jobStatus}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card >

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={{marginTop: "56px"}}>
                                    <h1>Yêu cầu</h1>
                                    {
                                        receivers.map((receiver, idx) => {
                                            if (receiver.status != "REJECTED") {
                                                return <Receiver key={idx} job={job} authenticated={authenticated} handleAcceptJob={() => handleAcceptJob()} receiver={receiver} />
                                            }

                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div> :
                    <Spinner animation="border" role="status" variant="success">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
            }



        </Container>

    )
}
export default React.memo(CreatedJob);