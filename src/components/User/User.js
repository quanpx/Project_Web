import React from "react";
import { Container } from "react-bootstrap";
import PageContent from "../PageContent/PageContent";
import "./User.css"

// user content
const userContent = {
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png",
    line1: "User",
    line2: "User nè",
    line3: "User nữa nè",
    line4: "User tiếp nè"
}


const User = () => {
    return (
        <>
            <PageContent content={userContent}/>
            <Container>
                <section className="section about-section gray-bg" id="about">
                    <div className="container">
                    <div className="row align-items-center flex-row-reverse">
                        <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">About Me</h3>
                            <h6 className="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6>
                            <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
                            <div className="row about-list">
                            <div className="col-md-6">
                                <div className="media">
                                    <label>Tên</label>
                                    <p>Đông</p>
                                </div>
                                <div className="media">
                                    <label>Birthday</label>
                                    <p>4th april 1998</p>
                                </div>
                                <div className="media">
                                    <label>Age</label>
                                    <p>22 Yr</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="media">
                                    <label>Địa chỉ</label>
                                    <p>Tam Đảo</p>
                                </div>
                                <div className="media">
                                    <label>E-mail</label>
                                    <p>info@domain.com</p>
                                </div>
                                <div className="media">
                                    <label>Phone</label>
                                    <p>820-885-3321</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="about-avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title alt="user image" />
                        </div>
                        </div>
                    </div>
                    <div className="counter">
                        <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                            <h6 className="count h2" data-to={500} data-speed={500}>500</h6>
                            <p className="m-0px font-w-600">Số công việc đã tạo</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                            <h6 className="count h2" data-to={150} data-speed={150}>150</h6>
                            <p className="m-0px font-w-600">Số công việc đã nhận</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                            <h6 className="count h2" data-to={850} data-speed={850}>850</h6>
                            <p className="m-0px font-w-600">Số đơn hàng đã đặt</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                            <h6 className="count h2" data-to={190} data-speed={190}>190</h6>
                            <p className="m-0px font-w-600">Tổng số sản phẩm đã mua</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </Container>
        </>
    )
}

export default React.memo(User);