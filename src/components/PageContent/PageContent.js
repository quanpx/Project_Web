import React from "react";
import "./PageContent.css";

const PageContent = () => {
    return (
        <>
           <div className="page-title">
                <div className="page-img">
                    <img src="./images/slider-1.jpg" alt="page-img"></img>
                </div>
                <div className="page-content"  data-aos="fade-up" data-aos-duration="1000">
                    <div className="container content-detail text-center">
                        <h3>Home products</h3>
                        <h1>Products</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(PageContent)