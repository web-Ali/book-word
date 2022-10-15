import React, {useState} from 'react';
import style from "./Book.module.scss";
import photoProfile from "../../assets/images/profile.jpg";
import AddAnswerCommentBook from "./AddAnswerCommentBook";
import ModalAccept from "../UI/Modal/ModalAccept";
import {USER_ROUTE} from "../../routing/consts";
import {Link} from "react-router-dom";
import {httpOnHttps} from "../../utils/customFunc";
import {useTranslation} from "react-i18next";

const BookCommentsChildsItem = ({item,comId,addCom,deleteThisComment,bookId}) => {
    const [showAnswer, setShowAnswer] = useState(false);

    function offAnswerInput (bul) {
        setShowAnswer(bul)
    }
    function deleted () {
        deleteThisComment(item.id, bookId)
    }
    const { t } = useTranslation();


    return (
        <div>
            <div className={style.comWrap + ' row ps-4 mt-3'}>
                <div className={style.photoprofile + ' col-lg-2 col-xl-1 col-sm-2 col-3 p-0'}>
                    <Link to={USER_ROUTE+'/'+item?.user?.username}><img src={item?.user?.image ? 'https://worldofwriter.com'+httpOnHttps(item.user.image) : photoProfile} alt=""/></Link>
                </div>
                <div className="ms-lg-3 ms-xl-0 col-lg-10 col-xl-11 col-sm-10 col-9">
                    <div className={style.usernameCom}>
                        <Link to={USER_ROUTE+'/'+item?.user?.username}>{item.user.fullname ? item.user.fullname : item.user.username}</Link>
                        <span>{item.created_at.substr(0, 10)
                    +' ' + item.created_at.substr(11, 8)}</span></div>
                    <div className={style.textCom}>{item.text}
                        {
                            showAnswer
                                ?
                                <div>
                                    <div onClick={() => setShowAnswer(false)}  className={style.closeCom}>x</div>
                                    <AddAnswerCommentBook
                                        offAnswerInput={offAnswerInput} addCom={addCom} comId={comId}  username={item.user.username}/>
                                </div>
                                :
                                null
                        }
                    </div>
                    <div className='d-flex mt-2'>
                        <div onClick={() => setShowAnswer(true)} className={style.answer}>{t('Answer')}</div>
                        {localStorage.getItem('username') === item.user.username &&
                        <ModalAccept
                            button={<div className={style.deleteCom}>Delete</div>}
                            text={t('Delete comment?')}
                            desc={t('After deleting comments, delete forever')}
                            call={deleted}
                        />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCommentsChildsItem;