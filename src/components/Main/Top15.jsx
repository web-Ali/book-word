import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import photo from "../../assets/images/unnamed.png";
import style from "./Slider.module.scss";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE, USER_ROUTE} from "../../routing/consts";
import Loader from "../Loader/Loader";
import Hyphenated from 'react-hyphen';
import {httpOnHttps, nameLengthSlice} from "../../utils/customFunc";
import {useTranslation} from "react-i18next";

const Top15 = ({data, isFetching}) => {
    const { t } = useTranslation();


    let settings = {

        infinite: false,
        autoplay: true,
        autoplaySpeed: 8000,
        adaptiveHeight:false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };
    let arrayBig= [1,4,7,10,13,16,19,22,25,28,31,34]

    return (
        <>
            {isFetching ? <div style={{height: '340px', paddingTop: '150px'}}><Loader fix={false}/></div> :
               <> <Slider {...settings}>
                    {data?.length && data.map((value , index) => {
                        return (
                            <div className={style.top15 } key={value.id}>
                                <div className={style.img} >
                                    <NavLink to={BOOK_ROUTE + '/' + value.id}>
                                        <img className=''
                                             src={value.cover ? httpOnHttps(value.cover) : photo}
                                             alt=""/>
                                    </NavLink>
                                </div>
                                <p className='p5'>
                                    <NavLink
                                        to={USER_ROUTE + '/' + value.user.username}>{value.user.fullname.length ? value.user.fullname : value.user.username}
                                    </NavLink>
                                </p>
                                <Hyphenated>
                                    <NavLink to={BOOK_ROUTE + '/' + value.id}><p className='p2'>

                                        {nameLengthSlice(value.name, 30)}

                                    </p></NavLink>
                                </Hyphenated>

                            </div>
                        )
                    })
                    }
                </Slider>
                   {/*<div className='text-end pe-3'><button className='my-btn type-2'><span>{t('see_more')}  -></span></button></div>*/}
                </>
            }


        </>
    )
}
export default Top15;