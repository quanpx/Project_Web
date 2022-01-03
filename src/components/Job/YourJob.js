import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container,Card } from "react-bootstrap";
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
            <div className="row">
                <div className="col col-md-6 col-sm-12">
                    <div><h1>Created Job</h1>
                        <NewJob />
                        {
                            createdJobs.map((job, idx) => {
                                const { id, image_url,address ,description, created_at, contact, contact_number, due, salary, name, job_detail, area, status } = job;
                                console.log(job)
                                return (
                                    <Card key={id} className="card-active" style={{ width: "100%" }}> 
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
                </div>
                <div className="col col-md-6 col-sm-12" >
                    <div><h1>Received Job</h1>
                        {
                            receivedJobs.map((job, idx) => {
                                return <ReceivedJob authenticated={authenticated} job={job}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </Container >


    )
}
export default React.memo(YourJob);