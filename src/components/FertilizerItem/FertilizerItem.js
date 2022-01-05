import React from "react";
import "./FertilizerItem.css";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";

function FertilizerItem(props){
    const navigate = useNavigate();
    return(
        <div className='row fertilizer-item justify-content-around'  data-aos="fade-up" data-aos-duration="1000">
            <div className='fertilizer-img col-md-4 '>
                <img className='img-fluid' src={props.value.image_url} alt="fertilizer-img"></img>
            </div>
            <div className='fertilizer-content col-md-8 '>
                <div className='fertilizer-type'>Phân bón vô cơ đa lượng</div>
                <div className='fertilizer-detail'>
                    <h3>{props.value.name}</h3>
                    <p>{props.value.description}</p>
                </div>
                <h5 className='fertilizer-cost'><NumberFormat value={props.value.price} displayType={'text'} thousandSeparator={true} prefix={'₫'}></NumberFormat></h5>
                <button type="button" className="btn btn-success" onClick={() => navigate("/shop")}>Mua ngay</button>
            </div>
        </div>
    )
}

export default React.memo(FertilizerItem);
