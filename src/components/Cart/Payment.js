import React from "react";
import { Container } from 'react-bootstrap';

import PageContent from "../PageContent/PageContent";

const Payment = () => {
    const paymentContent = {
        img: "https://static.tapchitaichinh.vn/w800/images/upload/phammaihanh/06222021/tmdt.jpg",
        line1: "Cart",
        line2: "Cart nè",
        line3: "Thanh toán",
        line4: "Hóa đơn"
    }

    return(
        <>
            <PageContent content={paymentContent}/>
            <Container>
                hello
            </Container>
        </>
    )
}
export default React.memo(Payment);