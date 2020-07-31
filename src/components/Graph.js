import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton';

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
	const [chartPoints, setChartPoints] = useState([]);

	const newPoints = useCallback(
		(data) => {
			let points = [];
			let lastPoint;
			for (let date in data[casesType.type]) {
				if (lastPoint) {
					const newPoint = {
						x: date,
						y: data[casesType.type][date] - lastPoint,
					};
					points.push(newPoint);
				}
				lastPoint = data[casesType.type][date];
			}
			setChartPoints(points);
		},
		[casesType.type]
	);

	useEffect(() => {
		(async () => {
			const res = await axios.get(
				'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
			);
			newPoints(res.data);
		})();
	}, [casesType, newPoints]);

	if (chartPoints.length === 0 || !chartPoints)
		return (
			<div className="mt-3" style={{ height: '30%' }}>
				<Skeleton width={'100%'} height={'100%'} />
			</div>
		);

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
