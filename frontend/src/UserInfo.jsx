import React, {Component} from "react";
import {Link} from "react-router-dom";

class UserInfo extends Component {
	state = {
		username: "",
		email: ""
	}

	componentDidMount() {
		console.log(sessionStorage.getItem("token"))
		const headers = new Headers({
			"Authorization": `Token ${sessionStorage.getItem("token")}`
		});
		fetch(`http://127.0.0.1:8000/api/users/${sessionStorage.getItem('user_id')}/info`,
		{
			method: "get",
			headers})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				this.setState({username: response.username})
				this.setState({email: response.email})
			})

		}

	onModify() {
		return () => {
			console.log("modifying user email: ", sessionStorage.getItem('user_id'));
			window.location.href= `/users/${sessionStorage.getItem('user_id')}/changeEmail`
		};
	}

	onDelete() {
		return () => {
			console.log("deleting")
			const headers = new Headers({
				"Authorization": `Token ${sessionStorage.getItem("token")}`
			});
			let formData = new FormData();
			formData.append("username", this.state.username)
			fetch(`http://127.0.0.1:8000/api/users/${sessionStorage.getItem('user_id')}/delete`,
			{
				method: "delete",
				mode: "cors",
				headers,
				body: formData})
				.then(response => response.json())
				.then(response => console.log(response))
				window.location.href=`/login`;
		}
	}

	render() {
		console.log("User Info");
		console.log(this.state)
		return (
			<fieldset>
				<div>
					<div>
						<Link to="/alerts">Back to Alerts</Link>
					</div>
					<legend> Account Info</legend>
					<p> Username: {this.state.username}</p>
					<p> Email: {this.state.email}</p>
					<button type="submit" onClick={this.onModify()}>Change Email</button>
					<button type="submit" onClick={this.onDelete()}>Delete Account</button>
				</div>
			</fieldset>
			)
	}
}
export default UserInfo