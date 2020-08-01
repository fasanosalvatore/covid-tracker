import React from 'react';
import useSwr from 'swr';
import Card from './Card';
import { countryInfoFetch } from '../helper';

const CardList = ({ casesType, dispatch, selectedCountry }) => {
	const { data: countryInfo } = useSwr(
		`https://disease.sh/v3/covid-19/${selectedCountry.value}`,
		countryInfoFetch
	);

	let cards = [];
	if (countryInfo) {
		cards = [
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
	}

	return (
		<section className="py-1 container mx-auto" style={{ height: '20%' }}>
			<div
				className="max-w-xs sm:container mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
				style={{ gap: 10 }}
			>
				{cards.map((card) => (
					<Card
						key={card.title}
						{...card}
						dispatch={dispatch}
						casesType={casesType}
						countryInfo={countryInfo}
					/>
				))}
			</div>
		</section>
	);
};

export default CardList;
