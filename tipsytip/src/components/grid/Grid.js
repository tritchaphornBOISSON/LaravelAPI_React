import React from 'react'

import RestaurantCard from './RestaurantCard'
import { Button } from '@material-ui/core';
import Form from '../shared/Form'
import SearchIcon from '@material-ui/icons/Search';
import LoadingScreen from '../shared/LoadingScreen';
import '../../styles/grid.css';
import FilterBar from './FilterBar';



class Grid extends React.Component {
    state = {
        restaurants: [],
        allRestaurants: [],
        limit: 0,
        showForm: '',
        loading: false,
        sortValue: '',
        showFilters: false,
        priceFilters: []
    }

    onLoadMore = () => {
        this.setState({
            limit: this.state.limit + 5
        });
    }

    closeForm = () => {
        this.setState({
          showForm: false
        })
    }

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

    onSortValueChange = (sortValue) => {
        this.setState({
            sortValue: sortValue
        })
        this.sortRestaurants(sortValue)
      }

      priceFilters = []
    onFilterValueChange = (filterValue) => {
        let restaurants = this.state.allRestaurants

        if (!this.state.priceFilters.includes(filterValue)) {
            this.setState({
                priceFilters: filterValue
            })
        }
        if (!this.priceFilters.includes(filterValue)) {
            this.priceFilters.push(filterValue)
        } else {
            this.priceFilters = this.priceFilters.filter(e => e !== filterValue)
        }

        let filteredData = [];
        if (this.priceFilters.includes("$") && this.priceFilters.length === 1) {
            let lowRestaurants = restaurants.filter(restaurant => restaurant.price === '$')
                lowRestaurants.forEach(res => {
                    filteredData.push(res)
            })
        }
        if (this.priceFilters.includes("$$") && this.priceFilters.length === 1) {
            let mediumRestaurants = restaurants.filter(restaurant => restaurant.price === '$$')
            mediumRestaurants.forEach(res => {
                    filteredData.push(res)
            })
        }
        if (this.priceFilters.includes("$$$") && this.priceFilters.length === 1) {
            let highRestaurants = restaurants.filter(restaurant => restaurant.price === '$$$')
                highRestaurants.forEach(res => {
                    filteredData.push(res)
            })
        }

        if (this.priceFilters.includes("$$") && this.priceFilters.includes("$") && this.priceFilters.length === 2) {
            let lowRestaurants = restaurants.filter(restaurant => restaurant.price === '$')
                lowRestaurants.forEach(res => {
                    filteredData.push(res)
            })
            let mediumRestaurants = restaurants.filter(restaurant => restaurant.price === '$$')
                mediumRestaurants.forEach(res => {
                    filteredData.push(res)
                })
        } 
        if (this.priceFilters.includes("$$$") && this.priceFilters.includes("$$") && this.priceFilters.length === 2) {
            let highRestaurants = restaurants.filter(restaurant => restaurant.price === '$$$')
                highRestaurants.forEach(res => {
                    filteredData.push(res)
            })
            let mediumRestaurants = restaurants.filter(restaurant => restaurant.price === '$$')
                mediumRestaurants.forEach(res => {
                    filteredData.push(res)
            })
        } 
        if (this.priceFilters.includes("$$$") && this.priceFilters.includes("$") && this.priceFilters.length === 2) {
            let lowRestaurants = restaurants.filter(restaurant => restaurant.price === '$')
                lowRestaurants.forEach(res => {
                    filteredData.push(res)
            })
            let mediumRestaurants = restaurants.filter(restaurant => restaurant.price === '$$')
                mediumRestaurants.forEach(res => {
                    filteredData.push(res)
            })
        } 
        if (this.priceFilters.length === 3 ) {
            let lowRestaurants = restaurants.filter(restaurant => restaurant.price === '$')
                lowRestaurants.forEach(res => {
                    filteredData.push(res)
            })
            let mediumRestaurants = restaurants.filter(restaurant => restaurant.price === '$$')
                mediumRestaurants.forEach(res => {
                    filteredData.push(res)
            })
            let highRestaurants = restaurants.filter(restaurant => restaurant.price === '$$$')
                highRestaurants.forEach(res => {
                    filteredData.push(res)
            })
        }
        
        if (this.priceFilters.length === 0) {
            filteredData = restaurants
        }

        this.setState({
            restaurants: filteredData
        })
      }

    sortRestaurants(sortValue) {
        let restaurants = this.state.restaurants

        let sortedRestaurants;
        
        if (!!sortValue) {
            if (sortValue === 'highest') {
                sortedRestaurants = restaurants.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                return sortedRestaurants
            } 
            if (sortValue === 'lowest') {
                sortedRestaurants = restaurants.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
                return sortedRestaurants
            } 
        }
        if (!!sortValue) {
            if (sortValue === 'most-reviews') {
                sortedRestaurants = restaurants.sort((a, b) => parseFloat(b.review_count) - parseFloat(a.review_count));
                return sortedRestaurants
            } 
            if (sortValue === 'least-reviews') {
                sortedRestaurants = restaurants.sort((a, b) => parseFloat(a.review_count) - parseFloat(b.review_count));
                return sortedRestaurants
            } 
        }

        else {
            sortedRestaurants = restaurants;
            return sortedRestaurants
        }


        this.setState({
            restaurants: sortedRestaurants
        })

    }
    
    componentDidMount() {
        this.setState({
            restaurants: this.props.restaurants,
            allRestaurants: this.props.restaurants,
            limit: 10,
            showForm: true,
            loading: this.props.loading
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.restaurants !== this.props.restaurants) {
            this.setState({
                restaurants: this.props.restaurants,
                allRestaurants: this.props.restaurants
            })
        }
      } 

    render() {
        const buttonText = this.state.showFilters ? "moins de Filtres" : "Filtres"
        let trendingGifs = this.state.restaurants.slice(0,this.state.limit).map(restaurant => {
            return(
                <RestaurantCard 
                    name={restaurant.name}
                    rating={restaurant.rating}
                    reviewCount={restaurant.review_count}
                    price={restaurant.price}
                    categories={restaurant.categories}
                    image={restaurant.image_url}
                    id={restaurant.id}
                    key={restaurant.id}
                    location={restaurant.location}
                    restaurant={restaurant}
                    savedRestaurants={this.props.savedRestaurants}
                    onSaveNewRestaurant={this.props.onSaveRestaurant}
                >
                </RestaurantCard>
            )
            })        
        return(
            <div className="grid-wrapper">
            {this.state.showForm ? <Form closeForm={this.closeForm} onSubmit={this.props.onSearchSubmit}></Form> : <SearchIcon className="circle" onClick={() => this.setState({ showForm: true})}></SearchIcon>}
                <h1 className="grid-title">Restaurants à {this.props.searchInput}</h1>
                <Button onClick={this.onShowFilters} className="show-filters-button">{buttonText}</Button>
                {this.state.showFilters ? 
                <FilterBar onSortValueChange={this.onSortValueChange} onFilterValueChange={this.onFilterValueChange}></FilterBar>
                : ''
                }
                {!this.state.loading ? 
                <div className="restaurants-wrapper">
                    {trendingGifs}
                </div>
                : <LoadingScreen></LoadingScreen>
                }
                <Button onClick={this.onLoadMore} color="secondary" className="load-more-button">Charger plus</Button>
            </div>
        )
    }
}

export default Grid