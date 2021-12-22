import React, {useState} from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { MdOutlineSupportAgent,MdFastfood } from 'react-icons/md';
import { FaShippingFast,FaAward,FaShoppingCart } from 'react-icons/fa';
import { BsFillSuitHeartFill,BsList } from 'react-icons/bs';
import "./Home.css";
import FertilizerItem from '../FertilizerItem/FertilizerItem';
import ListProducts from "../Shop/ListProducts";

function Home(){
    const [Items, setItems] = useState(ListProducts);

    return(
        <div>
            <div className="slider">
                <Carousel fade>
                    <Carousel.Item interval={1500}>
                        <img
                        className="d-block "
                        src="./images/slider-1.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                            <div data-aos="fade-up" data-aos-duration="1000">
                                <h1>First slide label</h1>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                <button className="btn btn-primary">View Details</button>
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
                                <h1>Second slide label</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                               <button className="btn btn-primary">View Details</button>
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
                                <h1>Third slide label</h1>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                <button className="btn btn-primary">View Details</button>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            
            <Container>
                {/* service */}
                <div className='service'  data-aos="fade-up" data-aos-duration="1000">
                        <div className="row list-service">
                            <div className='col-md-3 col-sm-6 text-center' >
                                <div className='media'>
                                    <div className='media-icon bg-color-1 d-flex justify-content-center align-items-center mb-3'>
                                        <FaShippingFast />
                                    </div>
                                    <div className='media-body'>
                                        <h3>free shipping</h3>
                                        <span>on order over $100</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 col-sm-6 text-center'>
                                <div className='media'>
                                    <div className='media-icon bg-color-2 d-flex justify-content-center align-items-center mb-3'>
                                        <MdFastfood />
                                    </div>
                                    <div className='media-body'>
                                        <h3>always fresh</h3>
                                        <span>product well package</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 col-sm-6 text-center'>
                                <div className='media'>
                                    <div className='media-icon bg-color-3 d-flex justify-content-center align-items-center mb-3'>
                                        <FaAward />
                                    </div>
                                    <div className='media-body'>
                                        <h3>superior quality</h3>
                                        <span>quality products</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 col-sm-6 text-center'>
                                <div className='media'>
                                    <div className='media-icon bg-color-4 d-flex justify-content-center align-items-center mb-3'>
                                        <MdOutlineSupportAgent />
                                    </div>
                                    <div className='media-body'>
                                        <h3>support</h3>
                                        <span>24/7 support</span>
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
                                        <h2>Vegetables</h2>
                                        <p>Protect the health of every home</p>
                                        <p  className='btn btn-primary'>Shop now</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='vegetable-item mt-4  d-flex'>
                                        <img src="./images/vegetable-1.jpg" alt="img" />
                                        <div className='text px-3 py-1'>
                                            <h2 className='mb-0'>name</h2>
                                        </div>
                                    </div>
                                    <div className='vegetable-item mt-4 d-flex'>
                                        <img src="./images/vegetable-2.jpg" alt="img" />
                                        <div className='text px-3 py-1'>
                                            <h2 className='mb-0'>name</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 vegetable-col'>
                            <div className='vegetable-item mt-4  d-flex'>
                                <img src="./images/vegetable-3.jpg" alt="img" />
                                <div className='text px-3 py-1'>
                                    <h2 className='mb-0'>name</h2>
                                </div>
                            </div>
                            <div className='vegetable-item mt-4 d-flex'>
                                <img src="./images/vegetable-4.jpg" alt="img" />
                                <div className='text px-3 py-1'>
                                    <h2 className='mb-0'>name</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* agricultural product */}
                <div className='agricultural-product'>
                    <div className='separator-line'></div>
                    <div className='text-title text-center' data-aos="fade-up" data-aos-duration="1000">
                        <h1>Agricultural Products</h1>
                        <h3>Our Products</h3>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
                    </div>
                    <div className='row list-agri'>
                        {
                            Items.map((element,i) => {
                                const {id, image, sale, category, name, price, sale_price} = element;
                                if(i < 8){
                                    return (
                                        <div className='col-md-6 col-lg-3'  data-aos="fade-up" data-aos-duration="1000">
                                            <div className='agri-item'>
                                                <div className='agri-img'>
                                                    <img className='img-fluid' src={image} alt="agri-img"/>
                                                    <span className='sale'>{sale}</span>
                                                </div>
                                                <div className='text text-center px-3 py-3 pb-4'>
                                                    <h3>{name}</h3>
                                                    <div className='price d-lex '>
                                                        <span className='price-dc'>{price}</span>
                                                        <span className='price-sale'>{sale_price}</span>
                                                    </div>
                                                    <div className='bottom-area d-flex px-3'>
                                                        <div className='m-auto d-flex'>
                                                            <a href="#" className='add-to-card d-flex justify-content-center align-items-center text-center'>
                                                                <BsList />
                                                            </a>
                                                            <a href="#" className='buy-now d-flex justify-content-center align-items-center text-center'>
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
                        <h1>Fertilizer</h1>
                        <h3>Fertilizer for agriculture</h3>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
                    </div>
                    <div className='row fertilizer-list'>
                        <FertilizerItem />
                        <FertilizerItem />
                        <FertilizerItem />
                    </div>
                </div>
            </Container> 
        </div>
    );
};

export default Home;