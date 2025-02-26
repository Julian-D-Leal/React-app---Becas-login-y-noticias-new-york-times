/** @format */
import Card from "react-bootstrap/Card";
import React, { Component } from "react";
import ModalC from "../modalDetalle/Detalles";
import axios from "axios";
import "./card.css";
import Populares from "../carrusel/Populares";
import Noticias from "../nyt/Noticias";
import { Button} from "reactstrap";

class ListBecas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        nombre: "",
        categoria: "",
        porcentaje: 0,
        pais: "",
        universidad: "",
        requerimientos: "",
        vistas: 0,
      },
      becas: [],
      viewInternationals: 1,
      pop: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }


  detallarItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
    this.popularidad(item);
  };


  popularidad = async (item) => {
    //función para aumentar + 1 la vistas de la beca que es detallada
    item.vistas += 1;
    this.setState({ activeItem: item });
    await axios
      .put(
        "https://julian07.pythonanywhere.com/becas/list/" +
          item.id +
          "/",
        item
      )
      .then()
      .catch((err) => console.log(err));
  };

  refreshList = async () => {
    //función para traer todas las becas que existan en la BD
    await axios
      .get("https://julian07.pythonanywhere.com/becas/list/")
      .then((res) => this.setState({ becas: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    //función para activar el modal de detalles de una beca
    this.setState({ modal: !this.state.modal });
  };

  displayInternationals = (status) => {
    if (status) {
      return this.setState({ viewInternationals: 2 });
    }
    return this.setState({ viewInternationals: 1 });
  };
  

  render = () => {
    const { viewInternationals } = this.state;
    const items = this.state.becas.filter(
      (item) => item.categoria === viewInternationals
    );

    return (
      <div className='container'>
        <div className='text-center'>
          <h2 className='text-center mt-4'>News by NEW YORK TIMES</h2>
          <Noticias />
          <Populares />
          <div className='mt-4'>
            <button
              onClick={() => this.displayInternationals(false)}
              className='btn btn-primary'
            >
              NATIONAL SCHOLARSHIPS
            </button>
            <button
              onClick={() => this.displayInternationals(true)}
              className='btn btn-primary'
            >
              INTERNATIONAL SCHOLARSHIPS
            </button>
          </div>
        </div>
        {items.map((item) => (
          <Card className='text-center mt-3 mb-3' key={item.id}>
            <Card.Header>SCOLARSHIP</Card.Header>
            <Card.Body>
              <Card.Title>{item.nombre}</Card.Title>
              <Card.Text>University: {item.universidad}</Card.Text>
              <Button className='mt-4' onClick={() => this.detallarItem(item)}>
                Details
              </Button>
            </Card.Body>
            <Card.Footer>{item.pais}</Card.Footer>
          </Card>
        ))}
        {this.state.modal && (
          <ModalC activeItem={this.state.activeItem} toggle={this.toggle} />
        )}
      </div>
    );
  };
}

export default ListBecas;
