import { useContext, useState, useEffect, createContext } from 'react';
import { Text, View } from 'react-native';

// Provider to wrap the content in order to make the methods available using React Context
export const ToastProvider = ({ children }) => {
	const [toastStatus, setToastStatus] = useState(false);
	const [toastOptions, setToastOptions] = useState({
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
					toastOptions,
					setToastOptions,
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
	const { setToastOptions } = useContext(ToastContext);

	// check if is already opened
	if (!toastStatus) {
		return {
			openToast: ({ message = 'Toasty!', delay = 1000, type = 'SUCCESS' }) => {
				setToastStatus(true);
				setToastOptions({
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
	const { toastStatus, setToastStatus, toastOptions } =
		useContext(ToastContext);

	useEffect(() => {
		if (toastStatus) {
			setTimeout(() => {
				setToastStatus(false);
			}, toastOptions.delay);
		}
	}, [toastStatus]);

	return (
		<View>
			{toastStatus && (
				<Text>
					{toastOptions.type}- {toastOptions.message} - {toastStatus.toString()}
				</Text>
			)}
		</View>
	);
};

export default Toasty;
