import { Text, View, Button } from 'react-native';
import { useToast } from './MyToast';

const Header = () => {
	const toasty = useToast();

	return (
		<View style={{ marginTop: 30, alignItems: 'center' }}>
			<Text>Naruto</Text>
			<Button
				title='Show Toast'
				onPress={() => toasty.openToast({ message: 'Aqui do Header' })}
			/>
			<Text>Open up App.js to start working on your app! </Text>
			<Button
				title='PRIMEIRO'
				onPress={() => toasty.openToast({ message: 'PRIMEIRO' })}
			/>
			<Button
				title='SEGUNDO'
				onPress={() => toasty.openToast({ message: 'SEGUNDO' })}
			/>
		</View>
	);
};

export default Header;
