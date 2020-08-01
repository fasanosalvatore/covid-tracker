import React from 'react';
import useSwr from 'swr';
import { Line } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton';
import { chartPointFetch } from '../helper';

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: 'index',
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return tooltipItem.value;
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: 'time',
				time: {
					format: 'MM/DD/YYYY',
					tooltipFormat: 'll',
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					// Include a dollar sign in the ticks
					callback: function (value, index, values) {
						return value;
					},
				},
			},
		],
	},
};

const Graph = ({ casesType }) => {
	const { data: chartPoints } = useSwr(
		['https://disease.sh/v3/covid-19/historical/all?lastdays=120', casesType],
		chartPointFetch
	);

	if (!chartPoints) {
		return (
			<div className="mt-3" style={{ height: '30%' }}>
				<Skeleton width={'100%'} height={'100%'} />
			</div>
		);
	}

	return (
		<div className="mt-3" style={{ height: '30%' }}>
			<Line
				data={{
					datasets: [
						{
							label: 'Total Cases',
							backgroundColor: casesType.opacity,
							borderColor: casesType.color,
							data: chartPoints,
						},
					],
				}}
				options={options}
			/>
		</div>
	);
};

export default Graph;
