import React, {Component} from "react";

import {Link} from "react-router-dom";


class Login extends Component {

	state = {
		username: "",
		password: "",
	}

	onSubmit = e => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('username', this.state.username);
		formData.append('password', this.state.password);
		console.log(sessionStorage.getItem("token"))
		fetch("http://127.0.0.1:8000/api/users/login", {
			method: "post",
			mode: "cors",
			body: formData})
			.then(response => {
				console.log(response)
				if (response.status == 200) {
					return response.json();
				}
				else {
					throw new Error("Something went wrong")
				}
			})
			.then(response => {
				console.log("this is the response")
				// console.log(response);
				sessionStorage.setItem('token', response.auth_token);
				sessionStorage.setItem('user_id', response.user);
				window.location.href="/alerts"
			})
			.catch(error => {
				console.log(error);
				window.location.href="/register"
			})
		};


	render() {
		console.log("wells");
		return (
			<form onSubmit={this.onSubmit}>
				<fieldset>
					<legend>Login</legend>
					<p>
						<label htmlFor="username">Username</label>
						<input
							type="text" id="username"
							onChange={e => this.setState({username: e.target.value})} />
					</p>
					<p>
					    <label htmlFor="password">Password</label>
					    <input
					      type="password" id="password"
					      onChange={e => this.setState({password: e.target.value})} />
					  </p>
					<p>
						<button type="submit">Login</button>
					</p>
					<p>
			            <Link to="/register">Register</Link>
			          </p>
				</fieldset>
			</form>

			)
	}
}

export default Login