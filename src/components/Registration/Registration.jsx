import React, {useEffect, useState} from 'react';
import {LOGIN_ROUTE,} from "../../routing/consts";
import {NavLink,} from "react-router-dom";
import { Card, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {validateEmail} from "../../utils/customFunc";
import {useTranslation} from "react-i18next";
import Helmet from "react-helmet";

const Registration = (props) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [pasError, setPasError] = useState('')

    const { t } = useTranslation();

    const [register, setRegister] = useState(false)

    useEffect(() => {
        if (props.is_registered) {
            setRegister(true);
        }
    }, [props.is_registered])

    const click = (event) => {
        event.preventDefault();

        if (username === '' || email === '' || fullname === '' || rePassword === '' || password === '') {
            setPasError(t('Fill in the blank fields!'))
            return
        }
        if (password !== rePassword || password === '') {
            setPasError(t('Password mismatch!'))
            return
        }
        if (!validateEmail(email)) {
            setPasError(t('Enter a valid email!'))
            return
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('fullname', fullname);
        formData.append('password', password);
        try {
            props.registration(formData)
        } catch (e) {
            console.log(e)
        }

    };
    return (
        <div>
            <Helmet>
                <title>{t('Registration')}</title>
            </Helmet>
            <Container
                className="d-flex justify-content-center align-items-center mt-1"
                style={{height: window.innerHeight - 54}}
            >
                {register ? <div>
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading text-center">{t('Well done!')}</h4>
                            <p>{t('You have registered! To get started, you need to pass verification! An email with confirmation instructions has been sent to your email address.')} </p>
                            <hr/>
                            <p className="mb-0 text-center"><NavLink to={LOGIN_ROUTE}><span
                                className='text-decoration-underline'>{t('Go to!')}</span></NavLink></p>
                        </div>
                    </div>
                    :
                    <Card style={{width: 600}} className="p-5">
                        <h4 className="m-auto">{t('Registration')}</h4>
                        <p className={'mt-2 text-danger'}>{pasError}</p>
                        <p className={'mt-2 text-danger'}>{props.error}</p>
                        <Form className="d-flex flex-column">
                            <div className='my-form mt-3'>
                                <input value={fullname}
                                       onChange={e => setFullname(e.target.value)}
                                       type="text"
                                       placeholder=""
                                       className='w-100'
                                />
                                <label >{t('full name')}</label>
                            </div>
                            <div className='my-form mt-3'>
                                <input value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       type="email"
                                       placeholder=""
                                       className='w-100'
                                />
                                <label >email</label>
                            </div>

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
                            <div className='my-form mt-3'>
                                <input value={rePassword}
                                       onChange={e => setRePassword(e.target.value)}
                                       type="password"
                                       placeholder=""
                                       className='w-100'
                                />
                                <label >{t('Repeat your password')}</label>
                            </div>

                            <Row className="d-flex justify-content-between m-0 mt-3 text-end">
                                <button onClick={click} className='my-btn type-4'>
                                    <span>{t('Register now')}</span>
                                </button>
                                <div className='mt-3 text-center'>
                                    {t('Have an account?')} <NavLink to={LOGIN_ROUTE}>{t('Sign in!')}</NavLink>
                                </div>
                            </Row>
                        </Form>
                    </Card>
                }
            </Container>
        </div>
    );
};

export default Registration;