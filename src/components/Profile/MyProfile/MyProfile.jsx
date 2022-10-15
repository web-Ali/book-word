import React, { useState} from 'react';
import style from './MyProfile.module.scss'
import {useTranslation} from "react-i18next";

const MyProfile = ({user, updateProfile}) => {
    const [editBio, setEditBio] = useState(false);
    const [bio, setBio] = useState(user.bio)
    const [editFullname, setEditFullname] = useState(false);
    const [fullname, setFullname] = useState(user.fullname)
    const { t } = useTranslation();


    const save = (type) => {
        const formData = new FormData();
        if (type === 'bio') {
            formData.append('bio', bio)
        } else if (type === 'fullname') {
            formData.append('fullname', fullname)
        }
        updateProfile(formData, localStorage.getItem('username'))
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-6 p-0 m-0">
                    <div className={style.block}>
                        <p className='p3 medium'>{t('name')}</p>
                        {
                            editFullname ?
                                <div className='my-form'>
                                    <input
                                       type='text'
                                       autoFocus={true}
                                       defaultValue={user.fullname}
                                       onChange={(e) => setFullname(e.target.value)}
                                       onBlur={() => {save('fullname'); setEditFullname(false) }}
                                /></div> :
                                <div onClick={() => setEditFullname(true)} style={{wordWrap: 'break-word'}} className={style.infoText}>{user.fullname ? user.fullname : '-'}</div>
                        }
                    </div>
                    <div className={style.block}>
                        <p className='p3 medium'>{t('personal link')}</p>
                        <div className={style.infoText} style={{wordWrap: 'break-word'}}>{window.location.origin + '/user/' + user.username}</div>

                    </div>
                    <div className={style.block}>
                        <p className='p3 medium'>email:</p>
                        <div style={{wordWrap: 'break-word'}} className={style.infoText}>{user.email ? user.email : '-'}</div>

                    </div>
                </div>
                <div className="col-lg-6 p-0 m-0">
                    <div className={style.blockBio}>
                        <p className='p3 medium '>{t('about myself')} </p>
                        {
                            editBio ? <div className='my-form'><textarea className=' w-100'
                                                defaultValue={user.bio}
                                                autoFocus={true}
                                                onChange={(e) => setBio(e.target.value)}
                                                onBlur={() => {save('bio'); setEditBio(false) }}
                                                style={{height: 220}}
                                /></div>
                                :
                                <div onClick={() => setEditBio(true)}
                                     className={style.bio}>{user.bio ? user.bio : t('You haven\'t told anything about yourself...')}</div>

                        }


                    </div>
                </div>
            </div>


        </div>
    );
};

export default MyProfile;