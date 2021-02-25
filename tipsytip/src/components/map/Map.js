import React from "react";

import ReactMap, { Marker, Popup } from "react-map-gl"
import Form from '../shared/Form'
import LoadingScreen from '../shared/LoadingScreen'
import RestaurantsModal from './RestaurantsModal'
import SearchIcon from '@material-ui/icons/Search';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import '../../styles/map/map.css'

class Map extends React.Component {

  state = {
    showForm: '',
    viewport: '',
    listings: []
  }

checkIfRestaurantIsSaved = currentRestaurant => {
  if (this.props.savedRestaurants.includes(currentRestaurant) === false) {
      return false
  } else {
      return true
  }
}

  componentDidMount() {
    this.setState({
      showForm: false,
      viewport: this.props.state.viewport,
      listings: this.props.listings
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.restaurants !== this.props.restaurants) {
      this.setState({
        viewport: this.props.state.viewport
      })
    }
  }

closeForm = () => {
  this.setState({
    showForm: false
  })
}

  render() {
    return(
      this.props.loading ? <LoadingScreen>En chargement</LoadingScreen>
      :
      <ReactMap
        {...this.state.viewport}
        mapboxApiAccessToken={this.props.state.token}
        mapStyle="mapbox://styles/sherif-ffs/ck89gx93002vs1inzl1nxvwyx"
        onViewportChange={viewport => {
            this.setState({ viewport: viewport })
        }}
      >
      {this.props.restaurants.map((listing) => (
          <Marker
            key={listing.id}
            latitude={listing.coordinates.latitude}
            longitude={listing.coordinates.longitude}
          >
              <div 
                className="apartment-button"
                onClick={e => {
                    e.preventDefault()
                    this.setState({
                        selectedListing: listing
                    })
                }}
              >
              {this.props.savedRestaurants.filter(e => e.restaurant.id === listing.id).length > 0
              ? <LocationOnRoundedIcon fontSize="large" style={{color:'#0b2C4C'}}/>
              : <LocationOnRoundedIcon fontSize="small"/>
              }
              </div>
          </Marker>
      ))}
      {this.state.selectedListing ? (
          <Popup
            className="popup"
            latitude={this.state.selectedListing.coordinates.latitude}
            longitude={this.state.selectedListing.coordinates.longitude}
            onClose={() => {this.setState({
                selectedListing: null
            })}}
          >
            <RestaurantsModal
              address1={this.state.selectedListing.location.display_address[0]}
              address2={this.state.selectedListing.location.display_address[1]}
              photo={this.state.selectedListing.image_url}
              name={this.state.selectedListing.name}
              restaurant={this.state.selectedListing}
              rating={this.state.selectedListing.rating}
              price={this.state.selectedListing.price}
              categories={this.state.selectedListing.categories}
              latitude={this.state.selectedListing.coordinates.latitude}
              longitude={this.state.selectedListing.coordinates.longitude}
              id={this.state.selectedListing.id}
              savedRestaurants={this.props.savedRestaurants}
              onSaveNewRestaurant={this.props.onSaveRestaurant}
              onClose={() => {this.setState({
                  selectedListing: null
              })}}
            ></RestaurantsModal>
          </Popup>
      ) : null}
      {this.state.showForm ? <Form closeForm={this.closeForm} onSubmit={this.props.onSearchSubmit}></Form> : <SearchIcon className="circle" onClick={() => this.setState({ showForm: true})}></SearchIcon>}
      
      </ReactMap>
      
    )
  }
}



export default Map;