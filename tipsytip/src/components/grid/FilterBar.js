import React from 'react'

import '../../styles/filterBar.css'
import InputLabel from '@material-ui/core/InputLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

class FilterBar extends React.Component {

    state = {
        sortValue: '',
        showFilters: false,
        prices: [
            {id: 1, value: "$", isChecked: false},
            {id: 2, value: "$$", isChecked: false},
            {id: 3, value: "$$$", isChecked: false},
          ]
    }

    handleChange = (event) => {
        this.setState({
            sortValue: event.target.value
        })
        this.props.onSortValueChange(event.target.value)
    };

    onShowFilters = () => {
        if (!this.state.showFilters) {
            this.setState({
                showFilters: true,
            })
        } else {
            this.setState({
                showFilters: false,
            })
        }
    }
    handleCheckChieldElement = (event) => {
        let prices = this.state.prices
        prices.forEach(price => {
           if (price.value === event.target.value)
              price.isChecked = event.target.checked
        })
        this.setState({prices: prices})
        this.props.onFilterValueChange(event.target.value)
      }

    render() {
        return(
            <div className="filterbar-wrapper">
                <React.Fragment>
              
                <div className="right-side-wrapper">
                <InputLabel id="demo-simple-select-label">Classer par</InputLabel>
                    <RadioGroup aria-label="reviews" name="reviews1" value={this.state.sortValue} onChange={this.handleChange} className="radioButtonsWrapper">
                        <FormControlLabel value="highest" control={<Radio className="radio" />} label="Le plus cher" />
                        <FormControlLabel value="lowest" control={<Radio className="radio" />} label="Le moins cher" />
                        <FormControlLabel value="most-reviews" control={<Radio className="radio" />} label="Le plus de commentaire" />
                        <FormControlLabel value="least-reviews" control={<Radio className="radio" />} label="Le moins de commentaires" />
                    </RadioGroup>
                </div>
                
                </React.Fragment>
            </div>
        )
    }
}

export default FilterBar