import React from "react";
import "./PageContent.css";

const PageContent = (props) => {
    return (
        <>
           <div className="page-title">
                <div className="page-img">
                    <img src={props.content.img} alt="page-img"></img>
                </div>
                <div className="page-content"  data-aos="fade-up" data-aos-duration="1000">
                    <div className="container content-detail text-center">
                        <h3>{props.content.line1}</h3>
                        <h1>{props.content.line2}</h1>
                    </div>
                </div>
            </div>
            <div className="text-title text-title text-center" >
                <h1>{props.content.line3}</h1>
                <h3>{props.content.line4}</h3>
            </div>
        </>
    )
}

export default React.memo(PageContent)