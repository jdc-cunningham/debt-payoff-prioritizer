import React, { useState, useEffect } from 'react';
import './App.scss';
import SidePanel from './components/side-panel/SidePanel';
import Content from './components/content/Content';

const App = () => {
	const [store, setStore] = useState(null);

	const checkLocalStorage = () => {
		return window.localStorage.getItem('orbitalDebtStrike');
	}

	const saveToLocalStorage = (data) => {
		window.localStorage.setItem('orbitalDebtSrike', JSON.stringify(data));
	}

	/**
	 * This part checks if data exists on local storage or not
	 * this also updates when user clicks on "Add Debt"
	 */
	useEffect(() => {
		const lsData = checkLocalStorage();
		let lsDataJson = null;

		if (lsData) {
			lsDataJson = JSON.parse(lsData);
		}

		if (lsDataJson && !store) {
			setStore(lsDataJson);
		}
		
		if (store) {
			saveToLocalStorage(store);
		}
	}, [store]);
	
	return (
		<div className="debt-payoff-prioritizer">
			<SidePanel store={ store } setStore={ setStore } />
			<Content store={ store } />
		</div>
	);
}

export default App;
