import React from 'react';
import style from './MyLibrary.module.scss'
import photo from "../../../assets/images/unnamed.png";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE} from "../../../routing/consts";
import {Tabs} from "react-bootstrap";
import {Tab} from "bootstrap";
import {useTranslation} from "react-i18next";
import {httpOnHttps} from "../../../utils/customFunc";

const MyLibrary = (props) => {
    const {t} = useTranslation();

    return (
        <div>
            <Tabs defaultActiveKey="bookmarks" id="uncontrolled-tab-example" className={style.nav}>
                <Tab tabClassName eventKey="bookmarks" title={t('Bookmarks')}>
                    <div className='row pb-5'>
                        {
                            Array.isArray(props.data) ? props.data.map((mark) => {
                                return <div className="col-sm-3 col-6 text-center" key={mark.id}>
                                    <NavLink to={BOOK_ROUTE + '/' + mark.id}>

                                        <div className={style.imgCont}>
                                            <img className={style.img}
                                                 src={mark?.cover ? httpOnHttps( mark.cover) : photo}
                                                 alt=""/>
                                        </div>
                                        <p  className='p4 text-center'>{mark.user.fullname}</p>
                                        <p className='p2 semibold text-center'>{mark.name}</p>
                                    </NavLink>
                                </div>
                            }) : <div>
                                {t('You don\'t have any bookmarks')}
                            </div>
                        }


                    </div>
                </Tab>
                <Tab eventKey="purchased" title={t('Purchased')}>
                    <div className='row pb-5'>
                        {
                            Array.isArray(props.dataPurchased) ? props.dataPurchased.map((mark) => {
                                return <div className="col-sm-3 col-6 text-center" key={mark.id}>
                                    <NavLink to={BOOK_ROUTE + '/' + mark.id}>
                                        <div className={style.imgCont}>
                                            <img className={style.img}
                                                 src={mark?.cover ? httpOnHttps( mark.cover) : photo}
                                                 alt=""/>
                                        </div>
                                        <p  className='p4 text-center'>{mark.user.fullname}</p>
                                        <p className='p2 semibold text-center'>{mark.name}</p>
                                    </NavLink>
                                </div>
                            }) : <div>
                                {t('You don\'t have any purchased')}
                            </div>
                        }
                    </div>
                </Tab>

            </Tabs>

        </div>
    );
};

export default MyLibrary;