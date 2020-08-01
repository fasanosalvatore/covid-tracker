import React from 'react';
import useSwr from 'swr';
import Map from './Map';
import Sidebar from './Sidebar';
import { stdFetch, countryInfoFetch } from '../helper';

const MainContent = ({ casesType, selectedCountry }) => {
	const { data: countries } = useSwr(
		`https://disease.sh/v3/covid-19/countries?sort=${casesType.type}`,
		stdFetch
	);

	const { data: countryInfo } = useSwr(
		[`https://disease.sh/v3/covid-19/${selectedCountry.value}`, 'all'],
		countryInfoFetch
	);

	return (
		<main
			className="max-w-xs sm:container mx-auto mt-4 flex flex-col sm:flex-row justify-between items-center"
			style={{ height: 'calc(70% - 1rem)' }}
		>
			<Map
				className="w-full sm:w-3/4"
				{...{ countries, casesType, countryInfo }}
			/>
			<Sidebar className="w-full sm:w-1/4" {...{ countries, casesType }} />
		</main>
	);
};

export default MainContent;
