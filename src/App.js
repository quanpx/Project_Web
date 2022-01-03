
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import AOS from 'aos';
import { Badge, } from 'antd';
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
import Header from './components/Layout/Header'
import axios from 'axios';
import Payment from './components/Cart/Payment';

function App() {


    //create aos effect (fade up) when scroll

    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const [cart, setCart] = useState(null);
    const [notifications, setNotifications] = useState([]);


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
            await axios.get(base_url + "/noti", headers = { headers })
                .then(res => res.data)
                .then(data => {
                    setNotifications(data.data);
                });
        }
    }, [authenticated])
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
    }, [authenticated])

    //scroll to top
   // const [visible, setVisible] = useState(false)

    let visible=false;
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            // setVisible(true)
            visible=true;
        }
        else if (scrolled <= 300) {
          //  setVisible(false)
          visible=false;
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
            <Header cart={cart} authenticated={authenticated} handleLogout={handleLogout} notifications={notifications} />
            {/* </div> */}
            <div className="content">
                <Routes>
                    <Route path=""
                        element={<Home handleIncreaseCart={handleIncreaseCart} />}
                    />
                    <Route path="/home"
                        element={<Home handleIncreaseCart={handleIncreaseCart} />}
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
                    <Route path="/user"
                        element={<User authenticated={authenticated} />}
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

export default React.memo(App);
