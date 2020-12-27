import React from 'react';
import {Modal,Button} from 'react-bootstrap';

const ModalIngs=({show,handleClose,title,body,btnText})=> {  
    return (
        <Modal size="xl" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {body}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              {btnText}
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
  
export default ModalIngs;