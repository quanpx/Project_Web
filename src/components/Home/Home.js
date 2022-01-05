import React, { useState, useEffect } from 'react';
import { Carousel, Container, Spinner, ProgressBar } from 'react-bootstrap';
import { MdOutlineSupportAgent, MdManageAccounts } from 'react-icons/md';
import { FaShippingFast, FaAward, FaShoppingCart } from 'react-icons/fa';
import { BsFillSuitHeartFill, BsTools } from 'react-icons/bs';
import "./Home.css";
import FertilizerItem from '../FertilizerItem/FertilizerItem';

import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';


const Home = (props) => {
    const navigate = useNavigate();
    const [Items, setItems] = useState(null);
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    useEffect(async () => {
        await axios.get(base_url + "/product")
            .then(res => res.data)
            .then(data => {
                setItems(data.data);
            });
    }, [])

    const getProductById = (id) => {
        for (let i = 0; i < Items.length; i++) {
            if (Items[i].id === id)
                return Items[i];
        }
    }
    const addToCart = async (id) => {
        if (authenticated == null) {
            openNotificationWarning("Bạn cần đăng nhập trước nhé !")
            navigate("/login");
        } else {
            let headers = {
                'Authorization': 'Bearer ' + authenticated.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            let product = getProductById(id);
            await axios.post(base_url + "/cart", { product_id: id }, { headers })
                .then(res => {
                    if (res.status == 200) {

                        openNotificationSuccess(product.name);
                    }
                }).catch(err => { throw new Error(err) });
        }
        props.handleIncreaseCart();

    }

    // notification add to cart success
    const openNotificationSuccess = (name) => {
        notification.success({
            message: `Sản phẩm ${name} đã được thêm vào giỏ hàng`,
            duration: 3
        });
    }
    const openNotificationWarning = (message) => {
        notification.warning({
            message: message,
            duration: 3
        });
    }

    return (
        <div>
            {
                Items != null ?
                    <div>
                        <div className="slider">
                            <Carousel fade>
                                <Carousel.Item interval={15000}>
                                    <img
                                        className="d-block "
                                        src="https://images.unsplash.com/photo-1632153380265-d1f815db5a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                        alt="First slide"
                                    />
                                    
                                    <Carousel.Caption>
                                        <div data-aos="fade-up" data-aos-duration="1000">
                                            <h3>Mang mọi người đến gần nhau hơn</h3>
                                            <button className="btn btn-primary"><a href="/shop">Đến cửa hàng</a></button>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1500}>
                                    <img
                                        className="d-block "
                                        src="./images/slider-2.jpg"
                                        alt="Second slide"
                                    />
                                    <Carousel.Caption>
                                        <div data-aos="fade-up" data-aos-duration="1000">
                                            <h3>Chia sẻ, giúp đỡ nhau trong công việc</h3>
                                            <button className="btn btn-primary"><a href="/shop">Đến cửa hàng</a></button>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1500}>
                                    <img
                                        className="d-block "
                                        src="./images/slider-3.jpg"
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                        <div data-aos="fade-up" data-aos-duration="1000">
                                            <h3>Những sản phẩm chất lượng cao, thân thiện với mọi người</h3>
                                            <button className="btn btn-primary"><a href="/shop">Đến cửa hàng</a></button>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>

                        <Container>
                            {/* service */}
                            <div className='service' data-aos="fade-up" data-aos-duration="1000">
                                <div className="row list-service">
                                    <div className='col-md-3 col-sm-6 text-center' >
                                        <div className='media'>
                                            <div className='media-icon bg-color-1 d-flex justify-content-center align-items-center mb-3'>
                                                <FaShippingFast />
                                            </div>
                                            <div className='media-body'>
                                                <h3>Giao hàng miễn phí</h3>
                                                <span>Nhanh chóng</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-3 col-sm-6 text-center'>
                                        <div className='media'>
                                            <div className='media-icon bg-color-2 d-flex justify-content-center align-items-center mb-3'>
                                                <BsTools />
                                            </div>
                                            <div className='media-body'>
                                                <h3>Công cụ chất lượng</h3>
                                                <span>Thân thiện</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-3 col-sm-6 text-center'>
                                        <div className='media'>
                                            <div className='media-icon bg-color-3 d-flex justify-content-center align-items-center mb-3'>
                                                <FaAward />
                                            </div>
                                            <div className='media-body'>
                                                <h3>Làm việc uy tín</h3>
                                                <span>Chất lượng</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-3 col-sm-6 text-center'>
                                        <div className='media'>
                                            <div className='media-icon bg-color-4 d-flex justify-content-center align-items-center mb-3'>
                                                <MdManageAccounts />
                                            </div>
                                            <div className='media-body'>
                                                <h3>Quản lý công việc</h3>
                                                <span>Tiện ích</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* vegetable */}
                            <div className='vegetable' data-aos="fade-up" data-aos-duration="1000">
                                <div className='row list-vegetable'>
                                    <div className='col-md-8 vegetable-col'>
                                        <div className='row'>
                                            <div className='vegetable-main col-md-6 order-md-last align-items-stretch d-flex'>
                                                <img src="./images/vegetable.jpg" alt="img" />
                                                <div className='text text-center'>
                                                    <h2>Rau, củ, quả</h2>
                                                    <p>Một số sản phẩm nông nghiệp</p>
                                                    <a href="/Shop" className='btn btn-primary'>Shop now</a>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='vegetable-item mt-4  d-flex'>
                                                    <img src="./images/vegetable-1.jpg" alt="img" />
                                                    <div className='text px-3 py-1'>
                                                        <p className='mb-0'>Rau, củ</p>
                                                    </div>
                                                </div>
                                                <div className='vegetable-item mt-4 d-flex'>
                                                    <img src="./images/vegetable-2.jpg" alt="img" />
                                                    <div className='text px-3 py-1'>
                                                        <p className='mb-0'>Quả</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4 vegetable-col'>
                                        <div className='vegetable-item mt-4  d-flex'>
                                            <img src="./images/vegetable-3.jpg" alt="img" />
                                            <div className='text px-3 py-1'>
                                                <p className='mb-0'>Nước ép</p>
                                            </div>
                                        </div>
                                        <div className='vegetable-item mt-4 d-flex'>
                                            <img src="./images/vegetable-4.jpg" alt="img" />
                                            <div className='text px-3 py-1'>
                                                <p className='mb-0'>Hạt</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* agricultural product */}
                            <div className='agricultural-product'>
                                <div className='separator-line'></div>
                                <div className='text-title text-center' data-aos="fade-up" data-aos-duration="1000">
                                    <h1>Nông cụ</h1>
                                    <h3>Một số sản phẩm của chúng tôi</h3>
                                    <p>Sở hữu ngay bộ nông cụ chất lượng cao, năng suất lao động cũng tăng cao</p>
                                </div>
                                <div className='row list-agri'>
                                    {
                                        Items.map((element, i) => {
                                            const { id, image_url, sale, category, discount, name, price, sale_price } = element;
                                            if ((category == 'Dụng cụ lao động' || category == 'Hạt giống') && i < 8) {
                                                return (
                                                    <div key={id} className='col-md-6 col-lg-3' data-aos="fade-up" data-aos-duration="1000">
                                                        <div className='agri-item'>
                                                            <div className='agri-img'>
                                                                <img className='img-fluid' src={image_url} alt="agri-img" />
                                                                <span className='sale'>{discount}%</span>
                                                            </div>
                                                            <div className='text text-center px-3 py-3 pb-4'>
                                                                <h3>{name}</h3>
                                                                <div className='price d-lex '>
                                                                    <span className='price-dc'>{price}</span>
                                                                    <span className='price-sale'>{sale}</span>
                                                                </div>
                                                                <div className='bottom-area d-flex px-3'>
                                                                    <div className='m-auto d-flex'>
                                                                        <a onClick={() => addToCart(id)} className='buy-now d-flex justify-content-center align-items-center text-center'>
                                                                            <FaShoppingCart />
                                                                        </a>
                                                                        <a href="#" className='like d-flex justify-content-center align-items-center text-center'>
                                                                            <BsFillSuitHeartFill />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>

                            {/* fertilizer */}
                            <div className='separator-line'></div>
                            <div className='fertilizer'>
                                <div className='text-title text-center' data-aos="fade-up" data-aos-duration="1000">
                                    <h1>Phân bón</h1>
                                    <h3>Một số loại phân bón của chúng tôi</h3>
                                    <p>Không chỉ chỉ cung cấp sản phẩm, chúng tôi còn giới thiệu cho bà con về vai trò của các loại phân bón</p>
                                </div>
                                <div className='row fertilizer-list'>
                                    {
                                        Items.map((item, index) => {
                                            if (item.category == "Phân bón") {
                                                return <FertilizerItem value={item} key={index} />
                                            }
                                        })

                                    }

                                </div>
                            </div>
                        </Container>
                    </div> :
                    <ProgressBar animated variant="success" now={85} />
            }

        </div>
    );
};

export default React.memo(Home);