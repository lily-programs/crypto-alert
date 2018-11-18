import React, {Component} from "react";

class ModifyAlertForm extends Component {
	state = {
		alert_id: "",
		currency: "BTC",
		under: "",
		cutoff_value: "",
	}

	componentDidMount() {
		const headers = new Headers({
			"Authorization": `Token ${sessionStorage.getItem("token")}`
		});
		fetch(`http://127.0.0.1:8000/api/alerts/${this.props.match.params.id}/`,
		{
			method: "get",
			headers})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				this.setState({alert_id: response.id})
				this.setState({under: response.under})
				this.setState({cutoff_value: response.cutoff_value})
			})

		}

	onSubmit = e => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('currency', this.state.currency);
		formData.append('under', this.state.under);
		formData.append('cutoff_value', this.state.cutoff_value);
		console.log(sessionStorage.getItem("token"))
		fetch(`http://127.0.0.1:8000/api/alerts/${this.state.alert_id}/`, {
			method: "put",
			headers: {Authorization: `Token ${sessionStorage.getItem("token")}`},
			body: formData})
			.then(response => {
				console.log(response);
				window.location.href="/alerts"
			});
		};

	render() {
		console.log("wells");
		console.log(this.props)
		console.log(this.state)
		return (
			<form onSubmit={this.onSubmit}>
				<fieldset>
					<legend>Change Alert</legend>
					<p>
						<label htmlFor="currency">Crypto Currency: {this.state.currency}</label>
						<select onChange={e => this.setState({under: e.target.value})}>
							<option value="true">under</option>
							<option value="false">above</option>
						</select>
					</p>
					<p>
					    <label htmlFor="cutoff_value">Cutoff Value:</label>
					    <input
					      type="cutoff_value" id="cutoff_value" placeholder={`${this.state.cutoff_value}`}
					      onChange={e => this.setState({cutoff_value: e.target.value})} />
					 </p>
					<p>
						<button type="submit">Modify</button>
					</p>
				</fieldset>
			</form>

			)
		}
}

export default ModifyAlertForm

