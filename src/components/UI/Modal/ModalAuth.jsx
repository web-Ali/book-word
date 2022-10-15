import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import style from "../../Header/Header.module.scss";
import {NavLink, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../../routing/consts";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";

const ModalAuth = ({button}) => {

    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();

    const history = useHistory();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const onSubmit = (data, e) => {
        history.push(LOGIN_ROUTE, {data})
        reset();
        handleClose();
    };

    return (
        <div>
            <span style={{cursor: 'pointer'}} onClick={handleShow}> {button} </span>
            <Modal contentClassName={style.authModal} show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Sign-In')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <br/>
                        <div className='my-form mt-1'>
                            <input type="text" className='w-100' placeholder="" {...register("Login", {
                                required: {
                                    value: true,
                                    message: t('Fiels is required')
                                }
                            })} />
                            <label>{t('Login')}</label>
                        </div>
                        {errors?.Login?.message ?
                            <p className={'text-danger ' + style.error}>{errors?.Login?.message}</p> : null}
                        <div className="my-form mt-3">
                            <input type="password" className='w-100'
                                   placeholder="" {...register("Password", {
                                required: {
                                    value: true,
                                    message: t('Fiels is required')
                                }
                            })} />
                            <label>{t('Password')}</label>

                        </div>

                        {errors?.Password?.message ?
                            <p className={'text-danger ' + style.error}>{errors?.Password?.message}</p> : null}

                        {/*<label ><input type="checkbox" className='mb-3 mt-4'*/}
                        {/*       placeholder="Запомнить меня" {...register("Remember", {})} /> Запомнить меня </label>*/}
                        <button className='mt-5 my-btn type-5 w-100' type='submit'>
                            <span>{t('Sign-In')}</span>
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'center'}}>
                    <p className={style.registr + ' mt-3'}>{t('Don\'t have an account?')} <span onClick={handleClose}><NavLink
                        to={REGISTRATION_ROUTE}>{t('Register!')}</NavLink></span></p>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalAuth;