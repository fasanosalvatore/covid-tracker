import React, { useReducer, useState } from 'react';
import Header from './components/Header';
import CardList from './components/CardList';
import MainContent from './components/MainContent';

const reducer = (state, action) => {
	switch (action.type) {
		case 'cases':
			return casesDefault;
		case 'recovered':
			return {
				type: 'recovered',
				color: 'rgba(250,202,21,1)',
				opacity: 'rgba(250,202,21,0.2)',
				tailwind: 'yellow-300',
			};
		case 'deaths':
			return {
				type: 'deaths',
				color: 'rgba(224,36,36,1)',
				opacity: 'rgba(224,36,36,0.2)',
				tailwind: 'red-600',
			};
		default:
			return state;
	}
};

const casesDefault = {
	type: 'cases',
	color: 'rgba(63,131,248, 1)',
	opacity: 'rgba(63,131,248, 0.2)',
	tailwind: 'blue-500',
};

function App() {
	const [casesType, dispatch] = useReducer(reducer, casesDefault);
	const [selectedCountry, setSelectedCountry] = useState({
		value: 'all',
		label: 'Worldwide',
	});
	return (
		<div className="h-full sm:h-screen bg-gray-100">
			<Header {...{ selectedCountry, setSelectedCountry }} />
			<CardList {...{ casesType, dispatch, selectedCountry }} />
			<MainContent {...{ casesType, selectedCountry }} />
		</div>
	);
}

export default App;
