import React from 'react';
import { CasesProvider } from './context';
import Header from './components/Header';
import CardList from './components/CardList';

import MainContent from './components/MainContent';
function App() {
	return (
		<div className="h-full sm:h-screen bg-gray-100">
			<CasesProvider>
				<Header />
				<CardList />
				<MainContent />
			</CasesProvider>
		</div>
	);
}

export default App;
