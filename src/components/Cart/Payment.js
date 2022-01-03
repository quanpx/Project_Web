import React from "react";
import { Container } from 'react-bootstrap';
import { GiPositionMarker } from "react-icons/gi";

import PageContent from "../PageContent/PageContent";
import "./Payment.css";

const Payment = (props) => {
    const paymentContent = {
        img: "https://static.tapchitaichinh.vn/w800/images/upload/phammaihanh/06222021/tmdt.jpg",
        line1: "Cart",
        line2: "Cart nè",
        line3: "Thanh toán",
        line4: "Hóa đơn"
    }

    console.log(props.data);

    return(
        <>
            <PageContent content={paymentContent}/>
            <Container>
                <div className="payment-form">
                    <div className="row">
                        <div className="top-line"></div>
                        <h4 className="address"><GiPositionMarker /> Địa chỉ nhận hàng</h4>
                        <div><b>Lưu Văn Đông - 0906185900</b></div>
                    </div>
                    <div className="row">
                        <div className="">

                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default React.memo(Payment);