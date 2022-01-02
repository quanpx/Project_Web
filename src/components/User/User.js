import React from "react";
import PageContent from "../PageContent/PageContent";


// user content
const userContent = {
    img: "https://lh3.googleusercontent.com/proxy/7BvH8MlWPNM9tOCYqB3sKZK1-U4w1e8aNjWJjtZXdfJO0xdSZamUFqIcslLgmti60VU_kxjwUOFFLLeF6JUw3MA3PJHhDhRe5-D3t3b__u0hLodIeJp_QHqW2o86q-xgNeJJLqO5",
    line1: "User",
    line2: "User nè",
    line3: "User nữa nè",
    line4: "User tiếp nè"
}


const User = () => {
    return (
        <>
            <PageContent content={userContent}/>
        </>
    )
}

export default React.memo(User);