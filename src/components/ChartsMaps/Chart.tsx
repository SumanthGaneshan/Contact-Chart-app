import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './Chart.css';
import MapComponent from './MapComponent';
import LineGraph from './LineGraph';

interface WorldwideData {
  cases: number;
  deaths: number;
  recovered: number;
}

const baseURL = 'https://disease.sh/v3/covid-19';

export const fetchWorldwideData = () =>
  axios.get<WorldwideData>(`${baseURL}/all`).then((response) => response.data);


const Chart: React.FC = () => {
  const { data: worldwideData } = useQuery<WorldwideData>('worldwide', fetchWorldwideData);


  return (
    <div className="chart-wrapper">
      <h1>COVID-19 Dashboard</h1>
      {worldwideData && (
        <div>
          <h2>Worldwide Data</h2>
          <p>Total Cases: {worldwideData.cases}</p>
          <p>Total Deaths: {worldwideData.deaths}</p>
          <p>Total Recovered: {worldwideData.recovered}</p>
        </div>
      )}
      <LineGraph />

      <MapComponent />
    </div>
  );
}

export default Chart;
