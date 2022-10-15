import React from 'react';
import Modal from "react-bootstrap/Modal";
import style from './Header.module.scss'
import {useTranslation} from "react-i18next";

const Notifications = (props) => {
    const { t } = useTranslation();

    const handleClose = () => {
        props.offModal(false)
    };
    const SaveAndClose = () => {
        props.requestNotifications('view')
        props.offModal(false)
    };

    return (
        <div>
            <Modal
                show={true}
                onHide={handleClose}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className='d-flex justify-content-between'>
                            <div><i className="fas fa-bell"/> {t('notifications')}</div>
                        </div>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='text-end mb-3'>
                        <span className='me-2'>
                            <button onClick={()=>props.delete('all')} className='my-btn type-4'><span>{t('clean_all')}</span></button>
                        </span>
                        <button onClick={SaveAndClose} className='my-btn type-5'><span>{t('checked')}</span></button>
                    </div>
                    {props.notifications.length > 0 ? props.notifications.map((notif) => {
                        return <div key={notif.id}>
                            <div className='position-relative d-inline-block'>
                                {notif.created_at.slice(0, 10)} {notif.created_at.slice(11, 19)}
                                {notif.checked ? null : <i className={style.notiCircle + ' fas fa-circle'}/>
                                }
                            </div>
                            <div>
                                <span dangerouslySetInnerHTML={{__html: notif.message}} />

                                <span onClick={()=>props.delete(notif.id)} style={{cursor: 'pointer'}}
                                      className=" ms-2 mt-2  text-danger">x </span>
                            </div>
                            <hr/>
                        </div>
                    })
                    : t('You don\'t have notifications')
                    }
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={SaveAndClose} className='my-btn type-5'><span>{t('checked')}</span></button>
                    <button onClick={handleClose} className='my-btn type-1'><span>{t('close')}</span></button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Notifications;