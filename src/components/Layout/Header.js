import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown, } from 'react-bootstrap';
import { Badge} from 'antd';
import 'aos/dist/aos.css';
import { AiOutlineUser} from 'react-icons/ai';
import { BsFillCartCheckFill, BsTelephone} from "react-icons/bs";
import { FaRegPaperPlane} from 'react-icons/fa';
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

    return (

        <>

            <div className="info py-1 bg-primary">
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
            </div>
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
                            <Nav.Link className={navColor ? " navLink-at" : ""} as={Link} to={"/cart"}><BsFillCartCheckFill />[{cart != null ? cart.length : 0}]</Nav.Link>
                            <Nav.Link >

                                {
                                    authenticated != null ?
                                        <div>
                                            <span className="avatar-item">
                                                {
                                                    notifications.length > 0 ?
                                                        <Badge count={notifications.length}>
                                                            <Avatar shape="circle" style={{ backgroundColor: '#87d068' }} icon={<AiOutlineUser />}onClick={()=>console.log(notifications)} />
                                                        </Badge>
                                                        : <Avatar shape="circle" style={{ backgroundColor: '#87d068' }} icon={<AiOutlineUser />} />

                                                }
                                                &nbsp; &nbsp;
                                                <span>{authenticated.user.name}</span>

                                            </span>
                                        </div> :
                                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<AiOutlineUser />} />
                                }

                            </Nav.Link>
                            <NavDropdown className='log-dropdown'>
                                <NavDropdown.Item as={Link} to={"/user"}>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {authenticated == null ?
                                    <NavDropdown.Item as={Link} to={"/login"}>Đăng nhập</NavDropdown.Item> :
                                    <NavDropdown.Item as={Link} to={"/user/yourJobs"}>Công việc</NavDropdown.Item>
                                }
                                <NavDropdown.Item as={Link} to={"/"} onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default React.memo(Header);