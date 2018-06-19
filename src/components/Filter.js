import React, {Component} from 'react';
import './Filter.css';
// import axios from 'axios';

export default class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            descriptionInput: '',
            locationInput: ''
        }
    }

    handleDescriptionChange = (input) => {
        this.setState({ descriptionInput: input.target.value })
    }

    handleLocationChange = (input) => {
        this.setState({ locationInput: input.target.value })
    }

    render() {
        return (
            <div className="filter">
                <button onClick={ this.props.getJobPosts } className="browse">Browse Jobs</button>
                <h3>FILTER JOBS BY: </h3>
                <div>
                    <input onChange={ this.handleDescriptionChange } type="text" placeholder="Description" value={ this.state.descriptionInput }/>
                    <button onClick={ () => { this.props.filterByDescription(this.state.descriptionInput) } }>Search</button>
                </div>
                <div>
                    <input onChange={ this.handleLocationChange } type="text" placeholder="Location" value={ this.state.locationInput }/>
                    <button onClick={ () => { this.props.filterByLocation(this.state.locationInput) } }>Search</button>
                </div>
            </div>
        )
    }
}