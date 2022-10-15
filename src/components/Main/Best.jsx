import React, {useEffect, useState} from 'react';
import Loader from "../Loader/Loader";
import style from "./Slider.module.scss";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE, USER_ROUTE} from "../../routing/consts";
import {httpOnHttps, nameLengthSlice} from "../../utils/customFunc";
import photo from "../../assets/images/unnamed.png";
import Hyphenated from "react-hyphen";

const Best = ({data, isFetching}) => {
    const [oneBook, setoneBook] = useState({
        user: {
            username: '',
            fullname: ''
        }
    })
    const [data6, setdata6] = useState([])
    const [start, setStart] = useState(0)

    useEffect(()=>{
        setoneBook(data[start])
        setdata6(data.slice(start+1, start+7))
    },[data,start])


    const shuffleArray = ()=>{
        setStart(oldStart => (data.length - (oldStart + 7)) < 7 ? data.length >= 7 ? data.length - 7 : 0 : oldStart + 7)
    }
    const oldArray = ()=>{
        setStart(oldStart => oldStart - 7 < 0 ? 0 : oldStart - 7)
    }

    return (
        <>
            {isFetching ? <div style={{height: '340px', paddingTop: '150px'}}><Loader fix={false}/></div> :
                <div className="container">
                    <div className={style.best + ' row'}>
                        <div className="col-md-6 col-12 order-last order-md-first align-self-center">
                            <div className={style.left}>
                                {oneBook ?
                                    <><div className={style.item }>
                                        <div className={style.img}>
                                            <NavLink to={BOOK_ROUTE + '/' + oneBook.id}>
                                                <img className=''
                                                     src={oneBook.cover ? httpOnHttps(oneBook.cover) : photo}
                                                     alt=""/>
                                            </NavLink>
                                        </div>
                                        <p className='p5'>
                                            <NavLink
                                                to={USER_ROUTE + '/' + oneBook.user.username}>{oneBook.user.fullname.length ? oneBook.user.fullname : oneBook.user.username}
                                            </NavLink>
                                        </p>
                                        <Hyphenated>
                                            <NavLink to={BOOK_ROUTE + '/' + oneBook.id}><p className='p2'>

                                                {nameLengthSlice(oneBook.name, 20)}

                                            </p></NavLink>
                                        </Hyphenated>

                                    </div>

                                       <div className='text-center'>
                                           { data.length > 7 ?
                                               <div className={style.arrow}>
                                                   <span onClick={oldArray} className={style.prev + ' ' + (start == 0 ? style.disalbed : '')} />
                                                   <span onClick={shuffleArray} className={style.after + ' ' + (data.length - (start+7) <= 0 ? style.disalbed : '')} />
                                               </div>
                                            : null
                                           }

                                       </div> </>
                                    : null

                                }

                            </div>
                        </div>
                        <div className="col-md-6 col-12 order-md-2 order-1">
                            <div className={style.right}>
                                {data6.map((value) => {
                                    return (
                                        <div className={style.item} key={value.id}>
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
                                                    {nameLengthSlice(value.name, 18)}
                                                </p></NavLink>
                                            </Hyphenated>

                                        </div>
                                    )
                                })
                                }
                            </div>

                        </div>
                    </div>

                </div>
            }
        </>
    );
};

export default Best;