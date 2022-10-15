import React, {useState} from 'react';
import style from "./Book.module.scss";
import photoProfile from "../../assets/images/profile.jpg";
import AddAnswerCommentBook from "./AddAnswerCommentBook";
import BookCommentsChilds from "./BookCommentsChilds";
import ModalAccept from "../UI/Modal/ModalAccept";
import {Link} from "react-router-dom";
import {USER_ROUTE} from "../../routing/consts";
import {httpOnHttps} from "../../utils/customFunc";
import {useTranslation} from "react-i18next";

const BookCommentsItem = ({item,addCom,deleteThisComment,bookId}) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showChilds, setShowChilds] = useState(false);
    const { t } = useTranslation();

    function offAnswerInput (bul) {
        setShowAnswer(bul)
    }

    function deleted () {
        deleteThisComment(item.id, bookId)
    }

    return (
        <div className={style.comWrap + ' container'}>
            <div className={' row ps-sm-4 ps-0 mt-3 mb-3'}>
                <div className={style.photoprofile + ' col-lg-1 col-sm-2 col-3 p-0 p-0'}>
                    <Link to={USER_ROUTE + '/' + item?.user?.username}><img
                        src={item?.user?.image ? 'https://worldofwriter.com'+httpOnHttps(item.user.image) : photoProfile} alt=""/></Link>
                </div>
                <div className="ms-lg-3 col-lg-11 col-sm-10 col-9">
                    <div className={style.usernameCom}>
                        <Link
                            to={USER_ROUTE + '/' + item?.user?.username}>{item.user.fullname ? item.user.fullname : item.user.username}</Link>
                        <span>{item.created_at.substr(0, 10)
                        + ' ' + item.created_at.substr(11, 8)}</span></div>
                    <div className={style.textCom}>{item.text}
                        {
                            showAnswer
                                ?
                                <div>
                                    <div onClick={() => setShowAnswer(false)} className={style.closeCom}>x</div>
                                    <AddAnswerCommentBook offAnswerInput={offAnswerInput}  addCom={addCom} comId={item.id}
                                                          username={item.user.username}/>
                                </div>
                                :
                                null
                        }
                    </div>
                    <div className='d-flex mt-2'>
                        <div onClick={() => setShowAnswer(true)} className={style.answer}>{t('Answer')}</div>
                        {localStorage.getItem('username') === item.user.username &&
                        <ModalAccept
                            button={<div className={style.deleteCom}>{t('Delete')}</div>}
                            text={t('Delete comment?')}
                            desc={t('All comments on this thread will be deleted.')}
                            call={deleted}
                        />
                        }
                    </div>

                    {item?.childs && item.childs.length ?
                        <div>
                            <div>
                                {showChilds ?
                                    <div>
                                        <div className={style.hiddenAnswer} onClick={() => setShowChilds(false)}><i
                                            className="fas fa-sort-up"/> {t('Hide answers')}
                                        </div>
                                        <div>
                                            <BookCommentsChilds bookId={bookId} deleteThisComment={deleteThisComment} addCom={addCom}
                                                                comId={item.id} childs={item.childs}/>
                                        </div>
                                    </div>
                                    :
                                    <div className={style.showAnswer} onClick={() => setShowChilds(true)}><i
                                        className="fas fa-sort-down"/>
                                        <span>{t('Show answers')}</span></div>
                                }


                            </div>

                        </div>
                        :
                        null
                    }

                </div>
            </div>
        </div>
    );
};

export default BookCommentsItem;