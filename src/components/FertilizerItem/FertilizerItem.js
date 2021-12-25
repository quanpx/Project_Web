import React from "react";
import "./FertilizerItem.css";

function FertilizerItem(){
    return(
        <div className='row fertilizer-item justify-content-around'  data-aos="fade-up" data-aos-duration="1000">
            <div className='fertilizer-img col-md-4 '>
                <img className='img-fluid' src='./images/fertilizer-1.jpg' alt="fertilizer-img"></img>
            </div>
            <div className='fertilizer-content col-md-8 '>
                <div className='fertilizer-type'>Phân bón vô cơ đa lượng</div>
                <div className='fertilizer-detail'>
                    <h3>Phân đạm</h3>
                    <p>Là tên gọi chung của các loại phân bón vô cơ cung cấp đạm cho cây. Bón đạm thúc đẩy quá trình tăng trưởng của cây, làm cho cây ra nhiều nhánh, phân cành, ra lá nhiều, lá có kích thước to, màu xanh, lá quang hợp mạnh do đó làm tăng năng suất cây.</p>
                </div>
                <h5 className='fertilizer-cost'>Giá: 18.000 đồng / kg</h5>
                <button type="button" class="btn btn-success">Mua ngay</button>
            </div>
        </div>
    )
}

export default React.memo(FertilizerItem);
