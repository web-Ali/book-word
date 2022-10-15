import React from 'react';
import style from "../Main/Slider.module.scss";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE, USER_ROUTE} from "../../routing/consts";
import {httpOnHttps, nameLengthSlice} from "../../utils/customFunc";
import photo from "../../assets/images/unnamed.png";
import {useTranslation} from "react-i18next";


const ThreeAdversiting = ({data, type}) => {
    const { t } = useTranslation();

    return (
        <aside>
            <p className={'p1 fw-bold text-center mt-2 ' + (type === 'main' ? style.ColorWhite : null)}>{t('Advertising')}</p>
            <div className={style.threeContainer + ' ' + (type === 'main' ? style.mainthree : null)}>
            {data?.length ? data.map((value) => {
                return (
                    <div className={style.three } key={value.id}>

                        <div className={style.img}><NavLink
                            to={BOOK_ROUTE + '/' + value.id}><img className=''
                                                                  src={value.cover ? httpOnHttps(value.cover) : photo}
                                                                  alt=""/></NavLink></div>

                        <div><p><NavLink
                            to={USER_ROUTE + '/' + value.user.username}>{value.user.fullname.length ? value.user.fullname : value.user.username}</NavLink>
                        </p></div>
                        <div>
                            <p className='p3 medium'>
                                <NavLink to={BOOK_ROUTE + '/' + value.id}>
                                    {nameLengthSlice(value.name,30)}
                                </NavLink>
                            </p>
                        </div>
                    </div>
                )
            }) : ''
            }
            </div>
        </aside>
    );
};

export default ThreeAdversiting;