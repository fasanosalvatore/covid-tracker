import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { CasesContext } from '../context';

const Header = () => {
	const { countryInfo, country, setCountry } = useContext(CasesContext);
	const [options, setOptions] = useState([]);

	const customStyles = {
		control: (provided, state) => {
			console.log(provided, state);
			return {
				...provided,
				//border: state.menuIsOpen ? 'yellow' : 'gray',
			};
		},
	};

	useEffect(() => {
		async function fn() {
			const res = await axios.get('https://restcountries.eu/rest/v2/all');
			const data = res.data.map((country) => ({
				label: country.name,
				value: 'countries/' + country.alpha2Code,
			}));
			data.unshift({ value: 'all', label: 'Worldwide' });
			setOptions(data);
		}
		fn();
	}, []);

	return (
		<header className="" style={{ height: '10%' }}>
			<div className="max-w-xs sm:container mx-auto py-4 flex flex-col sm:flex-row justify-between items-center h-full">
				<h1 className="text-2xl">Covid Tracker </h1>
				<span className="text-xs italic mb-2 sm:mb-0">
					Last update: {countryInfo.updated}
				</span>
				<Select
					styles={customStyles}
					theme={(theme) => ({
						...theme,
						//borderRadius: 0,
						colors: {
							...theme.colors,
							primary25: 'rgba(104,117,245,0.2)',
							primary: 'rgba(104,117,245,1)',
						},
					})}
					className="flex-1 max-w-xs min-w-full sm:min-w-0"
					value={country}
					onChange={(selectedValue) => setCountry(selectedValue)}
					options={options}
				/>
			</div>
		</header>
	);
};

export default Header;
