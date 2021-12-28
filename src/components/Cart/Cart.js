import React from "react";
import { Container } from 'react-bootstrap';
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
            render: (record) => (
                <DeleteProduct record={record}/>
            )
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

    var data = [];
    const storage = localStorage.getItem('cart');
    if(storage){
        data = JSON.parse(storage);
        console.log(data);
    }else{
        console.log("Giỏ hàng rỗng");
    }
    for (let i = 0; i < data.length; i++) {
        data.push({
            key: data[i].id,
            product_img: `King ${i}`,
            product_name: `Edward King ${i}`,
            price: 50000,
            quantity: data.quantity,
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

export default React.memo(Cart);