
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AiOutlineUser, AiFillCaretDown } from 'react-icons/ai';
import { BsFillCartCheckFill, BsTelephone, BsFillArrowUpCircleFill, BsGeoAltFill, BsFillTelephoneFill, BsEnvelopeFill, BsTwitter, BsInstagram, BsFillSuitHeartFill } from "react-icons/bs";
import { FaRegPaperPlane, FaFacebook } from 'react-icons/fa';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import { Avatar } from 'antd';
// import 'antd/dist/antd.css';

import './App.css';

import Home from './components/Home/Home';
import Job from './components/Job/Job';
import Cart from './components/Cart/Cart';
import Shop from './components/Shop/Shop';
import User from './components/User/User';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import YourJob from './components/Job/YourJob';
import CreatedJob from './components/Job/CreatedJob';
import JobDetail from './components/Job/JobDetail';
import axios from 'axios';
import Payment from './components/Cart/Payment';

function App() {


    //create aos effect (fade up) when scroll

    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const [cart, setCart] = useState(null);

    useEffect(() => {

        AOS.init();
    });

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    useEffect(async () => {

        if (authenticated != null) {
            let headers = {
                'Authorization': 'Bearer ' + authenticated.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            await axios.get(base_url + "/cart", headers = { headers })
                .then(res => res.data)
                .then(data => {
                    setCart(data.data);
                });
        }

    }, []);

    //change nav color when scroll
    const [navColor, setNavColor] = useState(false);
    const changeNavColor = () => {
        if (window.scrollY >= 60) {
            setNavColor(true)
        } else {
            setNavColor(false)
        }
    }

    window.addEventListener('scroll', changeNavColor)

    // get quantity of product in cart
    // const storage = JSON.parse(localStorage.getItem('cart'));
    // if(storage.length==null)
    // {
    //     storage.length=0;   
    // }

    //scroll to top
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const handleLogout = () => {
        localStorage.removeItem("authenticated");
        setAuthenticated(null);
        setCart(null);

    }
    const onLogined = (newAuth) => {
        setAuthenticated(newAuth);
    }
    const handleIncreaseCart = async () => {
        let headers = {
            'Authorization': 'Bearer ' + authenticated.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        await axios.get(base_url + "/cart", headers = { headers })
            .then(res => res.data)
            .then(data => {
                setCart(data.data);
            });
    }

    window.addEventListener('scroll', toggleVisible);

    // handle increase cart

    return (
        <Router >
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
            {/* <div > */}
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
                            <Nav.Link as={Link} to={"/user"}>

                                {
                                    authenticated != null ?
                                        <div>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<AiOutlineUser />} />&nbsp; &nbsp;
                                            <span>{authenticated.user.name}</span>
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
            {/* </div> */}
            <div className="content">
                <Routes>
                    <Route path=""
                        element={<Home />}
                    />
                    <Route path="/home"
                        element={<Home />}
                    />
                    <Route path="/shop"
                        element={<Shop handleIncreaseCart={handleIncreaseCart} />}
                    />
                    <Route path="/job"
                        element={<Job />}
                    />
                    <Route path="job-detail/:id"
                        element={<JobDetail />}
                    />
                    <Route path="/cart"
                        element={<Cart />}
                    />
                    <Route path="/cart/payment"
                        element={<Payment />}
                    />
                    <Route path="/user"
                        element={<User />}
                    />
                    <Route path="/login"
                        element={<Login action={onLogined} />}
                    />
                    <Route path="/register"
                        element={<Register />}
                    />
                    <Route path="/user/yourJobs"
                        element={<YourJob />}
                    />
                    <Route path="user/createdJob/:id"
                        element={<CreatedJob />}
                    />
                </Routes>
            </div>

            {/* footer */}
            <footer className="footer">
                <Container>
                    <div className="mouse text-center">
                        <div className="mouse-icon">
                            <BsFillArrowUpCircleFill onClick={scrollToTop}
                                style={{ display: visible ? 'inline' : 'none' }}
                            />
                        </div>
                    </div>
                    <div className="footer-content row">
                        <div className="footer-vegefoods col-sm-6 col-md-3">
                            <h3>Vegefoods</h3>
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
                            <div className='media-icon'>
                                <BsTwitter /> &nbsp;
                                <FaFacebook /> &nbsp;
                                <BsInstagram />
                            </div>
                        </div>
                        <div className="footer-menu col-sm-6 col-md-3">
                            <h3>Menu</h3>
                            <ul>
                                <li>Shop</li>
                                <li>About</li>
                                <li>Journal</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className="footer-help col-sm-6 col-md-3">
                            <h3>Help</h3>
                            <ul>
                                <li>Shipping Information</li>
                                <li>Returns & Exchange</li>
                                <li>Terms & Conditions</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                        <div className="footer-contact col-sm-6 col-md-3">
                            <h3>Have a question?</h3>
                            <ul>
                                <li><BsGeoAltFill />203 Fake St. Mountain View, San Francisco, California, USA</li>
                                <li><BsFillTelephoneFill />+2 392 3929 210</li>
                                <li><BsEnvelopeFill />	info@yourdomain.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-copyright row mt-2">
                        <div className='col-md-12 text-center'>
                            Copyright ©2021 All rights reserved | This template is made with <BsFillSuitHeartFill /> by Group 7
                        </div>
                    </div>
                </ Container>
            </footer>
        </Router>
    );
}

export default App;
