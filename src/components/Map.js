import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Map as ReactMap, Circle, Popup, TileLayer } from 'react-leaflet';
import './Map.css';

const Map = ({ countries, casesType, countryInfo, className }) => {
	if (!countryInfo)
		return (
			<div className={`${className} h-full pr-3 map`}>
				<Skeleton width={'100%'} height={'100%'} />
			</div>
		);
	return (
		<div className={`${className} h-64 sm:h-full pr-3 map`}>
			<ReactMap
				center={[countryInfo.countryInfo.lat, countryInfo.countryInfo.long]}
				zoom={5}
			>
				<TileLayer
					url="https://api.mapbox.com/styles/v1/fasanosalvatore/ck786fr9n2hzq1ipkub6s7dl1/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmFzYW5vc2FsdmF0b3JlIiwiYSI6ImNrZGE1OTFzNzBha2wyeG16NDR4NDFrOHMifQ.IAzUn2Ru0-kr_expo61H7A"
					attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
				/>
				{countries?.map((country) => (
					<Circle
						key={country.countryInfo.iso3}
						center={[country.countryInfo.lat, country.countryInfo.long]}
						radius={Math.sqrt(country[casesType.type]) * 500}
						color={casesType.color}
						weight="1"
					>
						<Popup>
							<img
								src={country.countryInfo.flag}
								alt={`${country.country}'s Flag`}
							/>
							<div className="flex flex-col p-4 ">
								<span>Country: {country.country}</span>
								<span>Cases: {country.cases}</span>
								<span>Recovered: {country.recovered}</span>
								<span>Deaths: {country.deaths}</span>
							</div>
						</Popup>
					</Circle>
				))}
			</ReactMap>
		</div>
	);
};

export default Map;
