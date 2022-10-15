import React from 'react';
import photo from './../../../assets/images/unnamed.png'
import {Link} from "react-router-dom";
import {BOOK_ROUTE} from "../../../routing/consts";
import {httpOnHttps} from "../../../utils/customFunc";
import {useTranslation} from "react-i18next";

const ModerationItem = ({chapter, verify}) => {
    const { t } = useTranslation();

    return (
        <div className='container mt-2'>
            <div className="row">
                <div className="col-lg-2">
                    <img src={chapter?.cover ? httpOnHttps(chapter.cover) : photo} alt=""/>
                </div>
                <div className="col-lg-10 position-relative pb-5">
                    <Link to={BOOK_ROUTE+'/'+chapter.id}><h3 ><i>{chapter.name}</i></h3></Link>
                    <p><b>{t('Created')}:</b> {chapter.date}</p>
                    <hr/>
                    <p>{chapter.description}</p>

                       <div style={{position:'absolute', bottom:0, right:0, width: '100%', textAlign: 'center'}} >
                           {/*<button className='btn btn-secondary w-25 me-4'>For re-editing</button>*/}
                           <button onClick={() => verify(chapter.id, {
                               on_verification: null,
                               verified: false
                           })} className='my-btn type-4 me-4  btn-danger w-25'><span>{t('Reject')}</span>
                           </button>
                           <button onClick={() => verify(chapter.id, {
                               on_verification: null,
                               verified: true
                           })} className='my-btn type-5 w-25'><span>{t('Accept')}</span>
                           </button>
                       </div>


                </div>
            </div>
            <hr/>

        </div>
    );
};

export default ModerationItem;