import React, { Component } from 'react';
import { Button } from 'components/Body';
import { Input } from 'components/Forms';

class LoginForm extends Component {
	state = {
		email: '',
		password: '',
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({ ...prevState, [name]: value }));
	};

	handleSubmit = e => {
		e.preventDefault();

		alert(JSON.stringify(this.state, null, 4));
	};

	render = () => (
		<form onSubmit={this.handleSubmit}>
			<Input
				type="email"
				name="email"
				label="Email address"
				onChange={this.handleChange}
				value={this.state.email}
			/>
			<Input
				type="password"
				name="password"
				label="Password"
				onChange={this.handleChange}
				value={this.state.password}
			/>
			<Button primary="true" type="submit">
				Submit
			</Button>
		</form>
	);
}

export default LoginForm;
