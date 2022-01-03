import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import PageContent from "../PageContent/PageContent";
import "./User.css"
import { useState } from "react";
import axios from "axios";
import moment from "moment";
// user content
const userContent = {
    img: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    line1: "User",
    line2: "User nè",
    line3: "User nữa nè",
    line4: "User tiếp nè"
}


const User = ({ authenticated }) => {
    const [user, setUser] = useState(null);

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    let headers = {
        'Authorization': "Bearer " + authenticated.token,
        'Content-Type': 'application/json'
    };

    useEffect(async () => {
        await axios.get(base_url + "/profile", { headers })
            .then(res => res.data)
            .then(data => {
                if (data.code == 200) {
                    console.log(data.data)
                    setUser(data.data);
                }
            }).catch(err => { throw Error(err) });
    }, [])
   
    return (
        user != null ?
            <>
                <PageContent content={userContent} />
                <Container>
                    <section className="section about-section gray-bg" id="about">
                        <div className="container">
                            <div className="row align-items-center flex-row-reverse mb-4">
                                <div className="col-lg-6">
                                    <div className="about-text go-to">
                                        <h3 className="dark-color">Profile</h3>
                                        <h6 className="theme-color lead">Chào {user.user.name}</h6>
                                        <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
                                        <div className="row about-list">
                                            <div className="col-md-6">
                                                <div className="media">
                                                    <label>Tên</label>
                                                    {user.user.name}
                                                </div>
                                                <div className="media">
                                                    <label>Birthday</label>
                                                    {moment(user.user.date_of_birth).format('LL')}
                                                </div>
                                                <div className="media">
                                                    <label>Phone</label>
                                                    {user.user.phone}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="media">
                                                    <label>Địa chỉ</label>
                                                    {user.user.address}
                                                </div>
                                                <div className="media">
                                                    <label>E-mail</label>
                                                    {user.user.email}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-avatar">
                                        <img src={user.user.image_url} title alt="user image"  style={{borderRadius: "50%", width: "60%"}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="counter">
                                <div className="row">
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to={500} data-speed={500}>{user.created_job}</h6>
                                            <p className="m-0px font-w-600">Số công việc đã tạo</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to={150} data-speed={150}>{user.received_job}</h6>
                                            <p className="m-0px font-w-600">Số công việc đã nhận</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to={850} data-speed={850}>{user.num_orders}</h6>
                                            <p className="m-0px font-w-600">Số đơn hàng đã đặt</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to={190} data-speed={190}>{user.num_products}</h6>
                                            <p className="m-0px font-w-600">Tổng số sản phẩm đã mua</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Container>
            </> : <Spinner animation="border" role="status" variant="success">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
    )
}

export default React.memo(User);