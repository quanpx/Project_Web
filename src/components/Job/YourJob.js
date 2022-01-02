import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container,Card } from "react-bootstrap";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ReceivedJob from "./ReceivedJob";
import NewJob from "./NewJob";

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
                        <NewJob authenticated={authenticated} createdJobs={createdJobs} setCreateJobs={setCreateJobs}/>
                        {
                            createdJobs.map((job, idx) => {
                                const { id, image_url,address ,description, created_at, contact, contact_number, due, salary, name, job_detail, area, status } = job;
                                console.log(job)
                                return (
                                    <Card key={id} className="card-active"> 
                                        <Card.Body>
                                            <Card.Title><a href={"/user/createdJob/"+id}>{name}</a></Card.Title>
                                            <Card.Text>
                                                {address}<br />
                                                {salary}<br />
                                                {due}<br />
                                                {description}<br/>
                                                {status}
                                            </Card.Text>
                                        </Card.Body>
                                     </Card >
                                    )
                        })
                    }
                    </div>
            </Col>
                <Col>
                    <div><h1>Received Job</h1>
                        {
                            receivedJobs.map((job, idx) => {
                                return <ReceivedJob authenticated={authenticated} job={job}/>
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container >


    )
}
export default React.memo(YourJob);