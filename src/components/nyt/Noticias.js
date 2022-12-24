/** @format */

import React, { Component } from "react";
import axios from "axios";
import "./Noticias.css";

class Noticias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticias: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = async () => {
    await axios
      .get(
        "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=AmrV4WvGf6xJJBXTAwZJbegx9XxErAOJ"
      )
      .then((res) => this.setState({ noticias: res.data.results }))
      .catch((err) => {
        console.log(err);
      });
  };

  render = () => {
    const items = this.state.noticias;
    return (
      <div className='row row-cols-1 row-cols-md-2 g-4 mt-4'>
        {items.slice(4, 10).map((item) => (
          <div className='col' key={item.title}>
            <div className='card h-100 border-primary mb-3'>
              <img
                src={item.multimedia[0].url}
                alt={item.title}
                className='imagen rounded'
              />
              <div className='card-body'>
                <h2 className='card-title'>{item.title}</h2>
                <p className='card-text'>{item.abstract}</p>
              </div>
              <div className="card-footer bg-transparent border-primary"><a className="btn btn-primary" href={item.short_url}>More info</a></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
}
export default Noticias;
