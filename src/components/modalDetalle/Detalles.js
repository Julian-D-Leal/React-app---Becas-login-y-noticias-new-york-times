import React, { Component } from "react"
import './tirar.css'

import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
 
class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  render() {
    const {toggle} = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Scholarship's details </ModalHeader>
          <ModalBody>
            <ul className="list-group">
              <li className="list-group-item">
                  Scholarship offered:
                  <span className="Tirar">{this.state.activeItem.nombre}</span>
              </li> 
              <li className="list-group-item">
                  Category: 
                  <span className="Tirar">{this.state.activeItem.categoria === 1 ? 'National' : 'International'}</span>
              </li> 
              <li className="list-group-item">
                  Percentage:
                  <span className="Tirar">{this.state.activeItem.porcentaje}%</span>
              </li> 
              <li className="list-group-item">
                  Scholarship's country:
                  <span className="Tirar">{this.state.activeItem.pais}</span>
              </li> 
              <li className="list-group-item">
                  Bidder university:
                  <span className="Tirar">{this.state.activeItem.universidad}</span>
              </li> 
              <li className="list-group-item">
                  Requirements:
                  <span className="Tirar">{this.state.activeItem.requerimientos}</span>
              </li> 
          </ul>
        </ModalBody>
      </Modal>
    );
  }
}
export default CustomModal;