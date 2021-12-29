import React from "react";
import { Container } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import "./Cart.css";
import DeleteProduct from "./DeleteProduct";

const Cart = () => {
    const columns = [
        {
            title: '',
            dataIndex: 'delete',
            width: 50,
            align: "center",
            render: (record) => {
                return(
                    // console.log(record),
                    <DeleteProduct record={record}/> 
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
    if(storage){
        d = JSON.parse(storage);
    }else{
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
                <AiOutlineMinus className="reduce-product"/> &nbsp; &nbsp;
                {d[i].boughtQuantity} &nbsp; &nbsp;
                <AiOutlinePlus className="increase-product"/>
            </div>,
            total: Math.imul(d[i].product.price,d[i].boughtQuantity)
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

export default React.memo(Cart);