import React, { Component } from 'react';
import './Contact.css';

export default class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <li>Contact Us:</li><br/>
                <li>Email: jobs@jobfinder.com</li><br/>
                <li>Phone: 1-800-555-JOBS</li>
            </div>
        )
    }
}