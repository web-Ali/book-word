import Modal from "react-bootstrap/Modal";
import React, {useEffect, useState} from "react";
import PromoteSection from "./PromotionCard";
import {createPromotion, getPromotionPriceList} from "../../../http/promotionAPI";
import {Alert} from "react-bootstrap";
import {useTranslation} from "react-i18next";


export default function ModalPromotion({bookId}) {
    const [showModal, setShowModal] = useState(false);
    const [promotionPrices, setPromotionPrices] = useState([]);
    const [response, setResponse] = useState(null)
    const { t } = useTranslation();

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onSubmit = (days, type) => {
        createPromotion(days, type, bookId).then(response => {
            setResponse({success: true, message: t('Promotion purchased successfully')})

        })
            .catch(error => {
            setResponse({success: false, message: t(error.response.data.detail)})

        })
        handleClose()
    };

    useEffect(() => {
        getPromotionPriceList().then(response => {
            setPromotionPrices(response.data)
        })
    }, [])

    return (
        <>
            <div className=' mt-3 mb-3'>
                <button
                    className='my-btn type-4 w-100'
                    onClick={handleShow}
                >
                   <span style={{fontSize: 14}}> <i className="fas fa-arrow-up"/> {t('PROMOTE')}</span>
                </button>
            </div>
            <Modal contentClassName='bg-cyan p-4' show={showModal} onHide={handleClose}>
                <div className='d-flex justify-content-between'>
                    <p className='p1 semibold'>{t('Promote')}</p>
                    <div className='btn' onClick={handleClose}>
                        <i className='fas fa-times fa-lg'/>
                    </div>
                </div>
                <div className='d-flex gap-3'>
                    {promotionPrices.map(item => {
                        return (
                            <PromoteSection key={item.type} type={item.type} typeName={item.type_name} price={item.price}
                                            onSubmit={onSubmit}/>
                        )
                    })}
                </div>
            </Modal>

            <Modal show={!!response} onHide={() => setResponse(null)} backdrop={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{response && response.success ? t("Success") : t("Error")}</Modal.Title>
                </Modal.Header>
                <Modal.Body><Alert variant={response && response.success ? "success" : "danger"}>{response?.message}</Alert></Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setResponse(null)}className='my-btn type-1'><span>OK</span></button>

                </Modal.Footer>
            </Modal>

        </>
    )
}

