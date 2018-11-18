import React, {Component} from "react";
import {Link} from "react-router-dom";

class Register extends Component {

	state = {
		username: "",
		email: "",
		password: "",
	}

	onSubmit = e => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('username', this.state.username);
		formData.append('password', this.state.password);
		formData.append('email', this.state.email);
		fetch("http://127.0.0.1:8000/api/users/register", {
			method: 'post',
			mode: 'cors',
			body: formData})
			.then(response => response.json())
			.then(response => {
				console.log(response)
				sessionStorage.setItem('token', response.auth_token);
				window.location.href = '/login';
			});

	}

	render() {
		console.log("register wells");
		return (
			<form onSubmit={this.onSubmit}>
				<fieldset>
					<legend>Register</legend>
					<p>
						<label htmlFor="username">Username</label>
						<input
							type="text" id="username"
							onChange={e => this.setState({username: e.target.value})} />
					</p>
					<p>
					    <label htmlFor="email">Email</label>
					    <input
					      type="email" id="email"
					      onChange={e => this.setState({email: e.target.value})} />
					 </p>
					<p>
					    <label htmlFor="password">Password</label>
					    <input
					      type="password" id="password"
					      onChange={e => this.setState({password: e.target.value})} />
					  </p>
					<p>
						<button type="submit">Register</button>
					</p>
					<p>
			            <Link to="/login">Login</Link>
			         </p>
				</fieldset>
			</form>

			)
	}
}

export default Register