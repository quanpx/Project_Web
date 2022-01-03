import React from "react";
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { GiPositionMarker } from 'react-icons/gi';
import { notification } from 'antd';
import PageContent from "../PageContent/PageContent";
import "./Payment.css";

const Payment = () => {
    const paymentContent = {
        img: "https://static.tapchitaichinh.vn/w800/images/upload/phammaihanh/06222021/tmdt.jpg",
        line1: "Cart",
        line2: "Cart nè",
        line3: "Thanh toán",
        line4: "Hóa đơn"
    }
    const state=useLocation().state;
   

    console.log(state);

    const navigate = useNavigate();

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
                                    state.products.map( item => {
                                        return (
                                            <tr style={{height: "80px"}}>
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
                            <div type="button" className="order-btn btn btn-primary" onClick={() => openNotificationWithIcon('success')}>Đặt hàng</div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default React.memo(Payment);