import React from 'react';
import style from "../../Profile/MyProfile/MyProfile.module.scss";
import {useTranslation} from "react-i18next";

const UserInfo = ({user}) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="row">
                <div className="col-lg-6 p-0 m-0">

                    <div className={style.block}>
                        <p className='p3 medium'>{t('Name')}:</p>
                        <div style={{wordWrap: 'break-word'}} className={style.infoText}>{user.fullname ? user.fullname : '-'}</div>
                    </div>
                    <div className={style.block}>
                        <p className='p3 medium'>{t('Personal link')}:</p>
                        <div style={{wordWrap: 'break-word'}} className={style.infoText}>{window.location.origin + '/user/' + user.username}</div>

                    </div>

                </div>
                <div className="col-lg-6 p-0 m-0">
                    <div className={style.blockBio}>
                        <p className='p3 medium pt-2'>{t('About myself')} </p>
                        <div
                            className={style.bio}>{user.bio ? user.bio : t('The user did not tell anything about himself')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;