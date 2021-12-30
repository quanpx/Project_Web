import React, { useState,useEffect } from "react";
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { AiFillNotification, AiOutlineUser, AiFillPhone } from 'react-icons/ai';
import { MdOutlineContentPaste, MdOutlineAttachMoney, MdOutlineAccessTime } from 'react-icons/md';
import { GiPositionMarker } from 'react-icons/gi';
import "./Job.css";
import ListJobs from "./ListJobs";
import axios from "axios";


function Job() {
    // list jobs
    const [Items, setItems] = useState([]);
    const [authenticated,setAuthenticated]=useState(JSON.parse(localStorage.getItem("authenticated")));

    // show model
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    let headers = {
        'Authentication': "Bearer "+authenticated.token,
        'Content-Type': 'application/json'
    };


    useEffect(async () => {
      await  axios.get(base_url + "/job")
            .then(res => res.data)
            .then(data => {
                setItems(data.data);
            });
    }, [])

    return (
        <>
            <div className="shop-title">
                <div className="shop-img">
                    <img src="./images/slider-1.jpg" alt="shop-img"></img>
                </div>
                <div className="shop-content" data-aos="fade-up" data-aos-duration="1000">
                    <div className="container content-detail text-center">
                        <h3>Home jobs</h3>
                        <h1>Jobs</h1>
                    </div>
                </div>
            </div>
            <Container>
                <div className="jobs-content">
                    <div className="jobs-title text-title text-center" >
                        <h1>Agricultural Products</h1>
                        <h3>Our Products</h3>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
                    </div>
                    <div className="list-jobs row justify-content-center align-items-center">
                        {
                            Items.map((element) => {
                                const { id, image, name, description, address, salary, time, contact, contact_number, detail } = element;
                                return (
                                    <div className="col-sm-6 col-md-4" key={id} data-aos="zoom-in-up">
                                        <Card className="card-active">
                                            <Card.Img variant="top" src={image} />
                                            <Card.Body>
                                                <Card.Title>{name}</Card.Title>
                                                <Card.Text>
                                                    {description}<br />
                                                    {address}<br />
                                                    {salary}<br />
                                                    {time}<br />
                                                </Card.Text>
                                                <Button onClick={handleShow} className="detail-btn">Detail</Button>
                                                <Modal show={show} onHide={handleClose} centered style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>{name}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <img src={image} alt="job-img" style={{ width: "100%" }} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p><AiFillNotification />{description}</p>
                                                                <p><MdOutlineContentPaste /> {detail}</p>
                                                                <p><GiPositionMarker />{address}</p>
                                                                <p><MdOutlineAttachMoney />{salary}</p>
                                                                <p><MdOutlineAccessTime />{time}</p>
                                                                <p><AiOutlineUser />{contact}</p>
                                                                <p><AiFillPhone />{contact_number}</p>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                <Button className="getJob-btn">Get job</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </>
    )
};

export default React.memo(Job);