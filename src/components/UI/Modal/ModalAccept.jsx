import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import {useTranslation} from "react-i18next";

const ModalAccept = ({button, text, desc, call,}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { t } = useTranslation();

    const funCall = async () => {
        await call();
        handleClose();
    }
    return (
        <>
            <span onClick={handleShow}> {button} </span>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{desc}</Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='my-btn type-1'><span>{t('Close')}</span></button>
                    <button onClick={funCall} className='my-btn type-5'><span>{t('Accept')}</span></button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalAccept;
