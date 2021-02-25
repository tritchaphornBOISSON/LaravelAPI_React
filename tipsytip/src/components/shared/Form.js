import React from 'react'
import { IconButton } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import WavesIcon from '@material-ui/icons/Waves';

import '../../styles/form.css'

class Form extends React.Component {
        state = {
            city: '',
            term: ''
        }
        handleClickSushi = (event) => {
            event.preventDefault();
            this.props.onSubmit(this.state={city:'lyon', term:'Sushi'})
        };
        handleClickBurger = (event) => {
            event.preventDefault();
            this.props.onSubmit(this.state={city:'lyon', term:'Burger'})
        };
        handleClickItalien = (event) => {
            event.preventDefault();
            this.props.onSubmit(this.state={city:'lyon', term:'Italien'})
        };
        
    onSearchSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
      }

    render() {

        return(
            <div className="form-wrapper" >
                
                <form>
                <div className="input-wrapper">
                    <input 
                        id="standard-basic" 
                        className="input term input-term" 
                        label="Term" 
                        variant="outlined" 
                        placeholder="Sushi, italien, français ..."
                        color="secondary"
                        value={this.state.term}
                        onChange={(e) => this.setState({ term: e.target.value })}
                        onRequestSearch={() => this.searchTasksByTitle(this.state.searchInput)}
                    ></input>
                    <input 
                        id="standard-basic" 
                        className="input city input-city" 
                        label="City" 
                        variant="outlined" 
                        placeholder="ville"
                        color="secondary"
                        value={this.state.city}
                        onChange={(e) => this.setState({ city: e.target.value })}
                        onRequestSearch={() => this.searchTasksByTitle(this.state.searchInput)}
                    ></input>
                    
                    <IconButton color="primary" className="search-button" onClick={this.onSearchSubmit}>
                    Rechercher
                    <SearchIcon  className="search-icon"/>
                    </IconButton>
                    <IconButton color="secondary" className="fish-button" onClick={this.handleClickSushi}>
                    Sushi
                    <WavesIcon  className="search-icon"/>
                    </IconButton>
                    <IconButton color="secondary" className="Fastfood-button" onClick={this.handleClickBurger}>
                    Burger
                    <FastfoodIcon  className="search-icon"/>
                    </IconButton>
                    <IconButton color="secondary" className="Italien-button" onClick={this.handleClickItalien}>
                    Italien
                    <RestaurantMenuIcon  className="search-icon"/>
                    </IconButton>
                
                    </div>
                    </form>
              
                </div>
        )
    }
}

export default Form