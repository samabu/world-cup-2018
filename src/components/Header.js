import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header>
                <h1>JOB FINDER</h1>
                <img src="http://www.expressproswarwick.com/wp-content/uploads/2014/02/jobsearch.png" alt="logo"/>
                <button onClick={ this.props.changeFavorites } className="button">{this.props.showFavorites? 'ALL LISTINGS': 'FAVORITES'}</button>
            </header>
        )
    }
}