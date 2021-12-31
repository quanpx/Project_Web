import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import "./Cart.css";
import DeleteProduct from "./DeleteProduct";
import axios from "axios";
import PageContent from "../PageContent/PageContent";

const Cart = () => {
    // refresh component
    const [value, setValue] = useState();
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
    const paymentHandle = async () => {
        console.log(headers);
        const storage = JSON.parse(localStorage.getItem('cart'));
        var cart = [];
        if (storage) {
            for (let i = 0; i < d.length; i++) {
                cart.push({
                    product_id: d[i].product.id,
                    quantity: d[i].boughtQuantity
                })
            }
            var paymentData = {
                total_amount: sum,
                cart: cart
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
    const storage = localStorage.getItem('cart');
    if (storage) {
        d = JSON.parse(storage);
    } else {
        console.log("Giỏ hàng rỗng");
    }
    var data = [];
    for (let i = 0; i < d.length; i++) {
        data.push({
            key: d[i].product.id,
            product_img: <img src={d[i].product.image} alt="product-img" width="75" height="75"></img>,
            product_name: d[i].product.name,
            price: d[i].product.price,
            quantity: <div>
                <AiOutlineMinus className="decrease-product" onClick={() => decreaseQuantity(d[i].product.id)} /> &nbsp; &nbsp;
                {d[i].boughtQuantity} &nbsp; &nbsp;
                <AiOutlinePlus className="increase-product" onClick={() => increaseQuantity(d[i].product.id)} />
            </div>,
            total: Math.imul(d[i].product.price, d[i].boughtQuantity)
        });
    }

    // sum payment
    var sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i].total;
    }


    return (
        <div >
            <PageContent />
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