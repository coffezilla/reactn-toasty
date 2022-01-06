import { useContext, useState, useEffect, createContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// Provider to wrap the content in order to make the methods available using React Context
export const ToastProvider = ({ children }) => {
	const [toastStatus, setToastStatus] = useState(false);
	const [toastyOptions, setToastyOptions] = useState({
		message: 'Toasty!',
		delay: 1000,
		type: 'SUCCESS',
	});

	return (
		<>
			<ToastContext.Provider
				value={{
					toastStatus,
					setToastStatus,
					toastyOptions,
					setToastyOptions,
				}}
			>
				{children}
				<Toasty />
			</ToastContext.Provider>
		</>
	);
};

// Hook with methods
export const useToasty = () => {
	const { setToastStatus, toastStatus } = useContext(ToastContext);
	const { setToastyOptions } = useContext(ToastContext);

	// check if is already opened
	if (!toastStatus) {
		return {
			openToast: ({ message = 'Toasty!', delay = 1000, type = 'SUCCESS' }) => {
				setToastStatus(true);
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
const ToastContext = createContext(null);

// View
const Toasty = () => {
	const { toastStatus, setToastStatus, toastyOptions } =
		useContext(ToastContext);

	useEffect(() => {
		if (toastStatus) {
			setTimeout(() => {
				setToastStatus(false);
			}, toastyOptions.delay);
		}
	}, [toastStatus]);

	return (
		<View
			style={[
				styles.toastyContainer,
				toastyOptions.type === 'SUCCESS' && styles.toastyContainerSuccess,
				toastyOptions.type === 'WARNING' && styles.toastyContainerWarning,
				toastyOptions.type === 'CLEAN' && styles.toastyContainerClean,
			]}
		>
			{toastStatus && (
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
		</View>
	);
};

export default Toasty;

const styles = StyleSheet.create({
	toastyContainer: {
		marginHorizontal: 17,
		// paddingVertical: 5,
		paddingHorizontal: 20,
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
