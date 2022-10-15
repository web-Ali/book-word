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

const AdvertSlider = ({data, isFetching}) => {

    let settings = {
        dots: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 8000,
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


    return (
        <>
            {isFetching ? <div style={{height: '340px', paddingTop: '150px'}}><Loader fix={false}/></div> :
                <Slider {...settings}>
                    {data?.length && data.map((value) => {
                        return (
                            <div className={style.basicAdvertising} key={value.id}>
                                <div className={style.img}>
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

                                        {nameLengthSlice(value.name, 60)}

                                    </p></NavLink>
                                </Hyphenated>

                            </div>
                        )
                    })
                    }
                </Slider>

            }


        </>
    )
}
export default AdvertSlider;