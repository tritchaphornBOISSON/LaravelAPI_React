import React from 'react'

import StarRatings from 'react-star-ratings';
import { Button } from '@material-ui/core';
import axios from 'axios';
import '../../styles/reviewForm.css'
import cartman from '../../assets/cartman.jpg'
import userImage from '../../assets/user_large_square.png'
import { connect } from "react-redux";
import { addReview } from '../../actions/index';


function mapDispatchToProps(dispatch) {
    return {
      addReview: review => dispatch(addReview(review))
    };
  }

class ReviewForm extends React.Component {
    
 
  constructor(props) {
 
    super(props);
     
  

    this.state = {
      
        idUtilisateur: null,
        idRestaurant: this.props.id,
        contenu: null,
        users:[],
        commentaires:[],
        restaurants:[],
        nomRestaurant:this.props.name,
        imageRestaurant:'',
       
         };
        
   
  };
    
  handleSubmitCommentaire = async e => {
    e.preventDefault();
    axios.get(`${''}https://api.yelp.com/v3/businesses/${this.props.id}`, {
            headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            requireHeader: ['origin', 'x-requested-with'],
            removeHeaders: ['cookie', 'cookie2']
            },
            })
            .then((res) => {
            this.setState({
               imageRestaurant:res.data.image_url,

            })
            console.log(res.data.image_url)
            console.log(this.state.imageRestaurant)


            fetch('http://localhost:8000/api/commentaires',{
   
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Accept': 'apllication/json',

            },
            body: JSON.stringify({
              idUtilisateur: this.state.users.idUtilisateur,
              idRestaurant:this.state.idRestaurant,
              contenu: this.state.contenu,
              nomRestaurant:this.state.nomRestaurant,
              imageRestaurant:this.state.imageRestaurant,
               
             } )
        })
        .then(res =>res.json())
        .then(res => console.log(res))
        window.location.reload()
        
        console.log(this.props.name)
        console.log(this.props.image_url)
        console.log(this.props)
            })
            .catch((err) => {
            console.log ('error')
        })
        //console.log(this.state.imageRestaurant)
   
    
    }



    handleChange =  event => {
     
        this.setState({ contenu: event.target.value});
      console.log(this.state.id)
    }


    componentDidMount() {
        

      this.setState({
          restaurants: this.props.savedRestaurants,
          reviews: this.props.reviews,
          showLogin: false,
      })


      

      fetch('http://localhost:8000/api/auth/user-profile',{
                  method: 'GET',
                  headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
                  'Authorization' : 'Bearer ' + localStorage.getItem('token'),
              }
      })
      .then(res =>res.json())
      
      .then(res => {
          const users = res
          this.setState({users})
          console.log(users)
          console.log(this.props.id)
      })



    

      axios.get(`http://localhost:8000/api/commentaires/${this.props.id}`)
      .then(res => {
        const commentaires = res.data;
       this.setState({ commentaires });
       console.log(this.state.commentaires.map(commentaire=>commentaire.idRestaurant));
      
      })




    
      
  }

  
  
    

    render() {

      
           
        return (
            <div className="user-review-wrapper">
                <div className="profile-wrapper">
                    <img className="profile-icon" src={userImage}></img>
                    <h1 className="profile-name">{ this.state.users.prenom}</h1>
                </div>
                <div className="review-content-wrapper">
                  {this.props.isMobile
                  ?
                  <StarRatings
                    className="ratings"
                    name="rating"
                    rating={this.state.rating}
                    changeRating={this.changeRating}
                    starDimension="65px"
                    starSpacing="1px"
                    starEmptyColor='#d3d1d1'
                  ></StarRatings>
                  : 
                  <StarRatings
                    className="ratings"
                    name="rating"
                    rating={this.state.rating}
                    changeRating={this.changeRating}
                    starDimension="40px"
                    starSpacing="4px"
                    starEmptyColor='#d3d1d1'
                  ></StarRatings>
                
                  }
                    
                 <form onSubmit={this.handleSubmitCommentaire}>
          <label>
            Commentaire: 
            <input type="text" name="contenu" onChange={this.handleChange} />
          </label>
          <button type="submit">Ajouter</button>
        </form>

        { this.state.commentaires.map(commentaire => 
                        <div className="card" key={commentaire.idCommentaire} style={{ width: '22rem' }}>
                          <div class="card-header">
                          <label></label>{commentaire.prenom} 
                          </div>
                             <div className="card-body">
                             <blockquote class="blockquote mb-0">
                            <p style={{fontSize: "16px"}}>{commentaire.contenu}  </p>
                      </blockquote>
                       
                        </div>
                        </div>
                        )}
             

                </div>
            </div>
        )
    }

  
}

export default connect(null, mapDispatchToProps)(ReviewForm)

