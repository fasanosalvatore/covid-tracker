import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CasesContext } from '../context';
import Map from './Map';
import Sidebar from './Sidebar';

const MainContent = () => {
	const [countries, setCountries] = useState();
	const { casesType, countryInfo } = useContext(CasesContext);

	useEffect(() => {
		(async () => {
			const res = await axios.get(
				`https://disease.sh/v3/covid-19/countries?sort=${casesType.type}`
			);
			setCountries(res.data);
		})();
	}, [casesType.type]);

	return (
		<main
			className="max-w-xs sm:container mx-auto mt-4 flex flex-col sm:flex-row justify-between items-center"
			style={{ height: 'calc(70% - 1rem)' }}
		>
			<Map
				className="w-full sm:w-3/4"
				countries={countries}
				casesType={casesType}
				countryInfo={countryInfo}
			/>
			<Sidebar
				className="w-full sm:w-1/4"
				countries={countries}
				casesType={casesType}
			/>
		</main>
	);
};

export default MainContent;
