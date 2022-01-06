import { useContext, useState, useEffect, createContext } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';

// Provider to wrap the content in order to make the methods available using React Context
export const ToastProvider = ({ children }) => {
	const [toastyStatus, setToastyStatus] = useState(false);
	const [toastyOptions, setToastyOptions] = useState({
		message: 'Toasty!',
		delay: 1000,
		type: 'SUCCESS',
	});

	return (
		<>
			<ToastyContext.Provider
				value={{
					toastyStatus,
					setToastyStatus,
					toastyOptions,
					setToastyOptions,
				}}
			>
				{children}
				<Toasty />
			</ToastyContext.Provider>
		</>
	);
};

// Hook with methods
export const useToasty = () => {
	const { setToastyStatus, toastyStatus } = useContext(ToastyContext);
	const { setToastyOptions } = useContext(ToastyContext);

	// check if is already opened
	if (!toastyStatus) {
		return {
			openToast: ({ message = 'Toasty!', delay = 1000, type = 'SUCCESS' }) => {
				setToastyStatus(true);
				setToastyOptions({
					message,
					delay,
					type,
				});
			},
		};
	}

	return {
		openToast: () => {},
	};
};

// context wrapped
const ToastyContext = createContext(null);

// View
const Toasty = () => {
	const { toastyStatus, setToastyStatus, toastyOptions } =
		useContext(ToastyContext);
	const [toastyStyleHeight, setToastyStyleHeight] = useState(
		new Animated.Value(0)
	);

	useEffect(() => {
		if (toastyStatus) {
			Animated.timing(toastyStyleHeight, {
				toValue: 33,
				duration: 120,
				useNativeDriver: false,
			}).start();

			setTimeout(() => {
				Animated.timing(toastyStyleHeight, {
					toValue: 0,
					duration: 120,
					useNativeDriver: false,
				}).start();

				setToastyStatus(false);
			}, toastyOptions.delay);
		}
	}, [toastyStatus]);

	return (
		<Animated.View
			style={[
				{ height: toastyStyleHeight },
				styles.toastyContainer,
				toastyOptions.type === 'SUCCESS' && styles.toastyContainerSuccess,
				toastyOptions.type === 'WARNING' && styles.toastyContainerWarning,
				toastyOptions.type === 'CLEAN' && styles.toastyContainerClean,
			]}
		>
			{toastyStatus && (
				<Text
					style={styles.toastyText}
					style={[
						styles.toastyText,
						toastyOptions.type === 'SUCCESS' && styles.toastyTextSuccess,
						toastyOptions.type === 'WARNING' && styles.toastyTextWarning,
						toastyOptions.type === 'CLEAN' && styles.toastyTextClean,
					]}
				>
					{toastyOptions.message}
				</Text>
			)}
		</Animated.View>
	);
};

export default Toasty;

const styles = StyleSheet.create({
	toastyContainer: {
		justifyContent: 'center',
	},
	toastyText: {
		textAlign: 'center',
	},
	//
	toastyContainerClean: {
		backgroundColor: 'whitesmoke',
	},
	toastyTextClean: {
		color: '#2a2a2a',
	},
	//
	toastyContainerSuccess: {
		backgroundColor: '#62e796',
	},
	toastyTextSuccess: {
		color: '#0c6c10',
	},
	//
	toastyContainerWarning: {
		backgroundColor: '#f40100',
	},
	toastyTextWarning: {
		color: 'white',
	},
});
