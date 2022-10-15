import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

const ModalInfo = ({button, text, desc, variant="secondary", showAtStart=false, backdrop=undefined}) => {
    const [show, setShow] = useState(showAtStart);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <span onClick={handleShow}> {button} </span>


            <Modal show={show} onHide={handleClose} backdrop={backdrop}>
                <Modal.Header closeButton>
                    <Modal.Title>{text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{desc}</Modal.Body>
                <Modal.Footer>
                    <Button variant={variant} onClick={handleClose}>
                        OK
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalInfo;