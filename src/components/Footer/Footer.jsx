import React from 'react';
import style from './Footer.module.scss'
import  './Footer.css'
import {OUR_MISSION_ROUTER, PRIVACY_POLICY_ROUTER, PUBLIC_OFFER_ROUTER, USER_ROUTE} from "../../routing/consts";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className={style.footerWrapper}>
            <div className="container pt-5">
                <div className="row">

                    <div className="col-12 col-sm-6 col-lg-3 text-center text-sm-start">
                        <div>
                            <h6 className='fw-bold'>{t('for writers')}
                            </h6>
                            <ul>
                                {/*<li className='p5 light'>Why you need to become an author</li>*/}
                                {/*<li className='p5 light'>Who needs to become an author</li>*/}
                                {/*<li className='p5 light'>General information</li>*/}
                                {/*<li className='p5 light'>Copyright agreement</li>*/}
                                {/*<li className='p5 light'>Advertising contract on the platform</li>*/}
                                <li className='p5 light'>{t('Targeted advertising')}: <br/>
                                    <a href="mailto:wowtargetad@outlook.com">wowtargetad@outlook.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center text-sm-start">
                        <div>
                            <h6 className="fw-bold">
                                {t('contact us')}
                            </h6>
                            <ul>
                                <li className='p5 light'><a href="mailto:admin@worldofwriter.com">admin@worldofwriter.com</a></li>
                                <li className='p5 light'><a href="mailto:sales@worldofwriter.com">sales@worldofwriter.com</a> </li>
                                <li className='p5 light'><a href="tel:+447462810354">+447462810354</a></li>
                                <li className='p5 light'>{t('Moderators')}: <br/>
                                    <Link to={USER_ROUTE + '/Forever'}>Forever</Link>,
                                    <Link to={USER_ROUTE + '/Ows'}> Ows</Link>,
                                    <Link to={USER_ROUTE + '/WOW'}> WOW</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center text-sm-start">
                        <div>
                            <h6 className="fw-bold">
                                {t('about the project')}
                            </h6>
                            <ul>
                                <li className='p5 light'><Link to={OUR_MISSION_ROUTER}>{t('Our Mission')}</Link></li>
                                <li className='p5 light'>{t('Further development of the project')}</li>
                                <li className='p5 light'><Link to={PRIVACY_POLICY_ROUTER}>{t('Privacy policy')}</Link></li>
                                <li className='p5 light'><Link to={PUBLIC_OFFER_ROUTER}>{t('Public offer')}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;