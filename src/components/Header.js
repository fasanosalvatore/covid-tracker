import React from 'react';
import Select from 'react-select';
import useSwr from 'swr';
import { countriesFetch, countryInfoFetch } from '../helper';
import Skeleton from 'react-loading-skeleton';

const Header = ({ selectedCountry, setSelectedCountry }) => {
	const { data: countries } = useSwr(
		'https://restcountries.eu/rest/v2/all',
		countriesFetch
	);

	const { data: countryInfo, errorCountryInfo } = useSwr(
		`https://disease.sh/v3/covid-19/${selectedCountry.value}`,
		countryInfoFetch
	);

	return (
		<header className="" style={{ height: '10%' }}>
			<div className="max-w-xs sm:container mx-auto py-4 flex flex-col sm:flex-row justify-between items-center h-full">
				<h1 className="text-2xl">Covid Tracker </h1>
				<span className="text-xs italic mb-2 sm:mb-0">
					{!countryInfo && !errorCountryInfo ? (
						<Skeleton width={30} height={10} />
					) : (
						`Last update: ${countryInfo.updated}`
					)}
				</span>
				<Select
					theme={(theme) => ({
						...theme,
						colors: {
							...theme.colors,
							primary25: 'rgba(104,117,245,0.2)',
							primary: 'rgba(104,117,245,1)',
						},
					})}
					className="flex-1 max-w-xs min-w-full sm:min-w-0"
					value={selectedCountry}
					onChange={(selectedValue) => setSelectedCountry(selectedValue)}
					options={countries}
				/>
			</div>
		</header>
	);
};

export default Header;
