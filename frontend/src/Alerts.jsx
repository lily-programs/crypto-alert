import React, {Component} from "react";
import {Link} from "react-router-dom";

class Alerts extends Component {

	state = {
		alerts: []
	}

	componentDidMount() {
		console.log(sessionStorage.getItem("token"))
		const headers = new Headers({
			"Authorization": `Token ${sessionStorage.getItem("token")}`
		});
		fetch("http://127.0.0.1:8000/api/alerts/",
		{
			method: "get",
			headers})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				this.setState({alerts: response});
			})

		}

	onModify(id) {
		return () => {
			console.log("modifying alert id: ", id);
			window.location.href= `/alerts/${id}`

		};
	}
	onDelete(id) {
		return () => {
			console.log("deleting alert id: ", id);
			const headers = new Headers({
				"Authorization": `Token ${sessionStorage.getItem("token")}`
			});
			fetch(`http://127.0.0.1:8000/api/alerts/${id}/`,
			{
				method: "delete",
				headers})
				.then(response => response.json())
				.then(response => console.log(response))
				window.location.href=`/alerts`;
		}
	};
	onLogout() {
		return () => {
			console.log("logging out");
			const headers = new Headers({
				"Authorization": `Token ${sessionStorage.getItem("token")}`
			});
			fetch(`http://127.0.0.1:8000/api/users/logout`,
			{
				method: "post",
				headers})
				.then(response => response.json())
				.then(response => console.log(response))
				.then(sessionStorage.removeItem("token"))
				.then(sessionStorage.removeItem("user_id"))
				window.location.href=`/login`;
		}
	}

	render() {
		console.log("Alerts");
		const items = this.state.alerts.map(item=>
			<div>
				<p>-------------------</p>
				<p>Alert when {item.currency} is {}
				{(() => {
					switch (item.under) {
						case false: return "above";
						default: return "under"
					}
				})()} {}	
				{item.cutoff_value} USD</p>
				<p>
					<button type="submit" onClick={this.onModify(item.id)}>Modify</button>
					<button type="submit" onClick={this.onDelete(item.id)}>Delete</button>
				</p>
				
			</div>)
		return (
				<fieldset>
					<div>
						<Link to="/userInfo">User Info</Link> {     }
						<button type="submit" onClick={this.onLogout()}>Logout</button>
					</div>
					<legend>Your Alerts</legend>
					<Link to="/createAlert">Create New Alert</Link>
					<p>
						Your alerts
					</p>
					<ul>
						{items}
					</ul>
				</fieldset>

			)
	}

}


export default Alerts