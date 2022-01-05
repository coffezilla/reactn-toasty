import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

//
class Notify extends Component {
	constructor(props) {
		super(props);
		this.state = {
			version: '11.11',
		};
		// openNotify={this.openNotify.bind(this)}
		// this.openNotify = this.openNotify.bind(this);
		this.openNotify = () => {
			console.log('fuck you');
		};
	}

	// componentDidMount() {
	// this.openNotify = this.openNotify.bind(this);
	// }

	render() {
		const { version } = this.state;

		// return <h1>Hello World</h1>;
		return (
			<>
				<Text>Guerra {version}</Text>
				<Button title='spoiler' onPress={this.openNotify} />
			</>
		);
	}
}

export default Notify;
