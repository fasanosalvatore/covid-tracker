import React, { useContext } from 'react';
import { CasesContext } from '../context';
import Card from './Card';

const CardList = () => {
	const { countryInfo, setType, casesType } = useContext(CasesContext);
	const cards = [
		{
			title: 'cases',
			cases: countryInfo.todayCases,
			total: countryInfo.cases,
		},
		{
			title: 'recovered',
			cases: countryInfo.todayRecovered,
			total: countryInfo.recovered,
		},
		{
			title: 'deaths',
			cases: countryInfo.todayDeaths,
			total: countryInfo.deaths,
		},
	];

	return (
		<section className="py-1 container mx-auto" style={{ height: '20%' }}>
			<div
				className="max-w-xs sm:container mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
				style={{ gap: 10 }}
			>
				{cards.map((card) => (
					<Card
						{...card}
						key={card.title}
						setType={setType}
						casesType={casesType}
					/>
				))}
			</div>
		</section>
	);
};

export default CardList;
