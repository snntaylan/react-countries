import React, { Component } from 'react';
import api from '../../api';
import axios from 'axios';

class Countries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }
  handleChange(event) {
    this.setState({ [event.target.countries]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const country = {
      name: this.state.countries
    };
    axios.post(`https://jsonplaceholder.typicode.com/countries`, {country})
      .then(res => {
        console.log(res.data)
        // Redirect to the Home page
        this.props.history.push('/')
      })
  }


  deleteCountry(countryId){
    api.deleteCountry(countryId)
    .then(data =>{
      this.setState({
        countries: this.state.countries.filter(c => c._id !== countryId),
        message: data.message
      })
      setTimeout(()=> {
        this.setState({
          message: null
        })
      }, 3000)
    })
  }

  addCountry(countryId){
    api.addCountry(countryId)
    .then(data => {
      this.setState({

      })
    })
  }

  render() {
    return (
      <div className="Countries">
        <h2>List of countries</h2>
        <ul>
        {this.state.countries.map(c => <li key={c._id}>
        {c.name}<button onClick={()=>this.deleteCountry(c._id)}>Delete</button>
        </li>)}
        </ul>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
        <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          Country Name:
          <input type="text" name="name" onChange={this.handleChange.bind(this)} />
          <button type="submit">Add</button>
        </form>
      </div>
      </div>
    );
  }
  componentDidMount() {
    api.getCountries()
      .then(countries => {
        console.log(countries)
        this.setState({
          countries: countries
        })
      })
      .catch(err => console.log(err))
  }
}

export default Countries;
