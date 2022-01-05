import { ToastProvider } from './components/Toasty';
import Content from './Content';

export default function App() {
	return (
		<>
			<ToastProvider>
				<Content />
			</ToastProvider>
		</>
	);
}
