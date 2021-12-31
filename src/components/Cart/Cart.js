import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import "./Cart.css";
import DeleteProduct from "./DeleteProduct";
import axios from "axios";

const Cart = () => {
    // refresh component
    const [value, setValue] = useState();
    const [cart,setCart]=useState(null);
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const refresh = () => {
        setValue({});
    }
     let headers = {
        'Authorization': 'Bearer ' + authenticated.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    useEffect(async () => {
      await  axios.get(base_url + "/cart",headers={headers})
            .then(res => res.data)
            .then(data => {
                setCart(data.data);
            });
    },[]);

    // decrease product quantity
    const decreaseQuantity = (id) => {
        let storage = JSON.parse(localStorage.getItem('cart'));
        storage.find(item => {
            if (item.product.id === id) {
                if (item.boughtQuantity > 0) {
                    item.boughtQuantity -= 1;
                    refresh();
                } else {
                    <DeleteProduct />
                }
            }
        }
        )
        localStorage.setItem('cart', JSON.stringify(storage));

    }
    // increase product quantity
    const increaseQuantity = (id) => {
        let storage = JSON.parse(localStorage.getItem('cart'));
        storage.find(item => {
            if (item.product.id === id)
                item.boughtQuantity += 1;
            refresh();
        }
        )
        localStorage.setItem('cart', JSON.stringify(storage));
        // document.location.reload();
    }

    // send payment
    let cartData=[]
    const paymentHandle = async () => {
        
        if (cart!=null) {
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
    if (cart!=null) {
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
            quantity: <div>
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


    return (
        <div >
            <div className="shop-title">
                <div className="shop-img">
                    <img src="./images/slider-3.jpg" alt="shop-img"></img>
                </div>
                <div className="shop-content" data-aos="fade-up" data-aos-duration="1000">
                    <div className="container content-detail text-center">
                        <h3>Cart</h3>
                        <h1>Cart</h1>
                    </div>
                </div>
            </div>
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