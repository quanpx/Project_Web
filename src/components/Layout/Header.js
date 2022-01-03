import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Badge, Menu, Dropdown } from 'antd';
import 'aos/dist/aos.css';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillCartCheckFill, BsFillBellFill } from "react-icons/bs";
import { MdArrowDropDownCircle } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import moment from 'moment';
import {

    Link,

} from "react-router-dom";
import { Avatar } from 'antd';
import '../../App.css';

const Header = ({ cart, authenticated, handleLogout, notifications }) => {


    const [navColor, setNavColor] = useState(false);
    const changeNavColor = () => {
        if (window.scrollY >= 60) {
            setNavColor(true)
        } else {
            setNavColor(false)
        }
    }
    window.addEventListener('scroll', changeNavColor)

    // notification
    const menu = (
        <Menu style={{ maxWidth: "340px", position: "fixed" }}>
            <h5><b><BsFillBellFill style={{ color: "#87d068" }} />Thông báo</b></h5>
            {
                notifications.length > 0 ?
                    notifications.map((item, index) => {
                        return (
                            <div key={index}>
                                <Menu.Divider />
                                <Menu.Item key={index}>
                                    <b><FaUser style={{ marginBottom: "4px", color: "#87d068" }} />{item.sender}</b>
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{item.message}</div>
                                    <div style={{ color: "rgb(173 173 173)", float: "right" }}>{moment(item.created_at).calendar()}</div>
                                </Menu.Item>
                            </div>
                        )
                    })
                    : <Menu.Item>
                        <div>Chưa có thông báo mới</div>
                    </Menu.Item>
            }
        </Menu>
    );

    // other dropdown
    const other = (
        <Menu>
            {authenticated != null && <Menu.Item key="a">
                <a href="/user">Profile</a>
            </Menu.Item>}

            <Menu.Divider />
            {authenticated == null ?
                <Menu.Item key="b" ><a href="/login">Đăng nhập</a></Menu.Item> :
                <div>
                    <Menu.Item key="b" ><a href="/user/yourJobs">Quản lý công việc</a></Menu.Item>
                    <Menu.Item key="c" ><a href="/" onClick={handleLogout}>Đăng xuất</a> </Menu.Item>
                </div>
            }
        </Menu>
    );

    return (

        <>

            {/* <div className="info py-1 bg-primary">
                <div className="container">
                    <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
                        <div className="col-lg-12 d-block">
                            <div className="row d-flex">
                                <div className="col-md pr-4 d-flex topper align-items-center"><BsTelephone /> &nbsp; + 84906185900</div>
                                <div className="col-md pr-4 d-flex topper align-items-center"><FaRegPaperPlane /> &nbsp; YOUREMAIL@EMAIL.COM</div>
                                <div className="col-md pr-4 d-flex topper align-items-center">3-5 BUSINESS DAYS DELIVERY & FREE RETURNS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <Navbar expand="lg" sticky="top" className={navColor ? "navbar-bf navbar-at" : "navbar-bf"}>
                <Container>
                    <Navbar.Brand className={navColor ? " navbar-brand-at" : ""} as={Link} to={"/shop"}> <b>Happy Farmers</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link className={navColor ? " navLink-at" : ""} as={Link} to={"/home"}>Trang Chủ</Nav.Link>
                            <Nav.Link className={navColor ? " navLink-at" : ""} as={Link} to={"/shop"}>Cửa Hàng</Nav.Link>
                            <Nav.Link className={navColor ? " navLink-at" : ""} as={Link} to={"/job"}>Công việc</Nav.Link>
                            <Nav.Link className={navColor ? " navLink-at" : ""} as={Link} to={"/cart"} style={{ width: "64px" }}><BsFillCartCheckFill />[{cart != null ? cart.length : 0}]</Nav.Link>
                            <Nav.Link >

                                {
                                    authenticated != null ?
                                        <div>
                                            <span className="avatar-item d-flex">
                                                {
                                                    notifications.length > 0 ?
                                                        <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
                                                            <Badge count={notifications.length}>
                                                                <Avatar
                                                                    src={authenticated.user.image_url}
                                                                    shape="circle"
                                                                    
                                                                    onClick={(e) => e.preventDefault()}
                                                                // className="ant-dropdown-link"
                                                                />
                                                            </Badge>
                                                        </Dropdown>
                                                        : <Avatar
                                                            shape="circle"
                                                             src={authenticated.user.image_url}
                                                           
                                                        />
                                                }
                                                &nbsp; &nbsp;
                                                <p>{authenticated.user.name}</p>
                                            </span>
                                        </div> :
                                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<AiOutlineUser />} />
                                }

                            </Nav.Link>
                            <Dropdown overlay={other} trigger={['click']}>
                                <a className="ant-dropdown-link">
                                    <MdArrowDropDownCircle style={{ fontSize: "26px", color: "#87d068", marginTop: "8px" }} />
                                </a>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default React.memo(Header);