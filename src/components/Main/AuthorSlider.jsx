import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import photo from "../../assets/images/profile.jpg";
import authorDay from "../../assets/images/icons/иконка автор дня.svg";
import style from "./Slider.module.scss";
import "../../containers/Main/slider.scss";
import {Link} from "react-router-dom";
import {USER_ROUTE} from "../../routing/consts";
import {httpOnHttps} from "../../utils/customFunc";
import {useTranslation} from "react-i18next";

const AuthorSlider = ({data, type}) => {
    const { t } = useTranslation();

    return (
        <aside>
            <div className='text-center mt-4'><img src={authorDay} alt=""/></div>
            <p className={'p1 fw-bold text-center  ' + (type === 'main' ? style.ColorWhite : null)}>{t('Author of the day')}  </p>
            <div className={style.authorContainer + ' ' + (type === 'main'? style.mainAuthor : null)}>
            {data?.length ? data.map((value) => {
                return (
                    <div className={style.author} key={value.id}>
                        {/*<i className="fas fa-crown"></i>*/}
                        <div className={style.img}><Link
                            to={USER_ROUTE + '/' + value.username}><img className=''
                                                                        src={value.image ? httpOnHttps(value.image) : photo}
                                                                        alt=""/></Link></div>
                        <div><p><Link
                            to={USER_ROUTE + '/' + value.username}>{value.fullname.length ? value.fullname : value.username}</Link>
                        </p></div>

                    </div>
                )
            }) : null
            }
            </div>


        </aside>
    )
}
export default AuthorSlider;