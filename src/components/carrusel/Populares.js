import React, {Component} from 'react';
import axios from 'axios'
import Modal from '../modalDetalle/Detalles'
import './cardslide.css'

class Populares extends Component{
    constructor(props){
        super(props)
        this.state = {
            becas:[]
        }
    }

    detallarItem= (item) => {
        this.setState ({activeItem:item,modal:!this.state.modal})
    }

    componentDidMount(){
        this.refreshList();
    }

    toggle = () =>{
        this.setState({modal: !this.state.modal});
    }
    refreshList = async() => { await
        await axios
        .get("https://restframeworkbecasandlogin.herokuapp.com/becas/list/")
        .then(res => this.setState({becas:res.data}))
        .catch(err => console.log(err))
    }

    /*
    listarPop = (data, key, orden) => {
        return data.sort(function (a, b) {
            var x = a[key],
            y = b[key];
    
            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
    
            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }*/

    render = () => {

        let orden = this.state.becas.sort(function (a, b) {//función para traer las tres becas con más vistas
            var x = a['vistas'];
            var y = b['vistas'];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }).slice(0,3);

        let first = orden[0];

        return (
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" background="#01e37f">
                <h1>Popular scolarships</h1>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                        {first && (
                            <div className="carousel-item active">
                                <section className="product">
                                    <div className="product__info">
                                        <div>
                                            <h2>{first.nombre}</h2>
                                        </div>
                                        <div className="descripcion">
                                            <h2>{first.universidad}</h2>
                                        </div>
                                        <div className="descripcion">
                                            <h2>{first.pais}</h2>
                                        </div>
                                        <button className="detalle--btn" onClick={() => this.detallarItem(first)}>Details</button>
                                    </div>
                                </section>
                            </div>
                        )}
                    <div>
                        {orden.slice(1,3).map((item)=>(
                            <div key={item.id}>        
                                <div className="carousel-item">
                                    <section className="product">
                                        <div className="product__info">
                                        <div>
                                            <h2>{item.nombre}</h2>
                                        </div>
                                            <div className="descripcion">
                                                <h2>{item.universidad}</h2>
                                            </div>
                                            <div className="descripcion">
                                                <h2>{item.pais}</h2>
                                            </div>
                                            <button className="detalle--btn" onClick={() => this.detallarItem(item)}>Detalles</button>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        ))}
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                    </div>
                </div>
                {this.state.modal ? (
                    <Modal
                    activeItem = {this.state.activeItem}
                    toggle= {this.toggle}
                    />
                ) : null }
                
            </div>
        )
    }
}

export default Populares;