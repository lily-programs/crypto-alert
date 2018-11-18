import React, {Component} from "react";

class ModifyEmailForm extends Component {
	state = {
		username: "",
		old_email: "",
		new_email: ""
	}

	componentDidMount() {
		const headers = new Headers({
			"Authorization": `Token ${sessionStorage.getItem("token")}`
		});
		fetch(`http://127.0.0.1:8000/api/users/${sessionStorage.getItem("user_id")}/info`,
		{
			method: "get",
			headers})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				this.setState({old_email: response.email})
				this.setState({username: response.username})
			})

		}

	onSubmit = e => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('email', this.state.new_email);
		console.log(sessionStorage.getItem("token"))
		fetch(`http://127.0.0.1:8000/api/users/${sessionStorage.getItem("user_id")}/change_email`, {
			method: "put",
			headers: {Authorization: `Token ${sessionStorage.getItem("token")}`},
			body: formData})
			.then(response => {
				console.log(response);
				window.location.href="/alerts"
			});
		};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<fieldset>
					<legend>Change Email</legend>
					<p>
						<label htmlFor="old_email">Current Email: {this.state.old_email}</label>
					</p>
					<p>
					    <label htmlFor="new_email">New Email:</label>
					    <input
					      type="new_email" id="new_email"
					      onChange={e => this.setState({new_email: e.target.value})} />
					 </p>
					<p>
						<button type="submit">Modify</button>
					</p>
				</fieldset>
			</form>

			)
		}
}

export default ModifyEmailForm