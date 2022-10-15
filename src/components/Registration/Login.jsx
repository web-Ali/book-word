import React, {useState} from 'react';
import { Card, Container, Form, Row} from "react-bootstrap";
import {REGISTRATION_ROUTE} from "../../routing/consts";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Helmet from "react-helmet";

function Login({postLogin,er,isFetching}) {


    const { t } = useTranslation();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const click = (e) => {
        e.preventDefault();
        const formData = new FormData();
            formData.append('username', username);
        formData.append('password', password);

        postLogin(formData);
    }

    return (
        <div>
            <Helmet>
                <title>{t('Authorization')}</title>
            </Helmet>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h4 className="m-auto">{t('Authorization')}</h4>
                    <p className={'mt-2'}>{t(er)}</p>
                    <p>{isFetching?<span>{t('Sending data, please wait')}</span>:null}</p>
                    <Form className="d-flex flex-column">
                        <div className='my-form mt-3'>
                            <input value={username}
                                   onChange={e => setUsername(e.target.value)}
                                   type="text"
                                   placeholder=""
                                   className='w-100'
                            />
                            <label >{t('login')}</label>
                        </div>
                        <div className='my-form mt-3'>
                            <input value={password}
                                   onChange={e => setPassword(e.target.value)}
                                   type="password"
                                   placeholder=""
                                   className='w-100'
                            />
                            <label >{t('password')}</label>
                        </div>

                        <Row className="d-flex justify-content-between m-0 mt-3 text-end">



                            <button onClick={click} className='my-btn type-4'>
                                <span>{t('Sign-In')}</span>
                            </button>


                            <div className='mt-3 text-center'>
                                {t('Don\'t have an account?')}  <NavLink to={REGISTRATION_ROUTE}>{t('Register!')}</NavLink>
                            </div>


                        </Row>

                    </Form>
                </Card>
            </Container>
        </div>
    );
}


export default Login;