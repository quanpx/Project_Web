import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
const YourJob = () => {

    const [createdJobs, setCreateJobs] = useState([])
    const [receivedJobs, setReceivedJobs] = useState([])

    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    let headers = {
        'Authorization': "Bearer " + authenticated.token,
        'Content-Type': 'application/json'
    };


    useEffect(async () => {
        await axios.get(base_url + "/job/createdJob", { headers })
            .then(res => res.data)
            .then(data => {
                setCreateJobs(data.data);
            }).catch(err => { throw Error(err) });
    }, [])

    useEffect(async () => {
        await axios.get(base_url + "/job/receivedJob", { headers })
            .then(res => res.data)
            .then(data => {
                setReceivedJobs(data.data);
            }).catch(err => { throw Error(err) });
    }, [])


    return (
        <Container>
           <Row>
                <Col>

                    <div><h1>Created Job</h1>
                        {
                            createdJobs.map((job, idx) => {
                                const { id, image_url, description, created_at, contact, contact_number, due, salary, name, job_detail, area, status } = job;
                                return (
                                    <div key={idx}>
                                        <p>{id}</p>
                                        <p>{name}</p>
                                        <p>{image_url}</p>
                                        <p>{description}</p>
                                        <p>{status}</p>

                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
                <Col>
                    <div><h1>Received Job</h1>
                        {

                            receivedJobs.map((job, idx) => {
                                const { id, image_url, description, created_at, contact, contact_number, due, salary, name, job_detail, area, status } = job;
                                return (
                                    <div key={idx}>
                                        <p>{id}</p>
                                        <p>{name}</p>
                                        <p>{image_url}</p>
                                        <p>{description}</p>
                                        <p>{status}</p>

                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container >


    )
}
export default React.memo(YourJob);