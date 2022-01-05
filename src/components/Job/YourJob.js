import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container,Card } from "react-bootstrap";
import { GiPositionMarker } from "react-icons/gi";
import { AiOutlineBulb } from "react-icons/ai";
import { MdAttachMoney, MdEditNote, MdDateRange } from "react-icons/md";
import NumberFormat from "react-number-format";
import convertToVNese from "../../utils/convertToVNese";

import PageContent from "../PageContent/PageContent";
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


    // your job content
    const yourJobContent = {
        img: "https://digitmatter.com/wp-content/uploads/2021/04/crm-phan-mem-quan-ly-cong-viec-marketing-va-sales-1024x639.png",
        line2: "Quản lý công việc",
        line3: "Happy Farmer",
        line4: "Mang hạnh phúc đến mọi người!"
    }
    
    return (
        <>
            <PageContent content={yourJobContent}/>
            <Container>
                <div className="row" style={{margin: "4em 0"}}>
                    <div className="col-md-6">
                        <div >
                            <NewJob 
                                authenticated={authenticated} 
                                createdJobs={createdJobs} 
                                setCreateJobs={setCreateJobs}
                            />
                        </div>
                        <div>
                            <h1>Việc đã tạo</h1>
                            {
                                createdJobs.map((job, idx) => {
                                    const { id, image_url,address ,description, created_at, contact, contact_number, due, salary, name, job_detail, area, status } = job;
                                   
                                    return (
                                        <Card key={id} className="card-active" style={{ width: "100%", height: "304px", marginBottom: "12px" }}> 
                                            <Card.Body>
                                                <Card.Title><a href={"/user/createdJob/"+id}>{name}</a></Card.Title>
                                                <Card.Text>
                                                    <p><GiPositionMarker style={{marginBottom: "4px", fontSize: "16px"}}/>Địa điểm: {address}<br /></p>
                                                    <p><MdAttachMoney style={{marginBottom: "4px", fontSize: "16px"}}/>Lương: <NumberFormat value={salary} displayType={'text'} thousandSeparator={true} suffix={' VND'} /><br /></p>
                                                    <p><MdDateRange style={{marginBottom: "4px", fontSize: "16px"}}/>Ngày làm: {due}<br /></p>
                                                    <p><MdEditNote style={{marginBottom: "4px", fontSize: "16px"}}/>Mô tả công việc: {description}<br/></p>
                                                    <p><AiOutlineBulb style={{marginBottom: "4px", fontSize: "16px"}}/>Trạng thái: {convertToVNese(status)}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card >
                                        )
                            })
                        }
                        </div>
                    </div>
                    <div className="col-md-6" style={{marginTop: "56px"}}>
                        <div><h1>Việc đã nhận</h1>
                            {
                                receivedJobs.map((job, idx) => {
                                    return <ReceivedJob authenticated={authenticated} job={job}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </Container >
        </>


    )
}
export default React.memo(YourJob);