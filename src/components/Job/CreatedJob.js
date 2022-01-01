import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner ,Card} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Receiver from "./Receiver";



const CreatedJob = () => {
    const { id } = useParams();

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
                    <Row>
                        <Col>
                            <h1>Created Job </h1>
                            <div>
                                <div>
                                    <Card className="card-active">

                                        <Card.Body>
                                            <Card.Title>{job.name}</Card.Title>
                                            <Card.Text>
                                                {job.address}<br />
                                                {job.salary}<br />
                                                {job.due}<br />
                                                {job.description}<br />
                                                {jobStatus}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card >

                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div><h3>Receivers</h3>
                                {
                                    receivers.map((receiver, idx) => {
                                        if (receiver.status != "REJECTED") {
                                            return <Receiver key={idx} job={job} authenticated={authenticated} handleAcceptJob={() => handleAcceptJob()} receiver={receiver} socket={socket} />
                                        }

                                    })
                                }
                            </div>
                        </Col>
                    </Row> :
                    <Spinner animation="border" role="status" variant="success">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
            }



        </Container>

    )
}
export default React.memo(CreatedJob);