import React, { useState, useEffect } from "react";
import { Button, Container } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import "./Cart.css";
import DeleteProduct from "./DeleteProduct";
import axios from "axios";
import PageContent from "../PageContent/PageContent";
import { useNavigate } from "react-router-dom";


const Cart = ({cart,setCart}) => {
    const navigate = useNavigate();
    // refresh component
    const [value, setValue] = useState();
    //const [cart, setCart] = useState(null);
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const refresh = () => {
        setValue({});
    }

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    // decrease product quantity
    const decreaseQuantity = (id) => {
        cart.find(item => {
            if (item.product_id === id) {
                if (item.bought_quantity > 1) {
                    item.bought_quantity -= 1;
                    refresh();
                } else {
                    return <DeleteProduct />
                }
            }
        })
    }
    // increase product quantity
    const increaseQuantity = (id) => {
        cart.find(item => {
            if (item.product_id === id)
                item.bought_quantity += 1;
            refresh();
        }
        )
    }

    // send payment
    let cartData = []
    const paymentHandle = async () => {

        if (cart != null) {
            for (let i = 0; i < cart.length; i++) {
                cartData.push({
                    product_id: cart[i].product_id,
                    quantity: cart[i].bought_quantity
                })
            }
            var paymentData = {
                total_amount: sum,
                cart: cartData
            }
            let headers = {
                'Authorization': 'Bearer ' + authenticated.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            await axios.post(base_url + "/order", paymentData, { headers })
                .then(res => res.data)
                .then(data => {
                    navigate("./payment",{state:{data:data.data,authenticated:authenticated}});
                });
        }
    }


    // render table
    const columns = [
        {
            title: '',
            dataIndex: 'delete',
            width: 50,
            align: "center",
            render: ( record,index) => {
                return (
                    <DeleteProduct authenticated={authenticated} record={index} cart={cart} setCart={setCart} />
                    // <button onClick={() => console.log(index)}>click me</button>
                )
            }
        },
        {
            title: 'Product Image',
            dataIndex: 'product_img',
            width: 150,
            align: "center"
        },
        {
            title: 'Product name',
            dataIndex: 'product_name',
            width: 250,
            align: "center"
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: 150,
            align: "center",
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: 150,
            align: "center",
        },
        {
            title: 'Total',
            dataIndex: 'total',
            width: 150,
            align: "center"
        },
    ];

    var d = [];
    if (cart != null) {
        d = cart;
    } else {
        console.log("Giỏ hàng rỗng");
    }
    var data = [];
    for (let i = 0; i < d.length; i++) {
        data.push({
            //id: d[i].product_id,
            key: d[i].product_id,
            product_img: <img src={d[i].image_url} alt="product-img" width="75" height="75"></img>,
            product_name: d[i].name,
            price: d[i].price,
            quantity: <div className="change-quantity">
                <AiOutlineMinus className="decrease-product" onClick={() => decreaseQuantity(d[i].product_id)} /> &nbsp; &nbsp;
                {d[i].bought_quantity} &nbsp; &nbsp;
                <AiOutlinePlus className="increase-product" onClick={() => increaseQuantity(d[i].product_id)} />
            </div>,
            total: Math.imul(d[i].price, d[i].bought_quantity)
        });
    }

    // sum payment
    var sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i].total;
    }

    // cart content
    const cartContent = {
        img: "https://images.unsplash.com/photo-1614110073736-1778d27f588a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        // line1: "Cart",
        line2: "Giỏ hàng",
        line3: "Happy Farmer",
        line4: "Mang hạnh phúc đến mọi người!"
    }

    return (
        <div >
            <PageContent content={cartContent} />
            <Container>
                <div className="cart-content">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={
                            // position: ["bottomCenter"],
                            // showSizeChanger: true,
                            // pageSizeOptions: ["5", "10", "20"]
                            false
                        }
                        scroll={{ y: 480 }}
                    />
                </div>
                <div className="payment row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 col-sm-8 text-end payment-text">
                        Tổng tiền ({d.length} sản phẩm):
                        <span className="sum"> ₫{sum}</span>
                        &nbsp; &nbsp;
                    </div>
                    <div className="col-md-3 col-sm-4 text-center">
                        {
                            cart.length === 0 ? 
                            <Button className="ant-btn pay-btn" style={{height: "36px"}} disabled>
                                Mua hàng
                            </Button> :
                            <Button className="ant-btn pay-btn" style={{height: "36px"}} onClick={paymentHandle}>
                                Mua hàng
                            </Button>
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default React.memo(Cart);