import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {useTranslation} from "react-i18next";

const ModalPayment = ({button, title, data, callback}) => {
    const [show, setShow] = useState(false);

    const [amount, setAmount] = useState(0.0);
    const { t } = useTranslation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlePay = () => callback(amount);

    return (
        <div>
            <div onClick={handleShow}> {button} </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>{data.currencyIcon}</span>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className='my-btn type-5' onClick={handlePay}>
                        <span>{t('Pay')}</span>
                    </button>
                    <button className='my-btn type-1' onClick={handleClose}>
                        <span>{t('Cancel')}</span>
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalPayment;