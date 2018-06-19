import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Filter from './components/Filter';
import Footer from './components/Footer';
import Contact from './components/Contact';
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      posts: [],
      showFavorites: false
    };


  }

  mapPosts = () => {
    var key = 0;
    var mapThis = this.state.showFavorites? this.state.favorites : this.state.posts;
    var postsToDisplay = mapThis.map( (e) => {
      return (
        <div key={key++} className="posts">
          <div className="postInfo">Title:</div> { e.title }<br/>
          <div className="postInfo">Location:</div> { e.location }<br/>
          <div className="postInfo">Hours:</div> { e.type }<br/>
          <div className="postInfo">Company:</div> { e.company }<br/>
          <button onClick={ this.state.showFavorites? () => this.removeFavorite(e): () => this.addFavorite(e) } className="favButton">{ this.state.showFavorites? 'Remove Favorite' : 'Add to Favorites' }</button><br/>
        </div>
      )
    })
    return postsToDisplay;
  }

  getJobPosts = () => {
    axios.get('https://jobs.github.com/positions.json').then( results => {
      this.setState({ posts: results.data })
    })
  }

  filterByDescription = (text) => {
    axios.get(`https://jobs.github.com/positions.json?description=${text}`).then( results => {
      this.setState({ posts: results.data })
      console.log(text)
    })
  }

  filterByLocation = (text) => {
    axios.get(`https://jobs.github.com/positions.json?location=${text}`).then( results => {
      this.setState({ posts: results.data })
      console.log(text)
    })
  }

  changeFavorites = () => {
    this.setState({ showFavorites: !this.props.showFavorites })
  }

  addFavorite = (obj) => {
    axios.post('http://localhost:3005/api/favJobs', obj).then( results => {
      toast.success("Successfully added to favorites!")
      this.setState({ favorites: results.data })   
    }).catch( () => toast.error("Failed to add to favorites.") );
  }

  removeFavorite = (obj) => {
    console.log(obj)
    axios.delete(`http://localhost:3005/api/favJobs/${obj.id}`).then (results => {
      this.setState({ favorites: results.data })
    })
  }
  

  render() {
    console.log( this.state.favorites )
    return (
      <div>
        <ToastContainer />
        <Header 
          getFavorites={ this.getFavorites }
          showFavorites={ this.state.showFavorites }
          changeFavorites={ this.changeFavorites }
        />
        <div className="App">
          <div className="quote">"You have no idea how high I can fly"</div>
          <img className="scott" src="http://rayabel.com/images/easyblog_articles/10/b2ap3_large_michael-scott-geniu_20170412-213629_1.jpg" alt="Scott"/>
          <Filter 
          getJobPosts={ this.getJobPosts }
          filterByDescription={ this.filterByDescription }
          filterByLocation={ this.filterByLocation }
          />
          <div className="postStyles">
          { this.mapPosts() }
          </div>
          <Footer />
          <Contact />
        </div>
      </div>
    );
  }
}

export default App;
