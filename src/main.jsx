// src/main.jsx

import ReactDOM from 'react-dom/client';
import App from './App';
// 1. Provider'ı içe aktarıyoruz
import { Provider } from 'react-redux'
// 2. Daha önce oluşturulan store'u içe aktarıyoruz
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter


ReactDOM.createRoot(document.getElementById('root')).render(
	  <Provider store={store}>
	  <PersistGate loading={null} persistor={persistor}>
	  <BrowserRouter>
	    <App />
		</BrowserRouter>
		</PersistGate>
	  </Provider>
);
