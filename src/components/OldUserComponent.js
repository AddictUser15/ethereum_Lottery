import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import '../styles/userForm.scss';

export default class OldUserComponent extends Component {
	constructor() {
		super();

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e, history) {
		e.preventDefault();
		axios.post('/validateUser', {
			userId: e.currentTarget.getElementsByTagName('input').userId.value,
			phone: e.currentTarget.getElementsByTagName('input').phone.value
		})
		.then(function(response) {
			let queryParam = '';
			for(var key in response.data[0]) {
				document.cookie = key + '=' + response.data[0][key];
				queryParam += key + '=' + response.data[0][key] + '&';
			}
			if(response.data[0].type === 'manager') {
				history.push('/admin?' + queryParam);
			} else {
				history.push('/player?' + queryParam);
			}
			
		});
	}

	render() {
		return <div className='form-section'>
			<h1>LOGIN</h1>
			<Route render={({ history}) => (
				<form onSubmit={(e) => { this.onSubmit(e, history) }}>
					<p><label>User Id:</label><input type='text' name='userId' /></p>
					<p><label>Phone No:</label><input type='text' name='phone' /></p>
					<p><button className='btn btn-primary'>SUBMIT</button></p>
				</form>
			)} />
		</div>;
	}
}