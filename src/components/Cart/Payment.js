import React from "react";
import { Button, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { GiPositionMarker } from 'react-icons/gi';
import { notification } from 'antd';
import PageContent from "../PageContent/PageContent";
import "./Payment.css";

const Payment = () => {
    const navigate = useNavigate();

    const paymentContent = {
        img: "https://static.tapchitaichinh.vn/w800/images/upload/phammaihanh/06222021/tmdt.jpg",
        // line1: "Cart",
        line2: "Thanh toán",
        line3: "Happy Farmer",
        line4: "Mang hạnh phúc đến mọi người!"
    }
    const state=useLocation().state;
   

    console.log(state);

    const openNotificationWithIcon = type => {
        notification[type]({
          message: 'Đặt hàng thành công',
        });
        navigate("/shop")
    };

    return(
        <>
            <PageContent content={paymentContent}/>
            <Container>
                <div>
                    <Button className="ant-btn" onClick={() => navigate("/cart")}>Trở về</Button>
                </div>
                <div className="payment-form">
                    <div>
                        <div className="top-line"></div>
                        <div className="user-address">
                            <h4><GiPositionMarker /> Địa chỉ nhận hàng</h4>
                            <h6>
                                <b>{state.user.name} - {state.user.phone}</b>
                                &nbsp;&nbsp;&nbsp;
                                {state.user.address}
                            </h6>
                            <span className="text-start">Đơn hàng tạo lúc: {state.created_at}</span>
                        </div>
                    </div>
                    <div className="list-product">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th className="text-start left-data">Sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.products.map( (item, index) => {
                                        return (
                                            <tr key={index} style={{height: "80px"}}>
                                                <td className="text-start left-data">image : {item.name}</td>
                                                <td>₫{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>₫{item.price * item.quantity}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="text-end order">
                            <h4>
                                Tổng thanh toán: <span className="total">₫{state.total_amount} </span>
                            </h4>
                            <Button className="order-btn ant-btn" onClick={() => openNotificationWithIcon('success')} style={{height: "36px"}}>Đặt hàng</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default React.memo(Payment);