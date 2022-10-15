import React, {useEffect, useRef, useState} from 'react';
import {Modal} from "react-bootstrap";
import style from "./ModalEditPhoto.module.css";
import {useTranslation} from "react-i18next";

const ModalBackground = ({savePhoto,username}) => {

    const [showModalEditPhoto, setShowModalEditPhoto] = useState(false);
    const [image, setImage] = useState();
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef();
    const { t } = useTranslation();

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null)
        }
    }, [image]);

    const handleClose = () => setShowModalEditPhoto(false);
    const handleShow = () => setShowModalEditPhoto(true);

    const onClickPhoto = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('cover',image);
        savePhoto(formData,username)
            .then(
                handleClose()
            )
    }
    return (
        <div>
            <button onClick={handleShow} className='my-btn type-1-blue '>
                <span><i className="fas fa-image"/> {t('Change the background')}</span>
            </button>
            <div >
                <Modal show={showModalEditPhoto} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('New Photo for background')} <br/> <span style={{fontSize: 14}}>{t('select a photo with an aspect ratio of 4 : 1')}</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className={style.ModalPhotoEdit +' ' + style.ModalBackgroundPhotoEdit} >
                            {preview ? (
                                <div className='mb-2'>
                                    <div className='mb-2'><img src={preview} alt={"preview"}/></div>
                                    <button
                                        className='my-btn type-1 me-3'
                                        onClick={(event) => {
                                            event.preventDefault();
                                            fileInputRef.current.click();
                                        }}
                                    >
                                        {t('Choose another cover')}
                                    </button>
                                    <button
                                        className='my-btn type-1-blue'
                                        onClick={onClickPhoto}
                                    >
                                        {t('Save')}
                                    </button>
                                </div>

                            ) : (
                                <button
                                    style={{marginTop:100}}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        fileInputRef.current.click();
                                    }}
                                >
                                    {t('Сhoose a cover')}
                                </button>
                            )}

                            <input type="file"
                                   style={{display: "none"}}
                                   ref={fileInputRef}
                                   accept="image/*"
                                   onChange={(event) => {
                                       const file = event.target.files[0];
                                       if (file && file.type.substr(0, 5) === "image") {
                                           setImage(file);
                                       } else {
                                           setImage(null);
                                       }
                                   }}
                            />

                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}


export default ModalBackground;