// MapComponent.tsx
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './MapComponent.css';

interface CountryData {
    country: string;
    countryInfo: {
        lat: number;
        long: number;
    };
    cases: number;
    recovered: number;
    deaths: number;
    continent: string,
}

const fetchCountryData = async () => {
    const response = await axios.get<CountryData[]>('https://disease.sh/v3/covid-19/countries');
    return response.data;
};

const continentColors: Record<string, string> = {
    "Asia": 'red',
    "Europe": 'blue',
    "Africa": 'green',
    "North America": 'orange',
    "South America": 'purple',
    "Australia-Oceania": 'brown',
    "Antarctica": 'yellow',
    "Other": "grey"
};

const MapComponent: React.FC = () => {
    const { data: countryData } = useQuery<CountryData[]>('countryData', fetchCountryData);

    const markerSpacing = 2; // Adjust this value for desired spacing

    return (
        <>
            <h2>Leaflet Map</h2>
            <div className="continent-list">
                    {Object.entries(continentColors).map(([continent, color]) => (
                        <div key={continent} className="continent-item">
                            <div className="continent-color" style={{ backgroundColor: color }}></div>
                            <div className="continent-text">{continent}</div>
                        </div>
                    ))}
                </div>
            <div className="map-container">
                {countryData?.map((country, index) => {
                    const continentColor = continentColors[country.continent] || "grey";

                    return (
                        <div
                            key={country.country}
                            className="map-marker"
                            style={{
                                left: `${(country.countryInfo.long + 180) / 360 * 100}%`,
                                top: `${(90 - country.countryInfo.lat) / 180 * 100}%`,
                                backgroundColor: continentColor,
                            }}
                        >
                            <div className="marker-popup">
                                <div className="marker-label">{country.country}</div>
                                <div className="marker-data">
                                    <p>Total Cases: {country.cases}</p>
                                    <p>Total Deaths: {country.deaths}</p>
                                    <p>Total Recovered: {country.recovered}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};


export default MapComponent;
