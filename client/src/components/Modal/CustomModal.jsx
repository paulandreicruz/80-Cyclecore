import { Button, Modal } from 'antd';
import { useState } from 'react';


const CustomModal = ({title, open, handleCancel, handleOk, children}) => {
  
  return (
    <>
      <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;