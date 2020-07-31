import React from 'react';
import Graph from './Graph';
import Skeleton from 'react-loading-skeleton';

const Sidebar = ({ className, countries, casesType }) => {
	const skeletons = () => {
		let s = [];
		for (let i = 0; i < 50; i++) {
			s.push(
				<div key={i} className="flex justify-between p-2">
					<Skeleton width={120} height={30} />
					<Skeleton width={90} height={30} />
				</div>
			);
		}
		return s;
	};

	return (
		<aside className={`${className} h-full`}>
			<div
				style={{ height: '65%' }}
				className="h-64 overflow-auto rounded shadow relative"
			>
				<div className="flex justify-between p-2 bg-gray-200 font-bold sticky top-0 ">
					<p>Country</p>
					<p>Cases</p>
				</div>
				{!countries
					? skeletons().map((s) => s)
					: countries.map((country, i) => (
							<div
								key={country.countryInfo.iso2}
								className={`flex justify-between p-2 ${
									i % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
								}`}
							>
								<p className="font-medium ">{country.country}</p>
								<p>{country[casesType.type]}</p>
							</div>
					  ))}
			</div>

			<Graph casesType={casesType} />
		</aside>
	);
};

export default Sidebar;
