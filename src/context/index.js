import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CasesContext = createContext();

export const CasesProvider = ({ children }) => {
	const [casesType, setCasesType] = useState({
		type: 'cases',
		color: 'rgba(63,131,248, 1)',
		opacity: 'rgba(63,131,248, 0.2)',
		tailwind: 'blue-500',
	});
	const [country, setCountry] = useState({
		value: 'all',
		label: 'Worldwide',
	});
	const [countryInfo, setCountryInfo] = useState({});

	const setType = (casesType) => {
		let cases;
		switch (casesType) {
			case 'recovered':
				cases = {
					type: 'recovered',
					color: 'rgba(250,202,21,1)',
					opacity: 'rgba(250,202,21,0.2)',
					tailwind: 'yellow-300',
				};
				break;
			case 'deaths':
				cases = {
					type: 'deaths',
					color: 'rgba(224,36,36,1)',
					opacity: 'rgba(224,36,36,0.2)',
					tailwind: 'red-600',
				};
				break;
			default:
				cases = {
					type: 'cases',
					color: 'rgba(63,131,248,1)',
					opacity: 'rgba(63,131,248,0.2)',
					tailwind: 'blue-500',
				};
		}
		setCasesType(cases);
	};

	useEffect(() => {
		(async () => {
			const res = await axios.get(
				`https://disease.sh/v3/covid-19/${country.value}`
			);
			const {
				updated,
				cases,
				todayCases,
				deaths,
				todayDeaths,
				recovered,
				todayRecovered,
			} = res.data;
			setCountryInfo({
				updated: new Date(updated).toLocaleString(),
				cases,
				todayCases,
				deaths,
				todayDeaths,
				recovered,
				todayRecovered,
				countryInfo: res.data.countryInfo
					? res.data.countryInfo
					: {
							lat: 42.8333,
							long: 12.8333,
					  },
			});
		})();
	}, [country]);

	return (
		<CasesContext.Provider
			value={{ casesType, setType, country, setCountry, countryInfo }}
		>
			{children}
		</CasesContext.Provider>
	);
};
