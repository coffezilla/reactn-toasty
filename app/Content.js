import { Text, View, Button } from 'react-native';
import { useToasty } from './components/Toasty';

const Content = () => {
	const toasty = useToasty();

	return (
		<View style={{ marginTop: 30, alignItems: 'center' }}>
			<Text>Open up App.js to start working on your app! </Text>
			<Button
				title='First toasty'
				onPress={() => toasty.openToast({ message: 'First', delay: 1000 })}
			/>
			<Button
				title='Second toasty'
				onPress={() => toasty.openToast({ message: 'Second', delay: 2000 })}
			/>
		</View>
	);
};

export default Content;
