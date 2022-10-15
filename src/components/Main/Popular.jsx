import React from 'react';
import Loader from "../Loader/Loader";
import style from "./Slider.module.scss";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE, USER_ROUTE} from "../../routing/consts";
import {httpOnHttps, nameLengthSlice, shuffle} from "../../utils/customFunc";
import photo from "../../assets/images/unnamed.png";
import Hyphenated from "react-hyphen";

const Popular = ({data, isFetching}) => {


    data = shuffle(data).slice(0, 12)
    return (
        <>
            {isFetching ? <div style={{height: '340px', paddingTop: '150px'}}><Loader fix={false}/></div> :
                <> {data.map((value) => {
                    return (
                        <div key={value.id}>
                            <div className={style.popular}>
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

                                        {nameLengthSlice(value.name, 35)}

                                    </p></NavLink>
                                </Hyphenated>
                            </div>
                        </div>
                    )
                })
                }
                </>
            }
        </>
    );
};

export default Popular;