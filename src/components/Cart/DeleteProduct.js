import React, {useState} from 'react';
import { Modal, Space, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AiOutlineCloseSquare } from 'react-icons/ai';

import axios from 'axios';

const DeleteProduct = (props) => {
    // refresh component
    const [value, setValue] = useState();
    const refresh = ()=>{
        setValue({});
    }
    const { confirm } = Modal;

    const openNotificationSuccess = () => {
        notification.success({
        message: 'Sản phẩm đã được xóa khỏi giỏ hàng',
        duration: 3
        });
    }
    function showDeleteConfirm() {
        confirm({
            title: 'Xóa sản phẩm khỏi giỏ hàng',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc xóa sản phẩm này khỏi giỏ hàng chứ？',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Không',
            async onOk() {
                console.log('OK');

                // delete by id
                const body = {product_id: props.record.key}

                const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
                let headers = {
                    'Authorization': 'Bearer ' + props.authenticated.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };
                await axios.delete(base_url + "/cart", {headers:headers,data:body})
                    .then(res => res.data)
                    .then(data => {
                        if(data.code==200)
                        {
                            props.setCart(props.cart.filter(product=>product.product_id !== props.record.key))
                        }
                    })
                    
                
                // success notice
                openNotificationSuccess();
            },
            onCancel() {
                console.log('Cancel');
                console.log(props.authenticated)
            },
        });
    }

    return(
        <div>
            <Space>
                <AiOutlineCloseSquare onClick={showDeleteConfirm} className='delete-icon'/>
            </Space>
        </div>
    );
};

export default React.memo(DeleteProduct);