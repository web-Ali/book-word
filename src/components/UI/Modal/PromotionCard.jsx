import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

export default function PromoteSection({type, typeName, price, onSubmit}) {

    const [days, setDays] = useState(1);
    const { t } = useTranslation();

    const makeOrder = () => {
        onSubmit(days, type)
    }

    return (
        <div className='rounded border bg-white'>
            <Modal.Header>
                <Modal.Title>{t(typeName)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>
                        <input type="number" className='mt-1 w-50' value={days}
                               onChange={(e) => {
                                   const totalCost = Number(e.target.value);
                                   if (totalCost < 1 ){
                                       setDays(1);
                                   }
                                   else{
                                       setDays(totalCost);
                                   }
                               }
                        }/>
                        <label className='ms-4'>{t('days')}</label>
                    </div>
                    <div>
                        <input type="number" className='mt-1 w-50' readOnly value={Number(price) * days} />
                        <label className='ms-4'>{t('Total')}</label>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={makeOrder} className='my-btn type-5'><span>{t('Order')}</span></button>
            </Modal.Footer>
        </div>
    )
}
