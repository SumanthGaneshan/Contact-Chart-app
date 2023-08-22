import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Chart.css';

interface GraphData {
    cases: Record<string, number>;
    deaths: Record<string, number>;
}

const baseURL = 'https://disease.sh/v3/covid-19';

export const fetchGraphData = () =>
    axios
        .get<GraphData>(`${baseURL}/historical/all?lastdays=all`)
        .then((response) => response.data);

const LineGraph: React.FC = () => {
    const { data: graphData } = useQuery<GraphData>('graph', fetchGraphData);

    const graphDataFormatted = graphData?.cases
        ? Object.entries(graphData.cases).map(([date, count]) => ({
            date,
            count,
            deaths: graphData.deaths[date],
        }))
        : [];

    return (
        <div className="chart-container">
            <h2>Graph Data</h2>
            {graphDataFormatted.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={graphDataFormatted}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                            labelFormatter={(label) => `Date: ${label}`}
                            formatter={(value, name) => [`${name}: ${value}`]}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" name="Cases" />
                        <Line type="monotone" dataKey="deaths" stroke="#ff0000" name="Deaths" />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p>No graph data available.</p>
            )}
        </div>
    );
};

export default LineGraph;
