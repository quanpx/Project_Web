import React, { useState,useEffect} from "react";
import { Container, Modal, Button } from 'react-bootstrap';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { MdPriceCheck,MdOutlineDescription,MdProductionQuantityLimits} from 'react-icons/md';
import "./Shop.css";
import { notification } from 'antd';
import axios from "axios";

function Shop(props){
    // list product
    const [data, setData] = useState([]);
    const [authenticated,setAuthenticated]=useState(JSON.parse(localStorage.getItem("authenticated")));

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    const [currentElm, setCurrentElm] = useState(8);
    const [loadData,setLoadData] = useState([]);

    let headers = {
        'Authorization': "Bearer "+authenticated.token,
        'Content-Type': 'application/json'
    };

    useEffect(async () => {
        await  axios.get(base_url + "/product")
            .then(res => res.data)
            .then(data => {
                setData(data.data); 
                setLoadData(data.data.slice(0, currentElm));       
            });
    }, [])
    // tab active
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const tabs = $$(".tabItem");

    tabs.forEach((tab) => {
        tab.onclick = function () {
          $(".tabItem.active").classList.remove("active");
          this.classList.add("active");
        };
    });
    
    // filter products
    const filterItem = (cateItem) => {
        const updateItem = data.filter((curEle) => {
            return curEle.category === cateItem;
        });
        // setData(updateItem);
        setLoadData(updateItem);
    } 
    
    // load more
    const loadMore = () => {
        setCurrentElm(currentElm + 4);
    }

    // show detail modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setActiveModal(null);
    }
    const [activeModal, setActiveModal] = useState(null);
    const clickHandler= (e, index) => {
        setActiveModal(index);
    }

    // Add product to cart
    var cart = [];

    const getProductById = (id) => {
        for(let i = 0; i < data.length; i++){
            if(data[i].id === id)
                return data[i];
        }
    }

    const addToCard = async (id) => {
        let storage = localStorage.getItem('cart');
        if(storage){
            cart = JSON.parse(storage);
        }

        let product = await getProductById(id);

        let item = cart.find(c => c.product.id === id);
        if(item){
            item.boughtQuantity += 1;
        }else{
            cart.push({product, boughtQuantity: 1});
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        props.handleIncreaseCart();
    }

    // notification add to cart success
    const openNotificationSuccess = (name) => {
        notification.success({
            message: `Sản phẩm ${name} đã được thêm vào giỏ hàng`,
            duration: 3
        });
    }

    return(
        <div>
            <div className="shop-title">
                <div className="shop-img">
                    <img src="./images/slider-1.jpg" alt="shop-img"></img>
                </div>
                <div className="shop-content"  data-aos="fade-up" data-aos-duration="1000">
                    <div className="container content-detail text-center">
                        <h3>Home products</h3>
                        <h1>Products</h1>
                    </div>
                </div>
            </div>
            <Container>
                <div className="shop-content" >
                    <div className="row justify-content-center">
                        <div className=" text-center">
                            <ul className="products-category">
                                <li>
                                    <div onClick={() => setLoadData(data)} className="tabItem active">All</div>
                                </li>
                                <li>
                                    <div onClick={() => filterItem('vegetables')} className="tabItem">Vegetables</div>
                                </li>
                                <li>
                                    <div onClick={() => filterItem('fruits')} className="tabItem">Fruits</div>
                                </li>
                                <li>
                                    <div onClick={() => filterItem('juice')} className="tabItem">Juice</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="shop-products row">
                        {
                            loadData.map((element, index) => {
                                return (
                                    <div key={element.id} className='col-md-6 col-lg-3'  data-aos="fade-up" data-aos-duration="1000">
                                        <div className='agri-item'>
                                            <div className='agri-img'>
                                                <img className='img-fluid' src={element.image} alt="agri-img"/>
                                                <span className='sale'>{element.discount}</span>
                                                <div className="detail btn btn-primary" onClick={(e) => clickHandler(e,index)}>
                                                    Detail
                                                </div>
                                                <Modal show={activeModal === index} onHide={handleClose} centered>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>{element.name}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <img src={element.image} alt="job-img" style={{width: "100%"}}/>
                                                                <div><MdPriceCheck />Price: {element.price}</div>
                                                                <div><MdProductionQuantityLimits /> Quantity: {element.quantity}</div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div><MdOutlineDescription/> Description: {element.description}</div>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                            <div className='text text-center px-3 py-3 pb-4'>
                                                <h3>{element.name}</h3>
                                                <div className='price d-lex '>
                                                    <span className='price-dc'>{element.price}</span>
                                                    <span className='price-sale'>{element.sale_price}</span>
                                                </div>
                                                <div className='bottom-area d-flex px-3'>
                                                    <div className='m-auto d-flex'>
                                                        <div className='buy-now d-flex justify-content-center align-items-center text-center'
                                                            onClick={ () => {addToCard(element.id); openNotificationSuccess(element.name)} }
                                                        >
                                                            <FaShoppingCart />
                                                        </div>
                                                        <div className='like d-flex justify-content-center align-items-center text-center'>
                                                            <BsFillSuitHeartFill />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }                         
                    </div>
                    <button
                        className="btn d-block load-more-btn"
                        onClick={() => loadMore()}
                    >
                        Load more...
                    </button>
                </div>
            </Container>
        </div>
    );
};

export default React.memo(Shop);