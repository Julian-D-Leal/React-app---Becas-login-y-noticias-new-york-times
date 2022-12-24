import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from "reactstrap";

const ModalD = ({ activeItem, open, toggle, onDelete }) => {

    const [actual, setActual] = useState(activeItem);

  return (
      <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Warning</ModalHeader>
      <ModalBody>
        ¿Are you sure to delete the scholarship <b>{actual.nombre}</b>?
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
        <Button color='danger' onClick={() => onDelete(actual)}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalD;