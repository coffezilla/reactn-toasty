import { ToastProvider } from './MyToast';
import Header from './Header';

export default function App() {
	return (
		<>
			<ToastProvider>
				<Header />
			</ToastProvider>
		</>
	);
}
