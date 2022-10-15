import React, {useState} from 'react';
import style from "../Book/Book.module.scss";
import photoProfile from "../../assets/images/profile.jpg";
import AddAnswerCommentProfile from "./AddAnswerCommentProfile";
import ModalAccept from "../UI/Modal/ModalAccept";
import {USER_ROUTE} from "../../routing/consts";
import {Link} from "react-router-dom";
import {httpOnHttps} from "../../utils/customFunc";
import {useTranslation} from "react-i18next";

const BookCommentsChildsItem = ({item,commentId,addCom,deleteThisComment,username}) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const { t } = useTranslation();

    function offAnswerInput (bul) {
        setShowAnswer(bul)
    }
    function deleted () {
        deleteThisComment(item.id, username)
    }

    return (
        <div>
            <div className={style.comWrap + ' row ps-sm-2 ps-0 ms-0 mt-3'}>
                <div className={style.photoprofile + '  col-xl-2 col-lg-3 col-sm-2 col-3 p-0 p-0'}>
                    <Link to={USER_ROUTE + '/' + item?.user.username} ><img src={item?.user?.image ? 'https://worldofwriter.com'+httpOnHttps(item.user.image) : photoProfile} alt=""/></Link>
                </div>
                <div className="ms-lg-3 col-xl-10 col-lg-9 col-sm-10 col-9">
                    <div className={style.usernameCom}><Link to={USER_ROUTE+'/'+item?.user?.username}>
                        {item.user.fullname ? item.user.fullname : item.user.username} </Link>
                        <span>{item.created_at.substr(0, 10)
                    +' ' + item.created_at.substr(11, 8)}</span></div>
                    <div className={style.textCom }>{item.text}
                        {
                            showAnswer
                                ?
                                <div>
                                    <div onClick={() => setShowAnswer(false)}  className={style.closeCom}>x</div>
                                    <AddAnswerCommentProfile offAnswerInput={offAnswerInput} addCom={addCom} commentId={commentId} username={item.user.username}/>
                                </div>
                                :
                                null
                        }
                    </div>
                    <div className='d-flex mt-2'>
                        <div onClick={() => setShowAnswer(true)} className={style.answer}>Answer</div>
                        {(localStorage.getItem('username') === item.user.username ||
                        username === localStorage.getItem('username')) &&
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