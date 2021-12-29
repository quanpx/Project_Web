import React from 'react';
import { Modal, Space, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AiOutlineCloseSquare } from 'react-icons/ai';



const DeleteProduct = (props) => {
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
            onOk() {
                console.log('OK');
                console.log(props.record);

                // delete by id
                let storage = JSON.parse(localStorage.getItem('cart'));
                storage = storage.filter(item => item.product.id !== props.record.id);
                localStorage.setItem('cart',JSON.stringify(storage));
                
                // success notice
                openNotificationSuccess();
            },
            onCancel() {
                console.log('Cancel');
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