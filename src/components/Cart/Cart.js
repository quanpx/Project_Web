import React from "react";
import { Container } from 'react-bootstrap';
import { Table } from 'antd';
import { AiOutlinePlus,AiOutlineMinus } from 'react-icons/ai';
import 'antd/dist/antd.css';
import "./Cart.css";

function Cart(){
    const columns = [
        {
            title: 'Product Image',
            dataIndex: 'product_img',
            width: 150,
            align: "center"
        },
        {
            title: 'Product name',
            dataIndex: 'product_name',
            width: 300,
            align: "center"
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: 100,
            align: "center",
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: 100,
            align: "center"
        },
        {
            title: 'Total',
            dataIndex: 'total',
            width: 100,
            align: "center"
        },
    ];

    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            key: i,
            product_img: `King ${i}`,
            product_name: `Edward King ${i}`,
            price: 50000,
            quantity: 1,
            total: 250
        });
    }


    return(
        <div >
            <div className="shop-title">
                <div className="shop-img">
                    <img src="./images/slider-3.jpg" alt="shop-img"></img>
                </div>
                <div className="shop-content"  data-aos="fade-up" data-aos-duration="1000">
                    <div className="container content-detail text-center">
                        <h3>Home products</h3>
                        <h1>Products</h1>
                    </div>
                </div>
            </div>
            <Container>
                <div className="cart-content">
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={{
                        position: ["bottomCenter"],
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20"]
                    }}
                    scroll={{ y: 480 }} 
                    
                />
                </div>
            </Container>
        </div>
    );
};

export default Cart;