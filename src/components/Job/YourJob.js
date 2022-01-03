import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container,Card } from "react-bootstrap";
import { GiPositionMarker } from "react-icons/gi";
import { AiOutlineBulb } from "react-icons/ai";
import { MdAttachMoney, MdEditNote, MdDateRange } from "react-icons/md";
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
                <div className="col" style={{margin: "4em 0"}}>
                    <div >
                        <NewJob 
                            authenticated={authenticated} 
                            createdJobs={createdJobs} 
                            setCreateJobs={setCreateJobs}
                        />
                    </div>
                    <div>
                        <h1>Created Job</h1>
                        {
                            createdJobs.map((job, idx) => {
                                const { id, image_url,address ,description, created_at, contact, contact_number, due, salary, name, job_detail, area, status } = job;
                                console.log(job)
                                return (
                                    <Card key={id} className="card-active" style={{ width: "100%", height: "284px" }}> 
                                        <Card.Body>
                                            <Card.Title><a href={"/user/createdJob/"+id}>{name}</a></Card.Title>
                                            <Card.Text>
                                                <p><GiPositionMarker style={{marginBottom: "4px", fontSize: "16px"}}/>Địa điểm: {address}<br /></p>
                                                <p><MdAttachMoney style={{marginBottom: "4px", fontSize: "16px"}}/>Lương: {salary}<br /></p>
                                                <p><MdDateRange style={{marginBottom: "4px", fontSize: "16px"}}/>Ngày làm: {due}<br /></p>
                                                <p><MdEditNote style={{marginBottom: "4px", fontSize: "16px"}}/>Mô tả công việc: {description}<br/></p>
                                                <p><AiOutlineBulb style={{marginBottom: "4px", fontSize: "16px"}}/>Trạng thái: {status}</p>
                                            </Card.Text>
                                        </Card.Body>
                                     </Card >
                                    )
                        })
                    }
                    </div>
                </div>
                <div className="col" style={{marginTop: "112px"}}>
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