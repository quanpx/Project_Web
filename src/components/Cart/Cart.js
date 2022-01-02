import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import "./Cart.css";
import DeleteProduct from "./DeleteProduct";
import axios from "axios";
import PageContent from "../PageContent/PageContent";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const Cart = () => {
    const navigate = useNavigate();
    // refresh component
    const [value, setValue] = useState();
    const [cart, setCart] = useState(null);
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const refresh = () => {
        setValue({});
    }

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    useEffect(async () => {

        if (authenticated == null) {
            openNotificationWarning("Bạn cần đăng nhập trước nhé!");
            navigate("/login");
        } else {
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
    const openNotificationWarning = (message) => {
        notification.warning({
            message: message,
            duration: 3
        });
    }


    // decrease product quantity
    const decreaseQuantity = (id) => {
        cart.find(item => {
            if (item.product_id === id) {
                if (item.bought_quantity > 0) {
                    item.bought_quantity -= 1;
                    refresh();
                } else {
                    <DeleteProduct />
                }
            }
        }
        )
        console.log(cart)
    }
    // increase product quantity
    const increaseQuantity = (id) => {
        cart.find(item => {
            if (item.product_id === id)
                item.bought_quantity += 1;
            refresh();
        }
        )
        console.log(cart)
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

                    //du lieu tra ve : list san pham va tong tien
                    /**
                     * products: Array(1)
                                0:
                                name: "Rau huu co"
                                price: 500
                                quantity: 1
                        total_amount: 500
                     * 
                     */
                    console.log(data.data);
                    navigate("./payment")
                });
        } else {
            alert("Giỏ hàng đang rỗng");
        }

    }


    // render table
    const columns = [
        {
            title: '',
            dataIndex: 'delete',
            width: 50,
            align: "center",
            render: (record) => {
                return (
                    // console.log(record),
                    <DeleteProduct record={record} />
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
        img: "https://static.tapchitaichinh.vn/w800/images/upload/phammaihanh/06222021/tmdt.jpg",
        line1: "Cart",
        line2: "Cart nè",
        line3: "Cart nữa nè",
        line4: "Cart tiếp nè"
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
                        // bordered
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
                        <button className="btn btn-primary pay-btn" onClick={paymentHandle}>
                            Mua hàng
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default React.memo(Cart);