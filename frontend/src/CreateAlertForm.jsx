import React, {Component} from "react";

class CreateAlertForm extends Component {
	state = {
		currency: "BTC",
		under: "",
		cutoff_value: "",
	}

	onSubmit = e => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('currency', this.state.currency);
		formData.append('under', this.state.under);
		formData.append('cutoff_value', this.state.cutoff_value);
		console.log(sessionStorage.getItem("token"))
		fetch("http://127.0.0.1:8000/api/alerts/", {
			method: "post",
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
					<legend>Create Alert</legend>
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
					      type="cutoff_value" id="cutoff_value"
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

export default CreateAlertForm