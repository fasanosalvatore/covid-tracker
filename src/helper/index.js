import axios from 'axios';

export const stdFetch = (url) => axios.get(url).then((res) => res.data);

export const countriesFetch = (url) =>
	axios.get(url).then((res) => {
		let countries = res.data.map((country) => ({
			label: country.name,
			value: 'countries/' + country.alpha2Code,
		}));
		countries.unshift({ value: 'all', label: 'Worldwide' });
		return countries;
	});

export const countryInfoFetch = (url) =>
	axios.get(url).then((res) => {
		const {
			updated,
			cases,
			todayCases,
			deaths,
			todayDeaths,
			recovered,
			todayRecovered,
		} = res.data;
		return {
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
		};
	});

export const chartPointFetch = (url, casesType) =>
	axios.get(url).then((res) => {
		let points = [];
		let lastPoint;
		for (let date in res.data[casesType.type]) {
			if (lastPoint) {
				const newPoint = {
					x: date,
					y: res.data[casesType.type][date] - lastPoint,
				};
				points.push(newPoint);
			}
			lastPoint = res.data[casesType.type][date];
		}
		return points;
	});
