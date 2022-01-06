import { Text, View, Button } from 'react-native';
import { useToasty } from './components/Toasty';

const Content = () => {
	const toasty = useToasty();

	return (
		<View style={{ marginTop: 30, alignItems: 'center' }}>
			<Text>Open up App.js to start working on your app! </Text>
			<Button
				title='success'
				onPress={() =>
					toasty.openToast({ message: 'SUCCESS', type: 'SUCCESS', delay: 1000 })
				}
			/>
			<Button
				title='WARNING'
				onPress={() =>
					toasty.openToast({ message: 'WARNING', type: 'WARNING', delay: 2000 })
				}
			/>
			<Button
				title='clean'
				onPress={() =>
					toasty.openToast({ message: 'CLEAN', type: 'CLEAN', delay: 2000 })
				}
			/>
		</View>
	);
};

export default Content;
