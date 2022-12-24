/** @format */

import axios from "axios";
import React, { Component } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AddModal from "./modalAdd";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import ModalD from "./ModalD";

class RootDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        nombre: "",
        categoria: "",
        porcentaje: 0,
        pais: "",
        universidad: "",
        requerimientos: "",
        vistas: 0,
      },
      becas: [],
      AlertA: false,
      AlertE: false,
      AlertD: false,
      modalDelete: false,
      del: {}
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = async () => {
    await axios
      .get("https://restframeworkbecasandlogin.herokuapp.com/becas/list/")
      .then((res) => this.setState({ becas: res.data }))
      .catch((err) => console.log(err));
  };

  createBeca = () => {
    const item = {
      nombre: "",
      categoria: "",
      porcentaje: 0,
      pais: "",
      universidad: "",
      requerimientos: "",
      vistas: 0,
    };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  toggleModalD = () => {
    this.setState({ modalDelete: !this.state.modalDelete });
  }
  
  renderBecas = () => {
    return (
      <div>
        {this.state.becas.map((item) => (
          <Card className='text-center mt-3 mb-3' key={item.id}>
            <Card.Header>SCHOLARSHIP</Card.Header>
            <Card.Body>
              <Card.Title>{item.nombre}</Card.Title>
              <Card.Text>University: {item.universidad}</Card.Text>
              <ButtonGroup className='mt-4'>
                <Button onClick={() => this.editItem(item)}>Edit</Button>
                <Button
                  onClick={() => this.openModalD(item)}
                  variant='danger'
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Card.Body>
            <Card.Footer>{item.pais}</Card.Footer>
          </Card>
        ))}
      </div>
    );
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = async (item) => {
    this.toggle();
    if (item.id) {
      await axios
        .put(
          `https://restframeworkbecasandlogin.herokuapp.com/becas/list/${item.id}/`,
          item
        )
        .then((res) => {
          this.refreshList();
          
        });
      return this.showAlertE();
    }

    await axios
      .post(
        "https://restframeworkbecasandlogin.herokuapp.com/becas/list/",
        item
      )
      .then((res) => this.refreshList())
      .catch((err) => console.error(err));  
      this.showAlertA();
  };

  openModalD = (item) => {
    this.setState({del: item});
    this.toggleModalD();
  };

  handleDelete = async (item) => {
    await axios
      .delete(
        `https://restframeworkbecasandlogin.herokuapp.com/becas/list/${item.id}/`
      )
      .then((res) => this.refreshList())
      .catch(err => console.log(err))
      this.toggleModalD();
      this.showAlertD();
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  showAlertA = () => {
    this.setState({AlertA: true});
    setTimeout(() => {
      this.setState({AlertA: false});
    }, 5000);
  }

  showAlertE = () => {
    this.setState({AlertE: true});
    setTimeout(() => {
      this.setState({AlertE: false});
    }, 5000);
  }

  showAlertD = () => {
    this.setState({AlertD: true});
    setTimeout(() => {
      this.setState({AlertD: false});
    }, 5000);
  }

  

  render() {
    return (
      <>
        {this.state.AlertA && <Alert variant="success">Scholarship was added successfully</Alert>}
        {this.state.AlertE && <Alert variant="success">Scholarship was edited successfully</Alert>}
        {this.state.AlertD && <Alert variant="danger">Scholarship was deleted</Alert>}
        <div className='container text-center'>
          <div className='mt-4 col-8 offset-2 '>
            <div className='d-flex justify-content-end'>
              <ButtonGroup className='mb-3 '>
                <Link className='btn btn-primary' to='/'>
                  Go back
                </Link>
                <Button variant='success' onClick={this.createBeca}>
                  Add scholarship
                </Button>
              </ButtonGroup>
            </div>
            <h2>Scholarship list</h2>
            <div>{this.renderBecas()}</div>
            {this.state.modal && (
              <AddModal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            )}
            {this.state.modalDelete && (
              <ModalD
                activeItem={this.state.del}
                open = {this.state.modalDelete}
                toggle={this.toggleModalD}
                onDelete={this.handleDelete}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default RootDashboard;
