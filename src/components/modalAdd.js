import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
 
class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  
  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render(){
      const {toggle, onSave} = this.props;
      return(
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>University scholarship</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="nombre">Name:</Label>
                            <Input
                            type="text"
                            name="nombre"
                            value={this.state.activeItem.nombre}
                            onChange={this.handleChange}
                            placeholder="Type the name of the scholarship"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="categoria">Category:</Label>
                            <Input
                            type="text"
                            name="categoria"
                            value={this.state.activeItem.categoria}
                            onChange={this.handleChange}
                            placeholder="Type 1 for national or 2 for international"
                            />                           
                        </FormGroup>
                        <FormGroup>
                            <Label for="porcentaje">Percentage:</Label>                            
                            <Input
                            type="text"
                            name="porcentaje"
                            value={this.state.activeItem.porcentaje}
                            onChange={this.handleChange}
                            placeholder="Type scholarship's percentage"
                            />                                
                        </FormGroup>
                        <FormGroup>
                            <Label for="pais">Country:</Label>
                            <Input
                            type="text"
                            name="pais"
                            value={this.state.activeItem.pais}
                            onChange={this.handleChange}
                            placeholder="Type scholarship's country"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="universidad">University:</Label>
                            <Input
                            type="text"
                            name="universidad"
                            value={this.state.activeItem.universidad}
                            onChange={this.handleChange}
                            placeholder="Type scholarships's university"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="requerimientos">Requirements:</Label>
                            <Input
                            type="textarea"
                            name="requerimientos"
                            value={this.state.activeItem.requerimientos}
                            onChange={this.handleChange}
                            placeholder="type scholarships's requirements"
                            />                          
                        </FormGroup>
                        <FormGroup>
                            <Label for="vistas">Views:</Label>
                            <Input
                            type="text"
                            name="vistas"
                            value={this.state.activeItem.vistas}
                            onChange={this.handleChange}
                            />                          
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Guardar
                    </Button>
                </ModalFooter>
            </Modal>
      );
  }
}

export default AddModal;